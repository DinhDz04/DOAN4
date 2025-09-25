import React from 'react';
import { ProgressBarProps } from '../../types';

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  height = 'md', 
  color = 'blue', 
  showPercentage = false,
  className = '' 
}) => {
  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };
  
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500'
  };
  
  return (
    <div className={className}>
      <div className={`w-full bg-gray-200 rounded-full ${heights[height]}`}>
        <div
          className={`${colors[color]} ${heights[height]} rounded-full transition-all duration-300`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showPercentage && (
        <span className="text-sm text-gray-600 mt-1">{progress}%</span>
      )}
    </div>
  );
};

export default ProgressBar;