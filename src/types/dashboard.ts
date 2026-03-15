import type { CustomerTier } from './customer';

export interface KPIItem {
  label: string;
  value: string;
  helpText: string;
}

export interface TierSummary {
  tier: CustomerTier;
  total: number;
}

export interface DashboardData {
  kpis: KPIItem[];
  tierSummary: TierSummary[];
}
