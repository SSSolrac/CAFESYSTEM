import { apiClient } from './client';
import type { LoyaltyAccount } from '@/types/customer';

export const loyaltyApi = {
  async getCustomerLoyalty(customerId: string): Promise<LoyaltyAccount> {
    return apiClient.get<LoyaltyAccount>(`/api/loyalty/${customerId}`);
  },
};
