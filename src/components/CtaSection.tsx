import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <div className="py-20 px-6 md:px-12 relative">
      {/* Background Elements */}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-nova/30 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-orion/20 rounded-full blur-[120px] -z-10"></div>
      
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card p-10 md:p-16 rounded-2xl border border-white/10 backdrop-blur-xl text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nova via-orion to-aero"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Ready to Automate Your DeFi Strategy?
          </h2>
          
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Join institutional investors and professional traders leveraging NODO AI's intelligent agents for consistent returns.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-nova hover:bg-nova/90 text-white px-8 py-6 rounded-md transition-all shadow-neon-nova"
              asChild
            >
              <Link to="/dashboard">Launch App</Link>
            </Button>
            
            <Button 
              variant="outline"
              className="bg-transparent border border-white/20 hover:bg-white/10 text-white px-8 py-6"
              asChild
            >
              <a href="https://docs.nodoai.com" target="_blank" rel="noopener noreferrer">Read Documentation</a>
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-white/50">
            No setup fees. Institutional-grade security. Full transparency.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
