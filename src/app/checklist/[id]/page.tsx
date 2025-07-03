'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import ChecklistItem from '@/components/ChecklistItem';
import { ChecklistItem as ChecklistItemType } from '@/utils/types';
import { checklistItemApi } from '@/utils/api';

export default function ChecklistDetailPage() {
  const [items, setItems] = useState<ChecklistItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItemName, setNewItemName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const params = useParams();
  const checklistId = parseInt(params.id as string);

  const loadItems = useCallback(async () => {
    try {
      const data = await checklistItemApi.getAll(checklistId);
      setItems(data);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  }, [checklistId]);

  useEffect(() => {
    if (checklistId) {
      loadItems();
    }
  }, [checklistId, loadItems]);

  const handleCreateItem = async () => {
    if (!newItemName.trim()) return;

    setIsCreating(true);
    try {
      const newItem = await checklistItemApi.create(checklistId, newItemName);
      setItems([...items, newItem]);
      setNewItemName('');
    } catch (error) {
      console.error('Error creating item:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      await checklistItemApi.delete(checklistId, itemId);
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleStatusChange = async (itemId: number) => {
    try {
      const updatedItem = await checklistItemApi.updateStatus(
        checklistId,
        itemId
      );
      setItems(items.map((item) => (item.id === itemId ? updatedItem : item)));
    } catch (error) {
      console.error('Error updating item status:', error);
    }
  };

  const handleRename = async (itemId: number, newName: string) => {
    try {
      const updatedItem = await checklistItemApi.rename(
        checklistId,
        itemId,
        newName
      );
      setItems(items.map((item) => (item.id === itemId ? updatedItem : item)));
    } catch (error) {
      console.error('Error renaming item:', error);
    }
  };

  if (loading) {
    return (
      <section className="p-100 md:px-50 sm:px-30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  const completedItems = items.filter(
    (item) => item.itemCompletionStatus
  ).length;
  const totalItems = items.length;

  return (
    <section className="p-100 md:px-50 sm:px-30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Detail Checklist</h1>
            <p className="text-gray-600">
              {completedItems} dari {totalItems} item selesai
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        {totalItems > 0 && (
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedItems / totalItems) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Form untuk menambah item baru */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Nama item baru..."
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateItem()}
            />
            <button
              onClick={handleCreateItem}
              disabled={isCreating || !newItemName.trim()}
              className="px-4 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              {isCreating ? 'Menambah...' : 'Tambah'}
            </button>
          </div>
        </div>

        {/* Daftar item */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Belum ada item dalam checklist ini. Tambahkan item pertama!</p>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <ChecklistItem
                  key={item.id}
                  item={item}
                  checklistId={checklistId}
                  onDelete={handleDeleteItem}
                  onStatusChange={handleStatusChange}
                  onRename={handleRename}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
