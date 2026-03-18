import React from 'react';
import Navbar from './components/organisms/Navbar';
import Hero from './components/organisms/Hero';
import Brands from './components/organisms/Brands';
import PopularSection from './components/organisms/PopularSection';
import TopSellers from './components/organisms/TopSellers';
import ExploreArtworks from './components/organisms/ExploreArtworks';
import CTASection from './components/organisms/CTASection';
import Footer from './components/organisms/Footer';
import FadeIn from './components/atoms/FadeIn';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-dark-bg selection:bg-primary selection:text-white pb-24 lg:pb-0">
      
      {/* Background Ambient Lights Global */}
      <div className="fixed top-1/4 -left-64 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 -right-64 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <Navbar />
      
      <main>
        {/* Tambahkan id="home" */}
        <FadeIn direction="up" id="home">
          <Hero />
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <Brands />
        </FadeIn>

        {/* Tambahkan id="marketplace" untuk Popular */}
        <FadeIn delay={0.1} direction="up" id="marketplace">
          <PopularSection />
        </FadeIn>

        {/* Tambahkan id="artists" untuk Top Sellers */}
        <FadeIn delay={0.1} direction="up" id="artists">
          <TopSellers />
        </FadeIn>

        {/* Tambahkan id="explore" */}
        <FadeIn delay={0.1} direction="up" id="explore">
          <ExploreArtworks />
        </FadeIn>

        <FadeIn delay={0.2} direction="up" className="relative z-20">
          <CTASection />
        </FadeIn>
      </main>

      <Footer />
    </div>
  );
}

export default App;