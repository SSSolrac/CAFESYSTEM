import type { UserRole } from './user';

export type LoginStatus = 'success' | 'failed';

export interface LoginHistoryEntry {
  id: string;
  userId: string;
  userName: string;
  role: UserRole;
  loginTime: string;
  logoutTime?: string;
  ipAddress: string;
  device: string;
  loginStatus: LoginStatus;
}

export interface LoginHistoryFilters {
  query: string;
  role: UserRole | 'all';
  status: LoginStatus | 'all';
  date: string;
  page: number;
  pageSize: number;
}
