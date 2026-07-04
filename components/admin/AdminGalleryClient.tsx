// src/components/admin/AdminGalleryClient.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { GalleryImage } from '@/types/gallery';

export default function AdminGalleryClient({ initialImages }: { initialImages: GalleryImage[] }) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const [altText, setAltText] = useState('');
  const [category, setCategory] = useState<'food' | 'restaurant' | 'event'>('food');
  const [file, setFile] = useState<File | null>(null);

  const supabase = createClient();

  const handleCreateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !altText) return alert('Provide both media file attachment and context alt descriptions.');

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      // 1. Upload the physical binary file array to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('restaurant_gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Fetch its structured CDN URL endpoint path
      const { data: urlData } = supabase.storage
        .from('restaurant_gallery')
        .getPublicUrl(filePath);

      // 3. Save reference configuration directly inside database indexing
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src: urlData.publicUrl, alt: altText, category }),
      });

      if (!response.ok) throw new Error('Failed tracking registration details inside API routes');

      const savedItem = await response.json();
      setImages([savedItem, ...images]);
      
      // Reset local interface input fields safely
      setAltText('');
      setFile(null);
      (document.getElementById('galleryFileInput') as HTMLInputElement).value = '';
      alert('Asset preserved safely.');
    } catch (err: any) {
      alert(`Operation interrupted: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (id: string, storageSrc: string) => {
    if (!confirm('Permanently clear this selection from verification logs?')) return;

    try {
      // Extract inner file path from storage public URLs
      const pathSegments = storageSrc.split('/storage/v1/object/public/restaurant_gallery/');
      if (pathSegments.length === 2) {
        await supabase.storage.from('restaurant_gallery').remove([pathSegments[1]]);
      }

      // Drop indexing from core relational model fields
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Target removal interrupted across database lines.');

      setImages(images.filter((img) => img.id !== id));
    } catch (err: any) {
      alert(`Deletion interrupted: ${err.message}`);
    }
  };

  return (
    <div className="space-y-12">
      {/* Upload Interface Panel */}
      <form onSubmit={handleCreateImage} className="bg-white border border-neutral-100 p-6 rounded-md max-w-xl space-y-4">
        <h3 className="text-sm font-semibold text-neutral-800 uppercase tracking-wider">Upload New Image</h3>
        
        <div>
          <label className="block text-xs text-neutral-500 mb-1">Image File</label>
          <input
            id="galleryFileInput"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-xs text-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-medium file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
            required
          />
        </div>

        <div>
          <label className="block text-xs text-neutral-500 mb-1">Alt Text (Description)</label>
          <input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="e.g. Guest tables near the west terrace window"
            className="w-full text-xs border border-neutral-200 rounded-sm p-2 outline-none focus:border-neutral-400"
            required
          />
        </div>

        <div>
          <label className="block text-xs text-neutral-500 mb-1">Category Space</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full text-xs border border-neutral-200 rounded-sm p-2 outline-none focus:border-neutral-400 bg-white"
          >
            <option value="food">Food Selection</option>
            <option value="restaurant">Restaurant Interior</option>
            <option value="event">Private Event Space</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className="w-full bg-neutral-900 text-white text-xs uppercase tracking-widest py-2.5 rounded-sm hover:bg-neutral-800 transition-colors disabled:opacity-40"
        >
          {isUploading ? 'Uploading to Cloud Store...' : 'Commit to Production Gallery'}
        </button>
      </form>

      {/* Production Administration Grid Interface */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-neutral-800 uppercase tracking-wider">Active Inventory</h3>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div key={img.id} className="relative group border border-neutral-100 rounded-md p-2 bg-white flex flex-col justify-between">
              <div>
                <img src={img.src} alt={img.alt} className="h-40 w-full object-cover rounded-sm" />
                <div className="mt-2 space-y-0.5">
                  <p className="text-[11px] font-medium text-neutral-800 truncate">{img.alt}</p>
                  <span className="inline-block text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-neutral-100 text-neutral-500 rounded-full">
                    {img.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteImage(img.id, img.src)}
                className="mt-3 w-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors py-1 rounded-sm text-[10px] uppercase tracking-wider font-medium"
              >
                Delete File
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}