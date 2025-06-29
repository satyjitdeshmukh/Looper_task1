
export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'completed' | 'pending' | 'failed';
  account: string;
  reference?: string;
}

export interface DashboardMetrics {
  totalIncome: number;
  totalExpenses: number;
  netCashFlow: number;
  transactionCount: number;
  avgTransactionAmount: number;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
  income?: number;
  expenses?: number;
}

export interface FilterOptions {
  dateRange: {
    start: string;
    end: string;
  };
  categories: string[];
  types: ('income' | 'expense')[];
  status: ('completed' | 'pending' | 'failed')[];
  amountRange: {
    min: number;
    max: number;
  };
}
