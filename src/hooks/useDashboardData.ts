import { useEffect, useState } from 'react';
import { dashboardService } from '@/services/dashboardService';
import type { DashboardData } from '@/types/dashboard';

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setData(await dashboardService.getDashboardData());
      } catch {
        setError('Unable to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { data, loading, error };
};
