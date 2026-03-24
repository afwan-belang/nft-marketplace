import React, { lazy, Suspense } from 'react';
// Perhatikan: Path diubah menjadi '../' dan Navbar/Footer dihapus dari sini
import IntroSplash from '../components/organisms/IntroSplash';
import Hero from '../components/organisms/Hero';
import FadeIn from '../components/atoms/FadeIn';

// Lazy loading komponen dengan path yang sudah dikoreksi (../)
const Brands = lazy(() => import('../components/organisms/Brands'));
const PopularSection = lazy(() => import('../components/organisms/PopularSection'));
const TopSellers = lazy(() => import('../components/organisms/TopSellers'));
const ExploreArtworks = lazy(() => import('../components/organisms/ExploreArtworks'));
const CTASection = lazy(() => import('../components/organisms/CTASection'));

const SectionFallback = () => (
  <div className="w-full min-h-[20vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(138,43,226,0.5)]"></div>
  </div>
);

const Home = () => {
  return (
    <>
      {/* 1. LAYAR PERTAMA: Splash Intro */}
      <IntroSplash />

      {/* 2. KONTEN UTAMA */}
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
    </>
  );
};

export default Home;