import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import ScrollToTop from './components/atoms/ScrollToTop';
import InteractiveBackground from './components/atoms/InteractiveBackground';

// Lazy load halaman
const Home = lazy(() => import('./pages/Home'));
const NFTDetail = lazy(() => import('./pages/NFTDetail'));
const Profile = lazy(() => import('./pages/Profile'));

const PageFallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-dark-bg">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(138,43,226,0.5)]"></div>
  </div>
);

function App() {
  const location = useLocation();

  return (
    // PERBAIKAN MOBILE: Tambahan pb-24 lg:pb-0 agar footer tidak tertutup bottom nav
    <div className="min-h-screen relative selection:bg-primary selection:text-white flex flex-col pb-24 lg:pb-0 text-white">
      <ScrollToTop />
      {/* Ambient Lights Global dengan transform-gpu */}
      <InteractiveBackground />
      <Navbar />

      <main className="flex-1 w-full relative z-10">
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/nft/:id" element={<NFTDetail />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;