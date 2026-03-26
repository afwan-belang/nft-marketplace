import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';

const InteractiveBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; 
      const y = (e.clientY / innerHeight - 0.5) * 2; 
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollY } = useScroll();

  // PERBAIKAN 1: Ekstremkan nilai pergerakan dari 80px menjadi 300px agar SANGAT JELAS terlihat!
  const x1 = useTransform(smoothX, [-1, 1], [-300, 300]);
  const y1 = useTransform(smoothY, [-1, 1], [-300, 300]);
  const scrollY1 = useTransform(scrollY, [0, 2000], [0, -500]);

  const x2 = useTransform(smoothX, [-1, 1], [300, -300]);
  const y2 = useTransform(smoothY, [-1, 1], [300, -300]);
  const scrollY2 = useTransform(scrollY, [0, 2000], [0, -800]);

  // Kemiringan grid dibuat ekstrem dari 10 derajat menjadi 30 derajat
  const tiltX = useTransform(smoothY, [-1, 1], [30, -30]);
  const tiltY = useTransform(smoothX, [-1, 1], [-30, 30]);
  const gridScroll = useTransform(scrollY, [0, 2000], [0, -300]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0a0a]">
      
      {/* PERBAIKAN 2: Menggunakan Inline Style murni untuk Grid agar PASTI muncul, ditambah opacity lebih tebal */}
      <motion.div 
        style={{ 
          rotateX: tiltX, 
          rotateY: tiltY,
          y: gridScroll,
          perspective: 1000
        }}
        className="absolute inset-0 opacity-40 transform-gpu"
      >
        <div 
          className="w-[200%] h-[200%] absolute -top-[50%] -left-[50%]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 40%, transparent 100%)'
          }}
        ></div>
      </motion.div>

      {/* Cahaya Ungu dibuat lebih terang */}
      <motion.div 
        style={{ x: x1, y: y1, translateY: scrollY1 }}
        className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/40 rounded-full blur-[100px] mix-blend-screen transform-gpu"
      />

      {/* Cahaya Biru dibuat lebih terang */}
      <motion.div 
        style={{ x: x2, y: y2, translateY: scrollY2 }}
        className="absolute top-[50%] right-[10%] w-[500px] h-[500px] bg-secondary/40 rounded-full blur-[100px] mix-blend-screen transform-gpu"
      />
    </div>
  );
};

export default InteractiveBackground;