
import React from 'react';
import { motion } from 'framer-motion';

// FIX: Extend component props from motion.button to avoid type conflicts with React's HTML attributes.
interface ButtonProps extends Omit<React.ComponentProps<typeof motion.button>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-[var(--primary)] hover:opacity-90 text-white focus:ring-[var(--primary-focus)] shadow-lg shadow-[var(--primary-shadow)] focus:ring-offset-[var(--background)]',
    secondary: 'bg-[var(--muted)] hover:opacity-90 text-[var(--muted-foreground)] focus:ring-[var(--muted-foreground)] border border-[var(--border)] focus:ring-offset-[var(--background)]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
