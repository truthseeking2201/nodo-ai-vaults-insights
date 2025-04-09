
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import VaultsSection from '@/components/VaultsSection';
import CtaSection from '@/components/CtaSection';
import FeaturesSection from '@/components/FeaturesSection';
import AnimationShowcase from '@/components/AnimationShowcase';

const Index = () => {
  return (
    <div className="min-h-screen bg-nodo-darker text-white overflow-x-hidden">
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <div className="container mx-auto px-6 md:px-12 py-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-gradient">Animation Showcase</h2>
          <AnimationShowcase />
        </div>
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
