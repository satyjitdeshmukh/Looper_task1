
import { useState, useMemo } from 'react';
import { Transaction, DashboardMetrics, ChartData } from '../types/financial';
import { mockTransactions } from '../data/mockData';

export const useFinancialData = () => {
  const [transactions] = useState<Transaction[]>(mockTransactions);

  const metrics: DashboardMetrics = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = Math.abs(transactions
      .filter(t => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0));

    const netCashFlow = totalIncome - totalExpenses;
    const transactionCount = transactions.length;
    const avgTransactionAmount = transactions.length > 0 
      ? transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / transactions.length
      : 0;

    return {
      totalIncome,
      totalExpenses,
      netCashFlow,
      transactionCount,
      avgTransactionAmount
    };
  }, [transactions]);

  const cashFlowData: ChartData[] = useMemo(() => {
    const groupedByDate = transactions.reduce((acc, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(groupedByDate)
      .map(([date, value]) => ({ date, value, name: date }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [transactions]);

  const categoryData: ChartData[] = useMemo(() => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += Math.abs(transaction.amount);
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const trendData: ChartData[] = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayTransactions = transactions.filter(t => t.date === date);
      const income = dayTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = Math.abs(dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0));

      return {
        name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        income,
        expenses,
        value: income - expenses
      };
    });
  }, [transactions]);

  return {
    transactions,
    metrics,
    cashFlowData,
    categoryData,
    trendData
  };
};
