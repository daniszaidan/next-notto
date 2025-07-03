import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonTitle extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
  className?: string;
  linkClassName?: string;
  titleClassName?: string;
  variant?: 'primary';
  target?: '_self' | '_blank' | '_parent' | '_top';
  href?: string;
}

// API Types
export interface Checklist {
  id: number;
  name: string;
  items?: ChecklistItem[];
  checklistCompletionStatus: boolean;
}

export interface ChecklistItem {
  id: number;
  name: string;
  itemCompletionStatus: boolean;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  errorMessage?: string;
  data: T;
}

// Auth Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  token: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthResponse | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}
