
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: 'income' | 'expense' | 'total' | 'count';
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, change, changeType, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'income':
        return <TrendingUp className="w-6 h-6 text-green-500" />;
      case 'expense':
        return <TrendingDown className="w-6 h-6 text-red-500" />;
      case 'total':
        return <DollarSign className="w-6 h-6 text-blue-500" />;
      case 'count':
        return <Activity className="w-6 h-6 text-purple-500" />;
      default:
        return <DollarSign className="w-6 h-6 text-blue-500" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      default:
        return 'text-slate-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-slate-50 rounded-lg p-3">
          {getIcon()}
        </div>
        <span className={`text-sm font-medium ${getChangeColor()}`}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
};

export default MetricsCard;
