export const KPICard = ({ title, value, subtitle }: { title: string; value: string; subtitle: string }) => (
  <article className="rounded-lg border bg-white dark:bg-slate-800 p-4 space-y-1">
    <p className="text-sm text-slate-500">{title}</p>
    <p className="text-2xl font-semibold">{value}</p>
    <p className="text-xs text-slate-400">{subtitle}</p>
  </article>
);
