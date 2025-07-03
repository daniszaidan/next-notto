'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import ChecklistCard from '@/components/ChecklistCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Checklist } from '@/utils/types';
import { checklistApi } from '@/utils/api';
import { useAuth } from '@/contexts/AuthContext';
import { PlusIcon } from '@heroicons/react/24/outline';
import ButtonTitle from '@/components/ButtonTitle';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const { logout } = useAuth();
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);
  const [newChecklistName, setNewChecklistName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadChecklists();
  }, []);

  const loadChecklists = async () => {
    try {
      const data = await checklistApi.getAll();
      setChecklists(data);
    } catch (error) {
      console.error('Error loading checklists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChecklist = async () => {
    if (!newChecklistName.trim()) return;

    setIsCreating(true);
    try {
      const newChecklist = await checklistApi.create(newChecklistName);
      setChecklists([...checklists, newChecklist]);
      setNewChecklistName('');
    } catch (error) {
      console.error('Error creating checklist:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteChecklist = async (id: number) => {
    try {
      await checklistApi.delete(id);
      setChecklists(checklists.filter((checklist) => checklist.id !== id));
    } catch (error) {
      console.error('Error deleting checklist:', error);
    }
  };

  const handleSelectChecklist = (id: number) => {
    router.push(`/checklist/${id}`);
  };

  if (loading) {
    return (
      <section className="p-100 md:px-50 sm:px-30">
        <div className="max-w-6xl mx-auto">
          <Navigation />
          <div className="mt-8 text-center">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <ProtectedRoute>
      <section className="p-100 md:px-50 sm:px-30">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <Navigation />

            <ButtonTitle
              onClick={logout}
              title="Logout"
              icon={<ArrowLeftStartOnRectangleIcon />}
              href="/"
            />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Daftar Checklist</h2>

            {/* Form untuk menambah checklist baru */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newChecklistName}
                  onChange={(e) => setNewChecklistName(e.target.value)}
                  placeholder="Nama checklist baru..."
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) =>
                    e.key === 'Enter' && handleCreateChecklist()
                  }
                />
                <button
                  onClick={handleCreateChecklist}
                  disabled={isCreating || !newChecklistName.trim()}
                  className="px-4 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <PlusIcon className="w-5 h-5" />
                  {isCreating ? 'Membuat...' : 'Tambah'}
                </button>
              </div>
            </div>

            {/* Daftar checklist */}
            {checklists.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Belum ada checklist. Buat checklist pertama Anda!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {checklists.map((checklist) => (
                  <ChecklistCard
                    key={checklist.id}
                    checklist={checklist}
                    onDelete={handleDeleteChecklist}
                    onSelect={handleSelectChecklist}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
