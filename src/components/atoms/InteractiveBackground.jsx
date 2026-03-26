import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';

const InteractiveBackground = () => {
    // 1. DETEKSI MOBILE (Lebar layar di bawah 768px)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile(); // Cek saat pertama kali render
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 2. SETUP MOUSE TRACKING (Hanya relevan untuk Desktop)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 40, stiffness: 150, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        if (isMobile) return; // Jangan pasang event listener berat di HP

        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 2;
            const y = (e.clientY / innerHeight - 0.5) * 2;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY, isMobile]);

    // 3. SETUP SCROLL TRACKING (Berjalan di Mobile & Desktop)
    const { scrollY } = useScroll();

    // Desktop Mouse Parallax (Jika di mobile, nilainya tetap 0)
    const x1 = useTransform(smoothX, [-1, 1], [-200, 200]);
    const y1 = useTransform(smoothY, [-1, 1], [-200, 200]);
    const x2 = useTransform(smoothX, [-1, 1], [200, -200]);
    const y2 = useTransform(smoothY, [-1, 1], [200, -200]);

    const tiltX = useTransform(smoothY, [-1, 1], [20, -20]);
    const tiltY = useTransform(smoothX, [-1, 1], [-20, 20]);

    // Scroll Parallax (Aktif di semua device)
    const scrollY1 = useTransform(scrollY, [0, 2000], [0, isMobile ? -200 : -500]);
    const scrollY2 = useTransform(scrollY, [0, 2000], [0, isMobile ? -300 : -800]);
    const gridScroll = useTransform(scrollY, [0, 2000], [0, isMobile ? -100 : -300]);

    return (
        // overflow-hidden sangat penting agar HP tidak bisa digeser ke samping (horizontal scroll bug)
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0a0a]">

            {/* 1. GRID GEOMETRIS */}
            <motion.div
                style={{
                    rotateX: tiltX,
                    rotateY: tiltY,
                    y: gridScroll,
                    perspective: 1000
                }}
                className="absolute inset-0 opacity-30 md:opacity-40 transform-gpu"
            >
                <div
                    className="w-[200%] h-[200%] absolute -top-[50%] -left-[50%]"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
                        backgroundSize: isMobile ? '3rem 3rem' : '4rem 4rem', // Grid lebih kecil di HP
                        maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 40%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 40%, transparent 100%)'
                    }}
                ></div>
            </motion.div>

            {/* 2. CAHAYA UNGU (Primary) */}
            <motion.div
                // Di mobile, gunakan animasi otomatis (animate). Di desktop, gunakan mouse (style.x, style.y)
                animate={isMobile ? { y: [0, -40, 0], x: [0, 20, 0] } : {}}
                transition={isMobile ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : {}}
                style={{ x: isMobile ? 0 : x1, y: isMobile ? 0 : y1, translateY: scrollY1 }}
                className="absolute top-[10%] left-[-20%] md:top-[20%] md:left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/30 md:bg-primary/40 rounded-full blur-[70px] md:blur-[100px] mix-blend-screen transform-gpu"
            />

            {/* 3. CAHAYA BIRU (Secondary) */}
            <motion.div
                animate={isMobile ? { y: [0, 40, 0], x: [0, -20, 0] } : {}}
                transition={isMobile ? { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 } : {}}
                style={{ x: isMobile ? 0 : x2, y: isMobile ? 0 : y2, translateY: scrollY2 }}
                className="absolute top-[60%] right-[-20%] md:top-[50%] md:right-[10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-secondary/30 md:bg-secondary/40 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen transform-gpu"
            />
        </div>
    );
};

export default InteractiveBackground;