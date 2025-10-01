import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ButtonProps } from '../../types';
import { cn } from '../../utils/cn';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  className = '',
  icon,
  fullWidth = false,
  as,
  to,
  type = 'button',
  ...rest 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 disabled:hover:bg-primary-600',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500 disabled:hover:bg-gray-200',
    success: 'bg-success-600 hover:bg-success-700 text-white focus:ring-success-500 disabled:hover:bg-success-600',
    danger: 'bg-danger-600 hover:bg-danger-700 text-white focus:ring-danger-500 disabled:hover:bg-danger-600',
    warning: 'bg-warning-600 hover:bg-warning-700 text-white focus:ring-warning-500 disabled:hover:bg-warning-600',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300 focus:ring-gray-500',
    outline: 'bg-transparent hover:bg-primary-50 text-primary-600 border border-primary-600 focus:ring-primary-500'
  };
  
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };
  
  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );

  // If 'as' prop is provided, use it
  if (as) {
    const Component = as;
    return (
      <Component className={classes} {...rest}>
        {icon && <span className={cn('flex-shrink-0', children && 'mr-2')}>{icon}</span>}
        {children}
      </Component>
    );
  }

  // If 'to' prop is provided, render as Link
  if (to) {
    return (
      <Link to={to} className={classes}>
        {icon && <span className={cn('flex-shrink-0', children && 'mr-2')}>{icon}</span>}
        {children}
      </Link>
    );
  }

  // Default: render as button
  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className={cn('flex-shrink-0', children && 'mr-2')}>{icon}</span>}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;