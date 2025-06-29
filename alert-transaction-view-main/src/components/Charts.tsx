import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ChartData } from '../types/financial';

interface ChartsProps {
  cashFlowData?: ChartData[];
  categoryData?: ChartData[];
  trendData?: ChartData[];
}

const Charts: React.FC<ChartsProps> = ({
  cashFlowData = [
    { date: 'Jan', value: 5000 },
    { date: 'Feb', value: 7000 },
    { date: 'Mar', value: 4000 },
    { date: 'Apr', value: 8500 },
    { date: 'May', value: 6200 }
  ],
  categoryData = [
    { name: 'Rent', value: 1200 },
    { name: 'Groceries', value: 900 },
    { name: 'Entertainment', value: 400 },
    { name: 'Savings', value: 1500 }
  ],
  trendData = [
    { name: 'Jan', income: 8000, expenses: 4000 },
    { name: 'Feb', income: 7500, expenses: 3500 },
    { name: 'Mar', income: 9000, expenses: 5000 },
    { name: 'Apr', income: 7000, expenses: 3000 },
    { name: 'May', income: 8500, expenses: 4500 }
  ]
}) => {
  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6B7280'];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Cash Flow Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Cash Flow Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={cashFlowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} tickFormatter={formatCurrency} />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), 'Amount']}
              labelStyle={{ color: '#1e293b' }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              fill="url(#colorGradient)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Category Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [formatCurrency(Math.abs(value)), 'Amount']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Income vs Expenses */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} tickFormatter={formatCurrency} />
            <Tooltip
              formatter={(value: number, name: string) => [
                formatCurrency(value),
                name === 'income' ? 'Income' : 'Expenses'
              ]}
              labelStyle={{ color: '#1e293b' }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="income" fill="#10B981" name="Income" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="#EF4444" name="Expenses" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
