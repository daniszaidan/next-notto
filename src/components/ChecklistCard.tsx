'use client';

import { TrashIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Checklist } from '@/utils/types';
import { getRandomPastelColor } from '@/utils/commons';
import { useMemo } from 'react';

interface ChecklistCardProps {
  checklist: Checklist;
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
}

export default function ChecklistCard({
  checklist,
  onDelete,
  onSelect,
}: ChecklistCardProps) {
  const backgroundColor = useMemo(() => {
    return getRandomPastelColor();
  }, []);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(checklist.id);
  };

  return (
    <div
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      style={{ backgroundColor }}
      onClick={() => onSelect(checklist.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{checklist.name}</h3>
          <p className="text-sm text-white/75 mt-1">
            Status:{' '}
            {checklist.checklistCompletionStatus ? 'Selesai' : 'Belum Selesai'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Hapus checklist"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
          <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
