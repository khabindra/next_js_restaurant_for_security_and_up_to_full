'use client';

import { useState, useTransition } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';

import { createMenuItemAction, deleteMenuItemAction } from '@/app/(admin)/actions/menuitems/actions';
import { createClient } from '@/utils/supabase/client';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category: string;
};

// Initialize client outside component scope to maintain a single runtime instance
const supabase = createClient();

export default function AdminMenuClient({ initialItems }: { initialItems: MenuItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({ name: '', description: '', price: 0, category: 'starter' });

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      let publicImageUrl = '';

      try {
        if (file) {
          const fileExt = file.name.split('.').pop() || 'png';
          const fileName = `${crypto.randomUUID()}.${fileExt}`;
          
          // 1. Attempt raw storage upload
          const { error: uploadError } = await supabase.storage
            .from('menu_items')
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            // Catches the RLS error explicitly and forwards it to our visual UI alert
            throw new Error(`Storage Error: ${uploadError.message}`);
          }

          // 2. Fetch public reference distribution URL
          const { data: urlData } = supabase.storage
            .from('menu_items')
            .getPublicUrl(fileName);

          publicImageUrl = urlData.publicUrl;
        }

        // 3. Complete database serialization action
        const result = await createMenuItemAction({ ...form, image: publicImageUrl });

        if (result?.success) {
          setIsOpen(false);
          setForm({ name: '', description: '', price: 0, category: 'starter' });
          setFile(null);
        } else {
          alert(result?.error || 'Database sync failed.');
        }

      } catch (err: any) {
        console.error('Operation failed:', err);
        
        // Provide clear feedback on how to fix common RLS permissions pitfalls
        if (err.message?.includes('violates row-level security policy')) {
          alert(
            "⚠️ Upload Blocked by Security (RLS):\n\n" +
            "Your bucket policy is rejecting this upload. Please verify you added an INSERT " +
            "policy targeting your 'menu_items' bucket via your Supabase dashboard."
          );
        } else {
          alert(err.message || 'An unexpected runtime error occurred.');
        }
      }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      startTransition(async () => {
        const result = await deleteMenuItemAction(id);
        if (!result.success) {
          alert('Failed to delete item.');
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsOpen(true)}>+ Add Menu Item</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {initialItems.map((item) => (
          <Card key={item.id} className="flex flex-col justify-between">
            <div>
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-32 w-full object-cover rounded-xl mb-3" 
                  onError={(e) => {
                    // Fallback visually if access policies drop image reading permission
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Unavailable';
                  }}
                />
              )}
              <div className="flex justify-between items-baseline">
                <h4 className="font-semibold text-stone-900">{item.name}</h4>
                <span className="text-xs font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full capitalize">{item.category}</span>
              </div>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2">{item.description}</p>
              <div className="text-sm font-bold text-stone-800 mt-2">Rs. {item.price}</div>
            </div>
            <div className="flex gap-2 justify-end mt-4 pt-3 border-t border-stone-100">
              <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)} disabled={isPending}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Create New Menu Item">
        <form onSubmit={handleCreateItem} className="space-y-4 pt-2">
          <Input id="name" label="Item Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <TextArea id="description" label="Description" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          
          <div className="grid grid-cols-2 gap-4">
            <Input id="price" label="Price (Rs.)" type="number" required value={form.price} onChange={e => setForm({ ...form, price: parseInt(e.target.value) || 0 })} />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-neutral-700">Category</label>
              <select 
                className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none bg-white" 
                value={form.category} 
                onChange={e => setForm({ ...form, category: e.target.value })}
              >
                <option value="starter">Starter</option>
                <option value="main">Main</option>
                <option value="dessert">Dessert</option>
                <option value="drink">Drink</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-neutral-700">Item Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={e => setFile(e.target.files?.[0] || null)} 
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" 
            />
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? 'Saving Item...' : 'Save to Menu'}
          </Button>
        </form>
      </Modal>
    </div>
  );
}