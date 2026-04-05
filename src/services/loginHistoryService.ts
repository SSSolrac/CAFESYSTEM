import { authApi } from '@/api/auth';
import type { LoginHistoryEntry, LoginHistoryFilters } from '@/types/loginHistory';
import type { SessionUser } from '@/types/user';

export const loginHistoryService = {
  async recordLogin(entry: Omit<LoginHistoryEntry, 'id'>) {
    return authApi.recordLoginHistory(entry);
  },

  async recordLogout(user: Pick<SessionUser, 'id' | 'name' | 'role'>) {
    await authApi.recordLoginHistory({
      userId: user.id,
      userName: user.name,
      role: user.role,
      loginTime: new Date().toISOString(),
      logoutTime: new Date().toISOString(),
      ipAddress: '0.0.0.0',
      device: 'unknown',
      loginStatus: 'success',
    });
  },

  async getLoginHistory(filters: LoginHistoryFilters) {
    return authApi.listLoginHistory(filters);
  },

  async getLoginStats() {
    return authApi.loginHistoryStats();
  },
};
