import { KPICard } from '@/components/dashboard/KPICard';
import { TierBadge } from '@/components/ui';
import { useCustomers } from '@/hooks/useCustomers';
import { useDashboardData } from '@/hooks/useDashboardData';

export const DashboardPage = () => {
  const { data, loading, error } = useDashboardData();
  const { customers } = useCustomers();

  if (loading) return <p>Loading dashboard...</p>;
  if (error || !data) return <p className="text-red-600">{error || 'Error'}</p>;

  return (
    <div className="space-y-4">
      <section className="grid md:grid-cols-4 gap-3">
        {data.kpis.map((item) => <KPICard key={item.label} title={item.label} value={item.value} subtitle={item.helpText} />)}
      </section>
      <section className="grid md:grid-cols-4 gap-3">
        {data.tierSummary.map((item) => <KPICard key={item.tier} title={`${item.tier} customers`} value={String(item.total)} subtitle="Tier analytics" />)}
      </section>
      <section className="rounded-lg border bg-white dark:bg-slate-800 p-4">
        <h3 className="font-medium mb-3">Customer tiers</h3>
        <table className="w-full text-sm">
          <thead><tr className="text-left"><th>Name</th><th>Email</th><th>Points</th><th>Tier</th></tr></thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t">
                <td>{customer.name}</td><td>{customer.email}</td><td>{customer.points}</td><td><TierBadge tier={customer.tier} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
