import type { CustomerTier } from '@/types/customer';

export const getCustomerTier = (points: number): CustomerTier => {
  if (points >= 1000) return 'Gold';
  if (points >= 500) return 'Silver';
  if (points >= 100) return 'Bronze';
  return 'Unranked';
};
