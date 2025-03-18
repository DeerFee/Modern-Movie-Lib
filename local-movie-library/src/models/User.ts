import { Folder } from './Folder';

export interface User {
  id: string;
  username: string;
  email: string;
  folders: Folder[];
  createdAt: Date;
  lastLoginAt: Date;
  settings: {
    theme: 'light' | 'dark';
    language: 'ru' | 'en';
    showAdult: boolean;
  };
}

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}