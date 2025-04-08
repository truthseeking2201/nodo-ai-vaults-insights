
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import VaultsSection from '@/components/VaultsSection';
import ActivityFeed from '@/components/ActivityFeed';
import PartnersSection from '@/components/PartnersSection';
import AnalyticsPreview from '@/components/AnalyticsPreview';
import CtaSection from '@/components/CtaSection';

const Index = () => {
  // This function will scroll the user to the target section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-nodo-darker text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <div id="vaults-section">
          <VaultsSection />
        </div>
        <div id="activity-section">
          <ActivityFeed />
        </div>
        <div id="analytics-section">
          <AnalyticsPreview />
        </div>
        <PartnersSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
