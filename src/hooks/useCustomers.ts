import { useEffect, useState } from 'react';
import { customerService } from '@/services/customerService';
import type { Customer } from '@/types/customer';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    customerService.getCustomers().then((rows) => {
      setCustomers(rows);
      setLoading(false);
    });
  }, []);

  return { customers, loading };
};
