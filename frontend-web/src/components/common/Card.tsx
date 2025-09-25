import React from 'react';
import { CardProps } from '../../types';

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'md', 
  shadow = 'md',
  hover = false 
}) => {
  const paddings = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  const shadows = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };
  
  const hoverEffect = hover ? 'hover:shadow-xl transition-shadow duration-200' : '';
  
  return (
    <div className={`bg-white rounded-xl ${shadows[shadow]} ${paddings[padding]} ${hoverEffect} ${className}`}>
      {children}
    </div>
  );
};

export default Card;