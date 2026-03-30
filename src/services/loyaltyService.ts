import { loyaltyApi } from '@/api/loyalty';
import type { Order } from '@/types/order';
import type { LoyaltyAccount, LoyaltyStampResult } from '@/types/loyalty';

export const loyaltyService = {
  canGrantStamp(order: Order): boolean {
    return order.paymentStatus === 'paid' && Boolean(order.customerId);
  },

  hasOrderAlreadyBeenStamped(order: Order | string): boolean {
    if (typeof order === 'string') return false;
    return order.loyaltyStampStatus === 'already-stamped';
  },

  grantStampForConfirmedOrder(order: Order): Promise<LoyaltyStampResult> {
    return loyaltyApi.grantOrderStamp(order.id);
  },

  grantManualStamp(customerId: string, reason?: string): Promise<LoyaltyStampResult> {
    return loyaltyApi.grantManualStamp(customerId, reason);
  },

  getCustomerLoyalty(customerId: string): Promise<LoyaltyAccount> {
    return loyaltyApi.getLoyaltyAccount(customerId);
  },
};
