import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import ScrollToTop from './components/atoms/ScrollToTop';

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
    <div className="min-h-screen relative bg-dark-bg selection:bg-primary selection:text-white flex flex-col pb-24 lg:pb-0">
      <ScrollToTop />
      {/* Ambient Lights Global dengan transform-gpu */}
      <div className="fixed top-1/4 -left-64 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0 transform-gpu"></div>
      <div className="fixed bottom-1/4 -right-64 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none z-0 transform-gpu"></div>

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