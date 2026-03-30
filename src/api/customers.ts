import { apiClient } from './client';
import type { CustomerProfile } from '@/types/customer';

export const customersApi = {
  async list(): Promise<CustomerProfile[]> {
    return apiClient.get<CustomerProfile[]>('/api/customers');
  },

  async getById(customerId: string): Promise<CustomerProfile> {
    return apiClient.get<CustomerProfile>(`/api/customers/${customerId}`);
  },
};
