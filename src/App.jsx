import React, { lazy, Suspense } from 'react';
import Navbar from './components/organisms/Navbar';
import IntroSplash from './components/organisms/IntroSplash'; // Import komponen baru
import Hero from './components/organisms/Hero';
import FadeIn from './components/atoms/FadeIn';

// Lazy loading komponen di bawah lipatan (below the fold)
const Brands = lazy(() => import('./components/organisms/Brands'));
const PopularSection = lazy(() => import('./components/organisms/PopularSection'));
const TopSellers = lazy(() => import('./components/organisms/TopSellers'));
const ExploreArtworks = lazy(() => import('./components/organisms/ExploreArtworks'));
const CTASection = lazy(() => import('./components/organisms/CTASection'));
const Footer = lazy(() => import('./components/organisms/Footer'));

const SectionFallback = () => (
  <div className="w-full min-h-[20vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-dark-bg selection:bg-primary selection:text-white pb-24 lg:pb-0 ">
      
      {/* Ambient Lights Global */}
      <div className="fixed top-1/4 -left-64 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0 transform-gpu"></div>
      <div className="fixed bottom-1/4 -right-64 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none z-0 transform-gpu"></div>

      <Navbar />
      
      <main>
        {/* 1. LAYAR PERTAMA: Splash Intro (100vh) */}
        <IntroSplash />

        {/* 2. KONTEN UTAMA: Dimulai dari Hero asli Anda */}
        <div id="home" className="pt-10">
          <FadeIn direction="up">
            <Hero />
          </FadeIn>
        </div>

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