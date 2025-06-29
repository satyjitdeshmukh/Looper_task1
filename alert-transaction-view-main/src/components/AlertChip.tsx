
import React, { useState } from 'react';
import { AlertTriangle, X, CheckCircle, Info } from 'lucide-react';

interface AlertChipProps {
  type: 'error' | 'success' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const AlertChip: React.FC<AlertChipProps> = ({ 
  type, 
  message, 
  onClose, 
  autoClose = false, 
  duration = 5000 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!isVisible) return null;

  const getAlertStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return <Info className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${getAlertStyles()} animate-fade-in`}>
      {getIcon()}
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        onClick={handleClose}
        className="text-current opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AlertChip;
