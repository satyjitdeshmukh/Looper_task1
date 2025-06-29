
import React from 'react';
import { BarChart3, TrendingUp, Filter, Download, Home, Settings } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'transactions', label: 'Transactions', icon: TrendingUp },
    { id: 'reports', label: 'Reports', icon: Download },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-blue-400">FinanceTracker Pro</h1>
        <p className="text-sm text-slate-400 mt-1">Analytics Dashboard</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeView === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Last Updated</p>
          <p className="text-sm font-medium text-white">{new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
