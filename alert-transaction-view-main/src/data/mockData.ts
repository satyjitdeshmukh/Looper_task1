import { Transaction } from '../types/financial';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    description: 'Revenue Transaction - user_001',
    category: 'Revenue',
    amount: 1500.00,
    type: 'income',
    status: 'completed',
    account: 'Main Account',
    reference: 'TXN-001'
  },
  {
    id: '2',
    date: '2024-02-21',
    description: 'Expense Transaction - user_002',
    category: 'Technology',
    amount: -1200.50,
    type: 'expense',
    status: 'completed',
    account: 'Operating Account',
    reference: 'TXN-002'
  },
  {
    id: '3',
    date: '2024-03-03',
    description: 'Revenue Transaction - user_003',
    category: 'Revenue',
    amount: 300.75,
    type: 'income',
    status: 'pending',
    account: 'Main Account',
    reference: 'TXN-003'
  },
  {
    id: '4',
    date: '2024-04-10',
    description: 'Expense Transaction - user_004',
    category: 'Equipment',
    amount: -5000.00,
    type: 'expense',
    status: 'completed',
    account: 'Capital Account',
    reference: 'TXN-004'
  },
  {
    id: '5',
    date: '2024-05-20',
    description: 'Revenue Transaction - user_001',
    category: 'Revenue',
    amount: 800.00,
    type: 'income',
    status: 'pending',
    account: 'Main Account',
    reference: 'TXN-005'
  },
  {
    id: '6',
    date: '2024-06-12',
    description: 'Expense Transaction - user_002',
    category: 'Marketing',
    amount: -2200.25,
    type: 'expense',
    status: 'completed',
    account: 'Marketing Account',
    reference: 'TXN-006'
  },
  {
    id: '7',
    date: '2024-07-14',
    description: 'Revenue Transaction - user_003',
    category: 'Revenue',
    amount: 900.00,
    type: 'income',
    status: 'pending',
    account: 'Main Account',
    reference: 'TXN-007'
  },
  {
    id: '8',
    date: '2024-08-05',
    description: 'Expense Transaction - user_004',
    category: 'Utilities',
    amount: -150.00,
    type: 'expense',
    status: 'completed',
    account: 'Operating Account',
    reference: 'TXN-008'
  },
  {
    id: '9',
    date: '2024-09-10',
    description: 'Revenue Transaction - user_001',
    category: 'Revenue',
    amount: 650.00,
    type: 'income',
    status: 'completed',
    account: 'Main Account',
    reference: 'TXN-009'
  },
  {
    id: '10',
    date: '2024-10-30',
    description: 'Expense Transaction - user_002',
    category: 'Legal',
    amount: -1200.00,
    type: 'expense',
    status: 'pending',
    account: 'Operating Account',
    reference: 'TXN-010'
  },
  {
    id: '11',
    date: '2024-11-25',
    description: 'Revenue Transaction - user_003',
    category: 'Revenue',
    amount: 1500.75,
    type: 'income',
    status: 'completed',
    account: 'Main Account',
    reference: 'TXN-011'
  },
  {
    id: '12',
    date: '2024-12-05',
    description: 'Expense Transaction - user_004',
    category: 'Travel',
    amount: -800.00,
    type: 'expense',
    status: 'completed',
    account: 'Operating Account',
    reference: 'TXN-012'
  },
  {
    id: '13',
    date: '2024-01-11',
    description: 'Revenue Transaction - user_001',
    category: 'Revenue',
    amount: 700.00,
    type: 'income',
    status: 'pending',
    account: 'Main Account',
    reference: 'TXN-013'
  },
  {
    id: '14',
    date: '2024-02-17',
    description: 'Expense Transaction - user_002',
    category: 'Utilities',
    amount: -200.00,
    type: 'expense',
    status: 'completed',
    account: 'Operating Account',
    reference: 'TXN-014'
  },
  {
    id: '15',
    date: '2024-03-25',
    description: 'Revenue Transaction - user_003',
    category: 'Revenue',
    amount: 2500.00,
    type: 'income',
    status: 'completed',
    account: 'Main Account',
    reference: 'TXN-015'
  },
  {
    id: '16',
    date: '2024-04-22',
    description: 'Expense Transaction - user_004',
    category: 'Equipment',
    amount: -1700.00,
    type: 'expense',
    status: 'pending',
    account: 'Capital Account',
    reference: 'TXN-016'
  },
  {
    id: '17',
    date: '2024-05-13',
    description: 'Revenue Transaction - user_001',
    category: 'Revenue',
    amount: 3500.50,
    type: 'income',
    status: 'completed',
    account: 'Main Account',
    reference: 'TXN-017'
  },
  {
    id: '18',
    date: '2024-06-23',
    description: 'Expense Transaction - user_002',
    category: 'Marketing',
    amount: -450.75,
    type: 'expense',
    status: 'pending',
    account: 'Marketing Account',
    reference: 'TXN-018'
  },
  {
    id: '19',
    date: '2024-07-01',
    description: 'Revenue Transaction - user_003',
    category: 'Revenue',
    amount: 900.00,
    type: 'income',
    status: 'completed',
    account: 'Main Account',
    reference: 'TXN-019'
  },
  {
    id: '20',
    date: '2024-08-07',
    description: 'Expense Transaction - user_004',
    category: 'Technology',
    amount: -2300.00,
    type: 'expense',
    status: 'completed',
    account: 'Operating Account',
    reference: 'TXN-020'
  },
  {
    id: '21',
    date: '2024-09-15',
    description: 'Revenue Transaction - user_001',
    category: 'Revenue',
    amount: 850.25,
    type: 'income',
    status: 'pending',
    account: 'Main Account',
    reference: 'TXN-021'
  },
  {
    id: '22',
    date: '2024-10-04',
    description: 'Expense Transaction - user_002',
    category: 'Legal',
    amount: -1300.00,
    type: 'expense',
    status: 'completed',
    account: 'Operating Account',
    reference: 'TXN-022'
  },
  {
    id: '23',
    date: '2024-11-16',
    description: 'Revenue Transaction - user_003',
    category: 'Revenue',
    amount: 950.00,
    type: 'income',
    status: 'pending',
    account: 'Main Account',
    reference: 'TXN-023'
  },
  {
    id: '24',
    date: '2024-12-23',
    description: 'Expense Transaction - user_004',
    category: 'Travel',
    amount: -2100.00,
    type: 'expense',
    status: 'completed',
    account: 'Operating Account',
    reference: 'TXN-024'
  },
  {
    id: '25',
    date: '2024-01-14',
    description: 'Revenue Transaction - user_001',
    category: 'Revenue',
    amount: 700.00,
    type: 'income',
    status: 'completed',
    account: 'Main Account',
    reference: 'TXN-025'
  },
  {
    id: '26',
    date: '2024-02-09',
    description: 'Expense Transaction - user_002',
    category: 'Technology',
    amount: -1000.50,
    type: 'expense',
    status: 'pending',
    account: 'Operating Account',
    reference: 'TXN-026'
  },
  {
    id: '27',
    date: '2024-03-16',
    description: 'Revenue Transaction - user_003',
    category: 'Revenue',
    amount: 1900.00,
    type: 'income',
    status: 'completed',
    account: 'Main Account',
    reference: 'TXN-027'
  },
  {
    id: '28',
    date: '2024-04-13',
    description: 'Expense Transaction - user_004',
    category: 'Equipment',
    amount: -1100.00,
    type: 'expense',
    status: 'completed',
    account: 'Capital Account',
    reference: 'TXN-028'
  },
  {
    id: '29',
    date: '2024-05-10',
    description: 'Revenue Transaction - user_001',
    category: 'Revenue',
    amount: 3000.00,
    type: 'income',
    status: 'pending',
    account: 'Main Account',
    reference: 'TXN-029'
  },
  {
    id: '30',
    date: '2024-06-02',
    description: 'Expense Transaction - user_002',
    category: 'Utilities',
    amount: -600.00,
    type: 'expense',
    status: 'completed',
    account: 'Operating Account',
    reference: 'TXN-030'
  }
];

export const categories = [
  'Revenue',
  'Technology',
  'Real Estate',
  'Marketing',
  'Equipment',
  'Utilities',
  'Payroll',
  'Investment',
  'Travel',
  'Legal'
];

export const accounts = [
  'Main Account',
  'Operating Account',
  'Marketing Account',
  'Capital Account',
  'Sales Account',
  'Payroll Account',
  'Investment Account'
];