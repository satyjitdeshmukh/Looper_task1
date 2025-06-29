
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MetricsCard from './MetricsCard';
import Charts from './Charts';
import TransactionTable from './TransactionTable';
import AlertChip from './AlertChip';
import { useFinancialData } from '../hooks/useFinancialData';
import { exportToCSV } from '../utils/csvExport';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [alerts, setAlerts] = useState<Array<{id: string, type: 'error' | 'success' | 'warning' | 'info', message: string}>>([]);
  
  const { transactions, metrics, cashFlowData, categoryData, trendData } = useFinancialData();

  const addAlert = (type: 'error' | 'success' | 'warning' | 'info', message: string) => {
    const id = Date.now().toString();
    setAlerts(prev => [...prev, { id, type, message }]);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const handleExportCSV = () => {
    try {
      exportToCSV(transactions);
      addAlert('success', 'Transactions exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      addAlert('error', 'Failed to export transactions. Please try again.');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricsCard
                title="Total Income"
                value={formatCurrency(metrics.totalIncome)}
                change="+12.5%"
                changeType="positive"
                icon="income"
              />
              <MetricsCard
                title="Total Expenses"
                value={formatCurrency(metrics.totalExpenses)}
                change="+8.2%"
                changeType="negative"
                icon="expense"
              />
              <MetricsCard
                title="Net Cash Flow"
                value={formatCurrency(metrics.netCashFlow)}
                change="+15.3%"
                changeType={metrics.netCashFlow >= 0 ? 'positive' : 'negative'}
                icon="total"
              />
              <MetricsCard
                title="Total Transactions"
                value={metrics.transactionCount.toString()}
                change="+5 this week"
                changeType="neutral"
                icon="count"
              />
            </div>
            <Charts 
              cashFlowData={cashFlowData}
              categoryData={categoryData}
              trendData={trendData}
            />
          </div>
        );
      case 'transactions':
        return (
          <TransactionTable 
            transactions={transactions}
            onExportCSV={handleExportCSV}
          />
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Advanced Analytics</h2>
              <p className="text-slate-600 mb-6">Detailed financial analysis and insights.</p>
              <Charts 
                cashFlowData={cashFlowData}
                categoryData={categoryData}
                trendData={trendData}
              />
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Reports & Export</h2>
            <p className="text-slate-600 mb-6">Generate and download financial reports.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleExportCSV}
                className="p-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-left"
              >
                <h3 className="font-medium text-slate-900 mb-2">Export All Transactions</h3>
                <p className="text-sm text-slate-600">Download complete transaction history as CSV</p>
              </button>
              <button
                onClick={() => addAlert('info', 'Custom reports feature coming soon!')}
                className="p-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-left"
              >
                <h3 className="font-medium text-slate-900 mb-2">Custom Report Builder</h3>
                <p className="text-sm text-slate-600">Create customized financial reports</p>
              </button>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Settings</h2>
            <p className="text-slate-600">Application settings and preferences.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Alert Container */}
        {alerts.length > 0 && (
          <div className="p-4 space-y-2">
            {alerts.map((alert) => (
              <AlertChip
                key={alert.id}
                type={alert.type}
                message={alert.message}
                onClose={() => removeAlert(alert.id)}
                autoClose
              />
            ))}
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 capitalize">
                {activeView === 'dashboard' ? 'Financial Dashboard' : activeView}
              </h1>
              <p className="text-slate-600 mt-1">
                {activeView === 'dashboard' && 'Overview of your financial data and key metrics'}
                {activeView === 'transactions' && 'Manage and analyze your transactions'}
                {activeView === 'analytics' && 'Advanced financial analytics and insights'}
                {activeView === 'reports' && 'Generate and export financial reports'}
                {activeView === 'settings' && 'Configure your application preferences'}
              </p>
            </div>
            
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
