import { customersApi } from '@/api/customers';
import { loyaltyService } from '@/services/loyaltyService';
import type { CustomerWithLoyalty } from '@/types/customer';
import { getCustomerTier } from '@/utils/tier';

const toPoints = (totalStampsEarned: number) => totalStampsEarned * 100;

const combineCustomer = async (customerId: string): Promise<CustomerWithLoyalty> => {
  const [customer, loyalty] = await Promise.all([
    customersApi.getById(customerId),
    loyaltyService.getCustomerLoyalty(customerId),
  ]);

  const points = toPoints(loyalty.totalStampsEarned);

  return {
    ...customer,
    loyalty,
    points,
    tier: getCustomerTier(points),
  };
};

export const customerService = {
  async getCustomers(): Promise<CustomerWithLoyalty[]> {
    const customers = await customersApi.list();

    return Promise.all(customers.map(async (customer) => {
      const loyalty = await loyaltyService.getCustomerLoyalty(customer.id);
      const points = toPoints(loyalty.totalStampsEarned);

      return {
        ...customer,
        loyalty,
        points,
        tier: getCustomerTier(points),
      };
    }));
  },

  async getCustomerById(customerId: string): Promise<CustomerWithLoyalty> {
    return combineCustomer(customerId);
  },
};
