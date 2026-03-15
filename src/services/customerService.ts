import type { Customer } from '@/types/customer';
import { getCustomerTier } from '@/utils/tier';

const customersSeed = [
  { id: 'c1', name: 'Avery Johnson', email: 'avery@example.com', points: 1200 },
  { id: 'c2', name: 'Nora Lin', email: 'nora@example.com', points: 760 },
  { id: 'c3', name: 'Leo Adams', email: 'leo@example.com', points: 430 },
  { id: 'c4', name: 'Mia Turner', email: 'mia@example.com', points: 20 },
  { id: 'c5', name: 'Carlos Vega', email: 'carlos@example.com', points: 560 },
  { id: 'c6', name: 'Sam Brooks', email: 'sam@example.com', points: 90 },
];

export const customerService = {
  async getCustomers(): Promise<Customer[]> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return customersSeed.map((customer) => ({ ...customer, tier: getCustomerTier(customer.points) }));
  },
};
