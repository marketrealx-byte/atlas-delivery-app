
export type DataRow = any[];

export interface DashboardData {
  trips: DataRow[];
  fuel: DataRow[];
  expenses: DataRow[];
  trucks: DataRow[];
  drivers: DataRow[];
}

export enum Tab {
  TRIPS = 'trips',
  FINANCE = 'finance',
  FOUNDATION = 'foundation',
  REPORTS = 'reports'
}

export interface Notification {
  id: string;
  type: 'success' | 'error';
  message: string;
}
