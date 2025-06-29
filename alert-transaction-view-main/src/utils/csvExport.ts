
import { Transaction } from '../types/financial';

export const exportToCSV = (transactions: Transaction[], filename: string = 'transactions') => {
  const headers = [
    'Date',
    'Description',
    'Category',
    'Amount',
    'Type',
    'Status',
    'Account',
    'Reference'
  ];

  const csvContent = [
    headers.join(','),
    ...transactions.map(transaction => [
      transaction.date,
      `"${transaction.description}"`,
      transaction.category,
      transaction.amount,
      transaction.type,
      transaction.status,
      `"${transaction.account}"`,
      transaction.reference || ''
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportFilteredTransactions = (
  transactions: Transaction[],
  filters: {
    searchTerm?: string;
    dateRange?: { start: string; end: string };
    categories?: string[];
    types?: string[];
    status?: string[];
  }
) => {
  let filteredTransactions = [...transactions];

  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filteredTransactions = filteredTransactions.filter(t => 
      t.description.toLowerCase().includes(searchLower) ||
      t.category.toLowerCase().includes(searchLower) ||
      t.reference?.toLowerCase().includes(searchLower)
    );
  }

  if (filters.dateRange) {
    const startDate = new Date(filters.dateRange.start);
    const endDate = new Date(filters.dateRange.end);
    filteredTransactions = filteredTransactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }

  if (filters.categories && filters.categories.length > 0) {
    filteredTransactions = filteredTransactions.filter(t => 
      filters.categories!.includes(t.category)
    );
  }

  if (filters.types && filters.types.length > 0) {
    filteredTransactions = filteredTransactions.filter(t => 
      filters.types!.includes(t.type)
    );
  }

  if (filters.status && filters.status.length > 0) {
    filteredTransactions = filteredTransactions.filter(t => 
      filters.status!.includes(t.status)
    );
  }

  exportToCSV(filteredTransactions, 'filtered_transactions');
};
