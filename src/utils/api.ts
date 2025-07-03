import axios from 'axios';
import { ApiResponse, Checklist, ChecklistItem } from './types';

const API_BASE_URL = 'http://94.74.86.174:8080/api';

const BEARER_TOKEN = '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Checklist API
export const checklistApi = {
  // Get all checklists
  getAll: async (): Promise<Checklist[]> => {
    const response = await api.get<ApiResponse<Checklist[]>>('/checklist');
    return response.data.data;
  },

  // Create new checklist
  create: async (name: string): Promise<Checklist> => {
    const response = await api.post<ApiResponse<Checklist>>('/checklist', {
      name,
    });
    return response.data.data;
  },

  // Delete checklist
  delete: async (checklistId: number): Promise<void> => {
    await api.delete(`/checklist/${checklistId}`);
  },
};

// Checklist Items API
export const checklistItemApi = {
  // Get all items in a checklist
  getAll: async (checklistId: number): Promise<ChecklistItem[]> => {
    const response = await api.get<ApiResponse<ChecklistItem[]>>(
      `/checklist/${checklistId}/item`
    );
    return response.data.data;
  },

  // Get specific item
  getById: async (
    checklistId: number,
    itemId: number
  ): Promise<ChecklistItem> => {
    const response = await api.get<ApiResponse<ChecklistItem>>(
      `/checklist/${checklistId}/item/${itemId}`
    );
    return response.data.data;
  },

  // Create new item
  create: async (
    checklistId: number,
    itemName: string
  ): Promise<ChecklistItem> => {
    const response = await api.post<ApiResponse<ChecklistItem>>(
      `/checklist/${checklistId}/item`,
      { itemName }
    );
    return response.data.data;
  },

  // Update item name
  rename: async (
    checklistId: number,
    itemId: number,
    itemName: string
  ): Promise<ChecklistItem> => {
    const response = await api.put<ApiResponse<ChecklistItem>>(
      `/checklist/${checklistId}/item/rename/${itemId}`,
      { itemName }
    );
    return response.data.data;
  },

  // Update item status
  updateStatus: async (
    checklistId: number,
    itemId: number
  ): Promise<ChecklistItem> => {
    const response = await api.put<ApiResponse<ChecklistItem>>(
      `/checklist/${checklistId}/item/${itemId}`
    );
    return response.data.data;
  },

  // Delete item
  delete: async (checklistId: number, itemId: number): Promise<void> => {
    await api.delete(`/checklist/${checklistId}/item/${itemId}`);
  },
};
