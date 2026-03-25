import React, { useState, useEffect } from 'react';
// 1. Import hooks dari react-router-dom
import { useNavigate, useLocation, Link } from 'react-router-dom'; 
import { Search, Home, Compass, ShoppingBag, User, ArrowLeft } from 'lucide-react';
import Button from '../atoms/Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); 
  
  // 2. Inisialisasi hooks
  const navigate = useNavigate();
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/nft/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Logika Scroll Cerdas (Mendukung Lintas Halaman)
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setActiveTab(sectionId);

    // Jika user berada di halaman detail NFT, pindahkan dulu ke Home '/'
    if (isDetailPage) {
      navigate('/');
      // Beri jeda 100ms agar halaman Home selesai di-render sebelum mulai men-scroll
      setTimeout(() => {
        executeScroll(sectionId);
      }, 100);
    } else {
      // Jika sudah di Home, langsung scroll
      executeScroll(sectionId);
    }
  };

  const executeScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const desktopLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Explore', id: 'explore' },
    { name: 'Marketplace', id: 'marketplace' },
    { name: 'Artists', id: 'artists' },
  ];
  
  const mobileLinks = [
    { name: 'Home', id: 'home', icon: Home },
    { name: 'Explore', id: 'explore', icon: Compass },
    { name: 'Market', id: 'marketplace', icon: ShoppingBag },
    { name: 'Artists', id: 'artists', icon: User },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isDetailPage ? 'bg-dark-bg/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            {/* Tombol Back muncul khusus di Mobile jika sedang di halaman detail */}
            {isDetailPage && (
              <button onClick={() => navigate('/')} className="lg:hidden text-white bg-white/10 p-2 rounded-full">
                <ArrowLeft size={20} />
              </button>
            )}
            
            <div 
              className="flex items-center gap-2 cursor-pointer z-50"
              onClick={(e) => scrollToSection(e, 'home')}
            >
              <span className="text-white text-xl md:text-2xl font-bold font-display tracking-wider">
                PLAY <span className="text-gradient">NFT</span>
              </span>
            </div>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            {desktopLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    activeTab === link.id && !isDetailPage ? 'text-white font-semibold' : 'text-gray-400'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all w-48 focus:w-64 placeholder:text-gray-500"
              />
            </div>
            <Button variant="primary">Register</Button>
          </div>

          {/* Sembunyikan ikon Search & Register di Mobile saat berada di halaman detail agar tidak kepenuhan */}
          {!isDetailPage && (
            <div className="flex lg:hidden items-center gap-4">
              <Search className="text-gray-400 hover:text-white transition-colors" size={20} />
              <Button variant="primary" className="px-4 py-1.5 text-xs">Register</Button>
            </div>
          )}

        </div>
      </nav>

      {/* BOTTOM NAVIGATION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-xl border-t border-white/10 px-6 py-2 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        <ul className="flex justify-between items-center">
          {mobileLinks.map((item, index) => {
            const Icon = item.icon;
            // Aktif jika tab cocok ATAU jika sedang di detail page dan tidak ada tab yang benar-benar aktif
            const isActive = activeTab === item.id && !isDetailPage;

            return (
              <li 
                key={index} 
                onClick={(e) => scrollToSection(e, item.id)}
                className="flex flex-col items-center gap-1 cursor-pointer group relative w-12"
              >
                {isActive && (
                  <div className="absolute -top-3 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_#8A2BE2]"></div>
                )}
                
                <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                  isActive ? 'text-primary scale-110' : 'text-gray-500 group-hover:text-gray-300'
                }`}>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                
                <span className={`text-[10px] font-medium transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-gray-500'
                }`}>
                  {item.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Navbar;