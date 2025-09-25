import React from 'react';
import { AlertProps } from '../../types';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Alert: React.FC<AlertProps> = ({ 
  type, 
  title, 
  message, 
  onClose, 
  className = '' 
}) => {
  const types = {
    success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: CheckCircle2 },
    error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: XCircle },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: AlertCircle },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: Info }
  };
  
  const { bg, border, text, icon: Icon } = types[type];
  
  return (
    <div className={`${bg} ${border} border rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <Icon className={`h-5 w-5 ${text} mt-0.5 mr-3`} />
        <div className="flex-1">
          {title && <h3 className={`text-sm font-medium ${text} mb-1`}>{title}</h3>}
          <p className={`text-sm ${text}`}>{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`${text} hover:opacity-70`}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;