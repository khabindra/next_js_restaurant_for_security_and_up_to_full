// components/admin/AdminGalleryClient.tsx
'use client';

import { useState, useTransition, useMemo } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';

import { GalleryImage } from '@/types/gallery';
import { createGalleryImageAction, deleteGalleryImageAction } from '@/app/(admin)/actions/gallery/actions';

const ITEMS_PER_PAGE = 12;

export default function AdminGalleryClient({ initialItems }: { initialItems: GalleryImage[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState<{ alt: string; category: 'food' | 'restaurant' | 'event' }>({ 
    alt: '', 
    category: 'food' 
  });
  
  const [uiAlert, setUiAlert] = useState<{ message: string; isError: boolean } | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    return selectedCategory === 'all' 
      ? initialItems 
      : initialItems.filter((item) => item.category === selectedCategory);
  }, [initialItems, selectedCategory]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const validatedPage = Math.min(currentPage, totalPages);
  const startIndex = (validatedPage - 1) * ITEMS_PER_PAGE;
  
  const paginatedItems = useMemo(() => {
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, startIndex]);

  const handleOpenCreateModal = () => {
    setForm({ alt: '', category: 'food' });
    setFile(null);
    setUiAlert(null);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setForm({ alt: '', category: 'food' });
    setFile(null);
    setUiAlert(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUiAlert(null);
    if (!file) {
      setUiAlert({ message: 'An image file asset must be selected first.', isError: true });
      return;
    }
    startTransition(async () => {
      const submissionData = new FormData();
      submissionData.append('alt', form.alt);
      submissionData.append('category', form.category);
      submissionData.append('file', file);
      const result = await createGalleryImageAction(submissionData);
      if (result?.success) {
        handleModalClose();
        setUiAlert({ message: '✨ Media asset successfully published!', isError: false });
      } else {
        setUiAlert({ message: result?.error || 'Database sync failure.', isError: true });
      }
    });
  };

  const handleConfirmDelete = (id: string, storageSrc: string) => {
    setUiAlert(null);
    startTransition(async () => {
      const result = await deleteGalleryImageAction(id, storageSrc);
      if (result.success) {
        setDeletingItemId(null);
        setUiAlert({ message: 'Media reference removed.', isError: false });
      } else {
        setUiAlert({ message: result.error || 'Failed to delete.', isError: true });
      }
    });
  };

  return (
    <div className="space-y-5 w-full max-w-full overflow-hidden">
      {uiAlert && !uiAlert.isError && (
        <div className="p-4 rounded-xl text-sm font-medium border bg-emerald-50 text-emerald-800 border-emerald-200">
          {uiAlert.message}
        </div>
      )}

      {/* Control Station */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-xl border border-stone-200/80 shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <select 
            className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm font-medium bg-stone-50/50 cursor-pointer h-[42px]" 
            value={selectedCategory} 
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
          >
            <option value="all">All Categories</option>
            <option value="food">Food</option>
            <option value="restaurant">Restaurant</option>
            <option value="event">Event</option>
          </select>
        </div>
        <Button onClick={handleOpenCreateModal} className="w-full sm:w-auto h-10 shadow-sm">
          + Upload Media
        </Button>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
          <h3 className="text-sm font-semibold text-stone-900">No media assets found</h3>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
          {paginatedItems.map((item,index) => (
            <Card key={item.id} className="flex flex-col justify-between p-4 bg-white border border-stone-200 rounded-xl">
              <div className="relative h-44 w-full mb-3 rounded-lg overflow-hidden bg-stone-100">
                <Image 
                  src={brokenImages[item.id] || !item.src ? 'https://placehold.co/600x400?text=Unavailable' : item.src} 
                  alt={item.alt} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                  
                  // FIX: Only apply priority to the very first image in the grid.
                  // Next.js will automatically make the rest lazy-loaded.
                  priority={index === 0} 
                  
                  onError={() => setBrokenImages(prev => ({ ...prev, [item.id]: true }))}
                />
              </div>
              <span className="text-[10px] font-bold uppercase bg-zinc-100 px-2 py-0.5 rounded-md w-fit mb-2">
                {item.category}
              </span>
              <p className="text-xs text-stone-500 line-clamp-2 min-h-[2rem]">{item.alt}</p>
              <div className="mt-4 pt-3 border-t">
                {deletingItemId === item.id ? (
                  <div className="flex gap-1">
                    <Button size="sm" variant="danger" onClick={() => handleConfirmDelete(item.id, item.src)} className="w-full">Yes</Button>
                    <Button size="sm" variant="secondary" onClick={() => setDeletingItemId(null)} className="w-full">No</Button>
                  </div>
                ) : (
                  <Button size="sm" variant="danger" onClick={() => setDeletingItemId(item.id)} className="w-full">Delete File</Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Responsive Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 pt-4 border-t w-full">
          <p className="text-xs text-stone-500 font-medium">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredItems.length)} of {filteredItems.length}
          </p>
          <div className="flex items-center gap-1 w-full justify-center flex-wrap">
            <Button size="sm" variant="secondary" disabled={validatedPage === 1 || isPending} onClick={() => setCurrentPage(p => p - 1)}>Prev</Button>
            <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none px-2 scrollbar-none">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`h-8 w-8 text-xs font-semibold rounded-lg shrink-0 ${page === validatedPage ? 'bg-neutral-900 text-white' : 'bg-white border'}`}>
                  {page}
                </button>
              ))}
            </div>
            <Button size="sm" variant="secondary" disabled={validatedPage === totalPages || isPending} onClick={() => setCurrentPage(p => p + 1)}>Next</Button>
          </div>
        </div>
      )}

      <Modal open={isOpen} onClose={handleModalClose} title="Upload New Gallery Image">
        <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
          {uiAlert?.isError && <div className="p-3.5 rounded-xl text-xs font-semibold bg-red-50 text-red-800 border">{uiAlert.message}</div>}
          <Input id="alt" label="Alt Text" placeholder="Caption..." required value={form.alt} onChange={e => setForm({ ...form, alt: e.target.value })} />
          <select className="w-full rounded-lg border px-3 py-2.5 text-sm" value={form.category} onChange={e => setForm({ ...form, category: e.target.value as any })}>
            <option value="food">Food</option>
            <option value="restaurant">Restaurant</option>
            <option value="event">Event</option>
          </select>
          <input type="file" accept="image/*" required onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-sm p-1.5 border rounded-lg" />
          <Button type="submit" className="w-full mt-4" disabled={isPending}>{isPending ? 'Uploading...' : 'Upload Asset'}</Button>
        </form>
      </Modal>
    </div>
  );
}