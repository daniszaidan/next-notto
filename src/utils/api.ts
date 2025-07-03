import axios from 'axios';
import { ApiResponse, Checklist, ChecklistItem, LoginRequest, RegisterRequest, AuthResponse } from './types';

const API_BASE_URL = 'http://94.74.86.174:8080/api';

// Get token from localStorage
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      localStorage.removeItem('username');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  // Register new user
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/register', userData);
    return response.data.data;
  },

  // Login user
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/login', credentials);
    const authData = response.data.data;
    
    // Save token to localStorage
    if (authData.token) {
      localStorage.setItem('auth_token', authData.token);
      localStorage.setItem('username', credentials.username);
    }
    
    return authData;
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!getToken();
  },
};

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
