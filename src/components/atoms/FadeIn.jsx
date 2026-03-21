import React from 'react';
import { m, LazyMotion, domAnimation } from 'framer-motion'; 
// Perhatikan: kita import 'm' bukan 'motion', dan import LazyMotion & domAnimation

const FadeIn = ({ children, delay = 0, direction = 'up', className = '', id }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    // Bungkus dengan LazyMotion
    <LazyMotion features={domAnimation} strict>
      {/* Gunakan m.div, bukan motion.div */}
      <m.div
        id={id}
        initial={{ opacity: 0, ...directions[direction] }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: delay }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};

export default FadeIn;