import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  fullWidth = false,
  ...props 
}) => {
  const baseClasses = 'px-6 py-3 rounded-full font-medium flex items-center justify-center transition-all duration-300 outline-none focus:ring-2 focus:ring-[#FF7A18] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]';
  
  const variants = {
    primary: 'btn-gradient',
    glass: 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white',
    outline: 'border border-[#FF7A18] text-[#FFB347] hover:bg-[#FF7A18]/10'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
