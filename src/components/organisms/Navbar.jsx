import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { Search, Home, Compass, ShoppingBag, User, ArrowLeft } from 'lucide-react';
import Button from '../atoms/Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); 
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Logika Cerdas untuk membaca posisi halaman saat ini
  const isNotHomePage = location.pathname !== '/';
  const isDetailPage = location.pathname.includes('/nft/');
  const isProfilePage = location.pathname === '/profile';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Sinkronisasi highlight tab navigasi jika user me-refresh halaman Profile
    if (location.pathname === '/profile') {
      setActiveTab('profile');
    } else if (location.pathname === '/') {
      if (activeTab === 'profile') setActiveTab('home');
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, activeTab]);

  const executeScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  // Fungsi sentral untuk menangani semua klik menu
  const handleNavigation = (e, link) => {
    e.preventDefault();
    setActiveTab(link.id);

    if (link.path === '/profile') {
      navigate('/profile');
      window.scrollTo(0, 0); // Pindah ke Profile dan mulai dari posisi atas
    } else {
      if (isNotHomePage) {
        navigate('/'); // Jika sedang di Profile/Detail, pulang dulu ke Home
        setTimeout(() => executeScroll(link.id), 100); // Lalu scroll
      } else {
        executeScroll(link.id); // Jika sudah di Home, langsung scroll
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setActiveTab('home');
    if (isNotHomePage) {
      navigate('/');
      setTimeout(() => executeScroll('home'), 100);
    } else {
      executeScroll('home');
    }
  };

  const desktopLinks = [
    { name: 'Home', id: 'home', path: '/' },
    { name: 'Explore', id: 'explore', path: '/' },
    { name: 'Marketplace', id: 'marketplace', path: '/' },
    { name: 'Profile', id: 'profile', path: '/profile' },
  ];
  
  const mobileLinks = [
    { name: 'Home', id: 'home', icon: Home, path: '/' },
    { name: 'Explore', id: 'explore', icon: Compass, path: '/' },
    { name: 'Market', id: 'marketplace', icon: ShoppingBag, path: '/' },
    { name: 'Profile', id: 'profile', icon: User, path: '/profile' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isNotHomePage ? 'bg-dark-bg/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            {/* Tombol Back HANYA muncul jika berada di halaman Detail NFT */}
            {isDetailPage && (
              <button onClick={() => navigate(-1)} className="lg:hidden text-white bg-white/10 p-2 rounded-full transition-colors hover:bg-white/20">
                <ArrowLeft size={20} />
              </button>
            )}
            
            <div className="flex items-center gap-2 cursor-pointer z-50" onClick={handleLogoClick}>
              <span className="text-white text-xl md:text-2xl font-bold font-display tracking-wider">
                PLAY <span className="text-gradient">NFT</span>
              </span>
            </div>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            {desktopLinks.map((link, index) => {
              // Highlight akan aktif jika ID cocok di halaman Home ATAU jika sedang berada di /profile
              const isActive = (activeTab === link.id && !isNotHomePage) || (link.id === 'profile' && isProfilePage);
              return (
                <li key={index}>
                  <a 
                    href={link.path === '/profile' ? '/profile' : `/#${link.id}`}
                    onClick={(e) => handleNavigation(e, link)}
                    className={`text-sm font-medium transition-colors hover:text-white ${
                      isActive ? 'text-white font-semibold' : 'text-gray-400'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
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

          {!isNotHomePage && (
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
            const isActive = (activeTab === item.id && !isNotHomePage) || (item.id === 'profile' && isProfilePage);

            return (
              <li 
                key={index} 
                onClick={(e) => handleNavigation(e, item)}
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