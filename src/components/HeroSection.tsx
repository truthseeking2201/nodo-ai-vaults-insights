
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-neo-grid bg-neo-grid z-0 opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-nova/20 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-aero/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl">
            <span className="text-gradient">Smart DeFi Solutions</span>
            <br />
            <span className="text-gradient-nova">Powered by AI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
            Automate your investments with AI strategies designed for consistent returns.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button 
              className="bg-nova hover:bg-nova/90 text-white px-8 py-6 rounded-md transition-all shadow-neon-nova"
              asChild
            >
              <Link to="/dashboard">Launch App</Link>
            </Button>
            <Link to="/vaults" className="group flex items-center gap-2 py-2 text-white hover:text-nova transition-colors">
              View Available Vaults
            </Link>
          </div>
          
          <div className="mt-16 bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 max-w-3xl">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">$27M+</div>
                <div className="text-sm text-white/70">Total Value Locked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">7.8%</div>
                <div className="text-sm text-white/70">Avg. Monthly Return</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-aero mb-1">100%</div>
                <div className="text-sm text-white/70">On-chain Transparency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
