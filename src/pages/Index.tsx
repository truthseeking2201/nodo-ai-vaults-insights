
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import VaultsSection from '@/components/VaultsSection';
import CtaSection from '@/components/CtaSection';
import FeaturesSection from '@/components/FeaturesSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-nodo-darker text-white overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-nova/10 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-40 right-1/5 w-80 h-80 bg-aero/5 rounded-full blur-[150px] animate-pulse-glow"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-orion/5 rounded-full blur-[100px] animate-pulse-glow"></div>
      </div>
      
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
