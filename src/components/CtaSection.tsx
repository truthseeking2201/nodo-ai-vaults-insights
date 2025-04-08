
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const CtaSection = () => {
  return (
    <div className="py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-nova/30 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-orion/20 rounded-full blur-[120px] -z-10"></div>
      
      {/* Hexagon grid background */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 40 + 20}px`,
            height: `${Math.random() * 40 + 20}px`,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: Math.random() * 0.5 + 0.3
          }}></div>
        ))}
      </div>
      
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card p-10 md:p-14 rounded-3xl border border-white/10 backdrop-blur-xl text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-nova via-orion to-aero"></div>
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-nova/30 rounded-full blur-[80px]"></div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-aero/20 rounded-full blur-[80px]"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Ready to Experience the Future of DeFi?</span>
          </h2>
          
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of investors already using NODO AI's intelligent strategies to maximize returns while minimizing risks.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button 
              className="bg-gradient-to-r from-nova to-nova-dark hover:opacity-90 text-white px-8 py-6 rounded-xl transition-all shadow-neon-nova flex items-center justify-center gap-2 text-lg"
              asChild
            >
              <Link to="/dashboard">
                <Rocket className="w-5 h-5 mr-1" /> Launch App
              </Link>
            </Button>
            
            <Button 
              className="bg-transparent border border-white/20 hover:bg-white/10 text-white px-8 py-6 rounded-xl transition-all"
              variant="outline"
              asChild
            >
              <a href="https://docs.nodoai.com" target="_blank" rel="noopener noreferrer">
                View Documentation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
