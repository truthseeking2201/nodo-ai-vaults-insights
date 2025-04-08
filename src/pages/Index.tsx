
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import VaultsSection from '@/components/VaultsSection';
import ActivityFeed from '@/components/ActivityFeed';
import PartnersSection from '@/components/PartnersSection';
import AnalyticsPreview from '@/components/AnalyticsPreview';
import CtaSection from '@/components/CtaSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-nodo-darker text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <VaultsSection />
        <ActivityFeed />
        <AnalyticsPreview />
        <PartnersSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
