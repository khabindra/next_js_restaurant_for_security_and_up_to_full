'use client';

import { useState, useTransition, useMemo } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';

// Import your custom shared types
import { MenuItem, MenuCategory } from '@/types/menu';
import { createMenuItemAction, updateMenuItemAction, deleteMenuItemAction } from '@/app/(admin)/actions/menuitems/actions';

const ITEMS_PER_PAGE = 12;
const CATEGORIES: { label: string; value: MenuCategory | 'all' }[] = [
  { label: 'All Items', value: 'all' },
  { label: 'Starters', value: 'starter' },
  { label: 'Mains', value: 'main' },
  { label: 'Desserts', value: 'dessert' },
  { label: 'Drinks', value: 'drink' },
];

export default function AdminMenuClient({ initialItems }: { initialItems: MenuItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  
  const [form, setForm] = useState<{
    name: string;
    description: string;
    price: number;
    category: MenuCategory;
  }>({ name: '', description: '', price: 0, category: 'starter' });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uiAlert, setUiAlert] = useState<{ message: string; isError: boolean } | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesName && matchesCategory;
    });
  }, [initialItems, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const validatedPage = Math.min(currentPage, totalPages);
  const startIndex = (validatedPage - 1) * ITEMS_PER_PAGE;
  
  const paginatedItems = useMemo(() => {
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, startIndex]);

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setForm({ name: '', description: '', price: 0, category: 'starter' });
    setFile(null);
    setUiAlert(null);
    setIsOpen(true);
  };

  const handleOpenEditModal = (item: MenuItem) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
    });
    setFile(null);
    setUiAlert(null);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setEditingId(null);
    setForm({ name: '', description: '', price: 0, category: 'starter' });
    setFile(null);
    setUiAlert(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUiAlert(null);

    startTransition(async () => {
      const submissionData = new FormData();
      submissionData.append('name', form.name);
      submissionData.append('description', form.description);
      submissionData.append('price', form.price.toString());
      submissionData.append('category', form.category);
      if (file) submissionData.append('file', file);

      let result;
      if (editingId) {
        const currentItem = initialItems.find(item => item.id === editingId);
        submissionData.append('id', editingId);
        if (currentItem?.image) submissionData.append('currentImageUrl', currentItem.image);
        result = await updateMenuItemAction(submissionData);
      } else {
        result = await createMenuItemAction(submissionData);
      }

      if (result?.success) {
        handleModalClose();
        setUiAlert({ 
          message: editingId ? '✨ Menu item successfully updated!' : '✨ Menu item successfully published!', 
          isError: false 
        });
      } else {
        setUiAlert({ message: result?.error || 'Database sync execution failure.', isError: true });
      }
    });
  };

  const handleConfirmDelete = (id: string) => {
    setUiAlert(null);
    startTransition(async () => {
      const result = await deleteMenuItemAction(id);
      if (result.success) {
        setDeletingItemId(null);
        setUiAlert({ message: 'Item successfully wiped from menu records.', isError: false });
      } else {
        setUiAlert({ message: 'Failed to complete item deletion.', isError: true });
      }
    });
  };

  return (
    <div className="space-y-5 w-full max-w-full overflow-hidden">
      {uiAlert && !uiAlert.isError && (
        <div className="p-4 rounded-xl text-sm font-medium border bg-emerald-50 text-emerald-800 border-emerald-200 animate-in fade-in duration-200">
          {uiAlert.message}
        </div>
      )}

      {/* Control Station: Fully Responsive Flex Container */}
      <div className="space-y-4 bg-white p-4 rounded-xl border border-stone-200/80 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 w-full min-w-0">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full rounded-lg border border-stone-300 pl-9 pr-4 py-2.5 text-sm bg-stone-50/50 focus:ring-1 focus:ring-neutral-900 outline-none"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-3 h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <Button onClick={handleOpenCreateModal} className="w-full sm:w-auto shrink-0 h-10">
            + Add Menu Item
          </Button>
        </div>

        {/* Horizontal Category Pill Navigation */}
        <div className="w-full overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
          <div className="flex items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => { setSelectedCategory(cat.value); setCurrentPage(1); }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border ${
                  selectedCategory === cat.value
                    ? 'bg-neutral-900 text-white'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
          <h3 className="text-sm font-semibold text-stone-900">No records found</h3>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
          {paginatedItems.map((item) => {
            const hasBrokenImage = brokenImages[item.id];
            const resolvedImageSrc = hasBrokenImage || !item.image ? 'https://placehold.co/600x400?text=Image+Unavailable' : item.image;
            return (
              <Card key={item.id} className="p-4 flex flex-col justify-between">
                <div>
                  <div className="relative h-36 w-full mb-3 rounded-lg overflow-hidden bg-stone-100">
                    <Image src={resolvedImageSrc} alt={item.name} fill className="object-cover" onError={() => setBrokenImages(prev => ({ ...prev, [item.id]: true }))} />
                  </div>
                  <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">{item.description}</p>
                  <div className="text-sm font-bold mt-2.5">Rs. {item.price.toLocaleString()}</div>
                </div>
                <div className="flex gap-2 justify-end mt-4 pt-3 border-t border-stone-100">
                  {deletingItemId === item.id ? (
                    <div className="flex items-center gap-1 bg-red-50 p-1 rounded-lg w-full justify-between">
                      <span className="text-xs font-semibold text-red-700 px-1">Confirm?</span>
                      <div className="flex gap-1">
                        <Button size="sm" variant="danger" onClick={() => handleConfirmDelete(item.id)}>Yes</Button>
                        <Button size="sm" variant="secondary" onClick={() => setDeletingItemId(null)}>No</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Button size="sm" variant="secondary" onClick={() => handleOpenEditModal(item)}>Edit</Button>
                      <Button size="sm" variant="danger" onClick={() => setDeletingItemId(item.id)}>Delete</Button>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination Module */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 pt-4 border-t border-stone-200 w-full">
          <p className="text-xs text-stone-500">Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredItems.length)} of {filteredItems.length}</p>
          <div className="flex items-center gap-1 w-full justify-center flex-wrap">
            <Button size="sm" variant="secondary" disabled={validatedPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</Button>
            <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none px-2 py-1 scrollbar-none">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`h-8 w-8 text-xs font-semibold rounded-lg shrink-0 ${page === validatedPage ? 'bg-neutral-900 text-white' : 'bg-white border'}`}>
                  {page}
                </button>
              ))}
            </div>
            <Button size="sm" variant="secondary" disabled={validatedPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</Button>
          </div>
        </div>
      )}

      <Modal open={isOpen} onClose={handleModalClose} title={editingId ? "Edit Item" : "Create Item"}>
        <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
          <Input id="name" label="Item Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <TextArea id="description" label="Description" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input id="price" label="Price (Rs.)" type="number" required value={form.price} onChange={e => setForm({ ...form, price: parseInt(e.target.value) || 0 })} />
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-stone-500 uppercase">Category</label>
              <select className="rounded-lg border border-stone-300 px-3 py-2.5 text-sm h-[42px]" value={form.category} onChange={e => setForm({ ...form, category: e.target.value as MenuCategory })}>
                <option value="starter">Starter</option><option value="main">Main</option><option value="dessert">Dessert</option><option value="drink">Drink</option>
              </select>
            </div>
          </div>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-sm border p-2 rounded-lg" />
          <Button type="submit" className="w-full mt-6" disabled={isPending}>{isPending ? 'Processing...' : 'Save'}</Button>
        </form>
      </Modal>
    </div>
  );
}