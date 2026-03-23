import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({ children, delay = 0, direction = 'up', className = '', id }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      // Perbaikan 1: Gunakan amount 0.1 agar lebih akurat di HP
      viewport={{ once: true, amount: 0.1 }}
      // Perbaikan 2: Durasi sedikit dipanjangkan (0.8) dengan kurva Apple-like
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay }}
      // Perbaikan 3: transform-gpu memastikan layer dikomposisi oleh GPU
      className={`${className} transform-gpu`}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;