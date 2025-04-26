import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  animate?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  type = 'button',
  animate = true,
}) => {
  const baseStyles = 'font-medium rounded-md transition-all duration-300 focus:outline-none';
  
  const variantStyles = {
    primary: 'fantasy-button',
    secondary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md',
    ghost: 'bg-transparent hover:bg-gray-800/50 text-gray-300 border border-gray-600 hover:text-gray-100 hover:border-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md'
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const ButtonComponent = animate ? motion.button : 'button';
  
  const animationProps = animate ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  } : {};

  return (
    <ButtonComponent
      type={type}
      className={`
        ${baseStyles} 
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${widthStyles} 
        ${disabledStyles} 
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      {...animationProps}
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;