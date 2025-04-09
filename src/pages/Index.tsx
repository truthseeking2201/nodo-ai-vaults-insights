
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import VaultsSection from '@/components/VaultsSection';
import CtaSection from '@/components/CtaSection';
import FeaturesSection from '@/components/FeaturesSection';
import { fadeIn } from '@/lib/animations';

const Index = () => {
  useEffect(() => {
    // Apply initial fade-in animation to the main sections
    fadeIn('#vaults-section', 800, 300);
  }, []);

  return (
    <div className="min-h-screen bg-nodo-darker text-white overflow-x-hidden">
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <div id="vaults-section">
          <VaultsSection />
        </div>
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
