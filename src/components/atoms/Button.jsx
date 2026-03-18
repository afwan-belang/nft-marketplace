import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  // Detail kecil: active:scale-95 memberikan efek tombol "ditekan" yang realistis
  const baseStyle = "relative inline-flex items-center justify-center px-6 py-2.5 text-sm md:text-base font-medium rounded-full transition-all duration-300 active:scale-95 z-10 overflow-hidden";
  
  const variants = {
    // Tombol utama dengan efek pendaran (glow)
    primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-[0_0_15px_rgba(138,43,226,0.3)] hover:shadow-[0_0_25px_rgba(65,105,225,0.6)] border border-white/10",
    
    // Tombol sekunder dengan efek glassmorphism
    glass: "glass-panel text-white hover:bg-white/10 hover:border-white/20",
    
    // Tombol outline biasa
    outline: "border border-white/20 text-white hover:bg-white/5",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;