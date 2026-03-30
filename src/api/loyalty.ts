import { apiClient } from './client';
import type { LoyaltyAccount, LoyaltyStampResult } from '@/types/loyalty';

export const loyaltyApi = {
  async getLoyaltyAccount(customerId: string): Promise<LoyaltyAccount> {
    return apiClient.get<LoyaltyAccount>(`/api/loyalty/${customerId}`);
  },

  async grantManualStamp(customerId: string, reason?: string): Promise<LoyaltyStampResult> {
    return apiClient.post<LoyaltyStampResult>(`/api/loyalty/${customerId}/manual-stamp`, { reason });
  },

  async grantOrderStamp(orderId: string): Promise<LoyaltyStampResult> {
    return apiClient.post<LoyaltyStampResult>(`/api/loyalty/orders/${orderId}/confirm`);
  },

  async hasOrderAlreadyBeenStamped(orderId: string): Promise<boolean> {
    const response = await apiClient.get<{ stamped: boolean }>(`/api/loyalty/orders/${orderId}/stamped`);
    return Boolean(response.stamped);
  },
};
