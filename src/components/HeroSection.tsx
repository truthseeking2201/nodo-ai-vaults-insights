
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Hexagon, CircleDollarSign } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative pt-32 pb-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-neo-grid bg-neo-grid z-0 opacity-20"></div>
      
      {/* Floating elements */}
      <div className="absolute top-24 left-20 w-8 h-8 border border-nova/50 rounded-md rotate-45 animate-float opacity-40"></div>
      <div className="absolute bottom-32 right-40 w-12 h-12 border border-aero/30 rounded-full animate-float opacity-30"></div>
      <div className="absolute top-40 right-32 w-6 h-6 border border-orion/40 rounded-md animate-float opacity-40"></div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-nova/20 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-aero/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="flex items-center mb-6 gap-3">
            <Hexagon className="w-8 h-8 text-nova animate-pulse-glow" />
            <span className="text-sm font-medium bg-white/10 px-3 py-1 rounded-full">Next-Gen DeFi Protocol</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Smart DeFi Solutions</span>
            <br />
            <span className="text-gradient-nova">Powered by <span className="relative inline-block">
              AI
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-nova/80"></span>
            </span></span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
            Automate your investments with cutting-edge AI strategies designed for 
            consistent returns in the evolving crypto landscape.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Button 
              className="bg-nova hover:bg-nova/90 text-white px-8 py-6 rounded-md transition-all shadow-neon-nova relative overflow-hidden group"
              asChild
            >
              <Link to="/dashboard">
                <span className="relative z-10 flex items-center gap-2">Launch App <CircleDollarSign className="w-5 h-5" /></span>
                <span className="absolute inset-0 bg-gradient-to-r from-nova to-nova-light opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            </Button>
            <Link to="/vaults" className="group flex items-center gap-2 py-2 text-white hover:text-nova transition-colors">
              View Available Vaults
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="mt-16 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-3xl w-full shadow-neon-nova/5">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center relative">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center justify-center">
                  <span className="mr-1">$</span>27M<span className="text-nova">+</span>
                </div>
                <div className="text-sm text-white/70">Total Value Locked</div>
                <div className="absolute top-0 right-0 w-px h-full bg-white/10 hidden md:block"></div>
              </div>
              <div className="text-center relative">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">7.8<span className="text-orion">%</span></div>
                <div className="text-sm text-white/70">Avg. Monthly Return</div>
                <div className="absolute top-0 right-0 w-px h-full bg-white/10 hidden md:block"></div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-aero mb-1">100<span className="text-aero">%</span></div>
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
