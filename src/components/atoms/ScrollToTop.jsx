import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Memaksa browser scroll ke paling atas (X: 0, Y: 0) setiap kali URL berubah
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Gunakan 'instant' agar tidak terlihat efek sliding yang aneh saat ganti halaman
    });
  }, [pathname]);

  // Komponen ini tidak merender UI apa pun (hanya logika)
  return null; 
};

export default ScrollToTop;