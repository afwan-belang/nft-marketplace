import React, { lazy, Suspense } from 'react';
import Navbar from './components/organisms/Navbar';
import Hero from './components/organisms/Hero';
import FadeIn from './components/atoms/FadeIn';

// 1. Dynamic Imports (Lazy Loading) untuk area "Below the Fold"
const Brands = lazy(() => import('./components/organisms/Brands'));
const PopularSection = lazy(() => import('./components/organisms/PopularSection'));
const TopSellers = lazy(() => import('./components/organisms/TopSellers'));
const ExploreArtworks = lazy(() => import('./components/organisms/ExploreArtworks'));
const CTASection = lazy(() => import('./components/organisms/CTASection'));
const Footer = lazy(() => import('./components/organisms/Footer'));

// 2. Fallback UI yang Estetik
// Ini akan muncul sangat cepat (sepersekian detik) selagi browser mengunduh komponen
const SectionFallback = () => (
  <div className="w-full min-h-[20vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(138,43,226,0.5)]"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-dark-bg selection:bg-primary selection:text-white pb-24 lg:pb-0">
      
      {/* Background Ambient Lights Global */}
      <div className="fixed top-1/4 -left-64 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 -right-64 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Navbar & Hero tetap sinkronus agar load instan tanpa kedip */}
      <Navbar />
      
      <main>
        <FadeIn direction="up" id="home">
          <Hero />
        </FadeIn>

        {/* 3. Bungkus komponen lazy dengan Suspense */}
        <Suspense fallback={<SectionFallback />}>
          <FadeIn delay={0.2} direction="up">
            <Brands />
          </FadeIn>

          <FadeIn delay={0.1} direction="up" id="marketplace">
            <PopularSection />
          </FadeIn>

          <FadeIn delay={0.1} direction="up" id="artists">
            <TopSellers />
          </FadeIn>

          <FadeIn delay={0.1} direction="up" id="explore">
            <ExploreArtworks />
          </FadeIn>

          <FadeIn delay={0.2} direction="up" className="relative z-20">
            <CTASection />
          </FadeIn>
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-20 bg-dark-bg"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;