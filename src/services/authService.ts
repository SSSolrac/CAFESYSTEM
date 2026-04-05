import { authApi } from '@/api/auth';
import { loginHistoryService } from '@/services/loginHistoryService';
import type { SessionUser } from '@/types/user';

export const authService = {
  async login(email: string, password: string, device: string): Promise<SessionUser> {
    try {
      return await authApi.login({ email, password, device });
    } catch (error) {
      try {
        await loginHistoryService.recordLogin({
          userId: 'unknown',
          userName: email,
          role: 'unknown',
          loginTime: new Date().toISOString(),
          logoutTime: '',
          ipAddress: '127.0.0.1',
          device,
          loginStatus: 'failed',
        });
      } catch {}
      throw error;
    }
  },
};
