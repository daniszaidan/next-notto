'use client';

import { useState } from 'react';
import { ChecklistItem as ChecklistItemType } from '@/utils/types';
import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ChecklistItemProps {
  item: ChecklistItemType;
  checklistId: number;
  onDelete: (itemId: number) => void;
  onStatusChange: (itemId: number) => void;
  onRename: (itemId: number, newName: string) => void;
}

export default function ChecklistItem({
  item,
  // checklistId,
  onDelete,
  onStatusChange,
  onRename,
}: ChecklistItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);

  const handleRename = () => {
    if (newName.trim() && newName !== item.name) {
      onRename(item.id, newName);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-100 group hover:bg-gray-50">
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoFocus
          />
          <button
            onClick={handleRename}
            className="p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            Simpan
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Batal
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => onStatusChange(item.id)}
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                item.itemCompletionStatus
                  ? 'bg-purple-500 border-purple-500'
                  : 'border-gray-300'
              }`}
            >
              {item.itemCompletionStatus && (
                <CheckIcon className="w-3 h-3 text-white" />
              )}
            </button>
            <span
              className={`${
                item.itemCompletionStatus
                  ? 'line-through text-gray-400'
                  : 'text-gray-700'
              }`}
            >
              {item.name}
            </span>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Edit item"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Delete item"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
