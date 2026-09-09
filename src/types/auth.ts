/**
 * GBP Auditor - Authentication & User Types
 */

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  company?: string;
  role: UserRole;
  createdAt: string;
  savedAudits: string[];
  plan?: string;
  creditsRemaining?: number;
  savedAuditsCount?: number;
  avatarUrl?: string;
}

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  company?: string;
  role: UserRole;
  createdAt?: string;
  savedAudits?: string[];
  plan?: string;
  creditsRemaining?: number;
  savedAuditsCount?: number;
  avatarUrl?: string;
}

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface SignupInput {
  name: string;
  email: string;
  password: string;
  company?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthApiResponse<T = SafeUser> {
  success: boolean;
  user?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string>;
}

export interface AuthContextType {
  user: SafeUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  login: (email: string, password?: string, fallbackName?: string) => Promise<{ success: boolean; error?: string; user?: SafeUser }>;
  signup: (name: string, email: string, password: string, company?: string) => Promise<{ success: boolean; error?: string; user?: SafeUser }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<SafeUser | null>;
  clearError: () => void;
}
