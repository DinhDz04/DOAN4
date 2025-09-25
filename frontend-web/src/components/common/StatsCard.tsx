import React from 'react';
import { StatsCardProps } from '../../types';
import Card from './Card';

const StatsCard: React.FC<StatsCardProps> = ({ 
  icon, 
  title, 
  value, 
  subtitle, 
  color = 'blue' 
}) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600'
  };
  
  return (
    <Card className={`bg-gradient-to-r ${colors[color]} text-white`} padding="lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && <p className="text-white/70 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className="text-white/80">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;