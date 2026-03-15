import type { LoginHistoryEntry, LoginHistoryFilters } from '@/types/loginHistory';

const loginHistoryStore: LoginHistoryEntry[] = [
  {
    id: 'l1',
    userId: 'u1',
    userName: 'Olivia Owner',
    role: 'owner',
    loginTime: new Date().toISOString(),
    logoutTime: '',
    ipAddress: '192.168.0.12',
    device: 'Chrome on macOS',
    loginStatus: 'success',
  },
  {
    id: 'l2',
    userId: 'u2',
    userName: 'Sean Staff',
    role: 'staff',
    loginTime: new Date(Date.now() - 7200000).toISOString(),
    logoutTime: new Date(Date.now() - 3600000).toISOString(),
    ipAddress: '192.168.0.16',
    device: 'Safari on iPhone',
    loginStatus: 'success',
  },
  {
    id: 'l3',
    userId: 'u3',
    userName: 'Casey Customer',
    role: 'customer',
    loginTime: new Date(Date.now() - 5400000).toISOString(),
    logoutTime: '',
    ipAddress: '10.0.0.4',
    device: 'Edge on Windows',
    loginStatus: 'failed',
  },
];

export const loginHistoryService = {
  async recordLogin(entry: Omit<LoginHistoryEntry, 'id'>) {
    const record = { ...entry, id: `l${Date.now()}` };
    loginHistoryStore.unshift(record);
    return record;
  },

  async recordLogout(userId: string) {
    const openRecord = loginHistoryStore.find((entry) => entry.userId === userId && !entry.logoutTime);
    if (openRecord) openRecord.logoutTime = new Date().toISOString();
  },

  async getLoginHistory(filters: LoginHistoryFilters) {
    let rows = [...loginHistoryStore];

    if (filters.query) rows = rows.filter((item) => item.userName.toLowerCase().includes(filters.query.toLowerCase()));
    if (filters.role !== 'all') rows = rows.filter((item) => item.role === filters.role);
    if (filters.status !== 'all') rows = rows.filter((item) => item.loginStatus === filters.status);
    if (filters.date) rows = rows.filter((item) => item.loginTime.startsWith(filters.date));

    const start = (filters.page - 1) * filters.pageSize;
    const pagedRows = rows.slice(start, start + filters.pageSize);

    return { rows: pagedRows, total: rows.length };
  },

  async getLoginStats() {
    const today = new Date().toISOString().slice(0, 10);
    const todayEntries = loginHistoryStore.filter((entry) => entry.loginTime.startsWith(today));

    return {
      totalToday: todayEntries.length,
      failed: todayEntries.filter((entry) => entry.loginStatus === 'failed').length,
      staff: todayEntries.filter((entry) => entry.role === 'staff').length,
      customer: todayEntries.filter((entry) => entry.role === 'customer').length,
    };
  },
};
