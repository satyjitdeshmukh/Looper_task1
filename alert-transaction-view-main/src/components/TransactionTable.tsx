
import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, ChevronUp, ChevronDown } from 'lucide-react';
import { Transaction } from '../types/financial';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TransactionTableProps {
  transactions: Transaction[];
  onExportCSV: () => void;
}

type SortField = 'date' | 'amount' | 'category' | 'status';
type SortDirection = 'asc' | 'desc';

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onExportCSV }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'date') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [transactions, searchTerm, sortField, sortDirection, statusFilter, typeFilter]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 inline ml-1" /> : 
      <ChevronDown className="w-4 h-4 inline ml-1" />;
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-slate-100 text-slate-800`;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Transactions</h2>
          <Button
            onClick={onExportCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort('date')}
              >
                Date {getSortIcon('date')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Description
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort('category')}
              >
                Category {getSortIcon('category')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort('amount')}
              >
                Amount {getSortIcon('amount')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort('status')}
              >
                Status {getSortIcon('status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Reference
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredAndSortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900">
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-slate-500 text-xs">{transaction.account}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  {transaction.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {formatCurrency(transaction.amount)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(transaction.status)}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {transaction.reference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedTransactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No transactions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
