
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Hexagon, CircleDollarSign, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mouse tracking effect for background elements
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const heroRect = heroRef.current.getBoundingClientRect();
      const mouseX = e.clientX - heroRect.left;
      const mouseY = e.clientY - heroRect.top;
      
      // Get floating elements
      const floatingElements = heroRef.current.querySelectorAll('.floating-element');
      
      floatingElements.forEach((el: Element, i) => {
        const element = el as HTMLElement;
        const speed = i % 2 === 0 ? -0.03 : 0.03; // Alternate direction
        const moveX = (mouseX - heroRect.width / 2) * speed;
        const moveY = (mouseY - heroRect.height / 2) * speed;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px) rotate(45deg)`;
      });
      
      // Update glow position
      const glowElements = heroRef.current.querySelectorAll('.glow-element');
      glowElements.forEach((el: Element) => {
        const element = el as HTMLElement;
        element.style.backgroundPosition = `${(mouseX / heroRect.width) * 100}% ${(mouseY / heroRect.height) * 100}%`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    // Initial animation
    const fadeInElements = document.querySelectorAll('.fade-in-element');
    fadeInElements.forEach((el: Element, i: number) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 100 + i * 150);
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative pt-32 pb-24 overflow-hidden" ref={heroRef}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-neo-grid bg-neo-grid z-0 opacity-20 animated-bg"></div>
      
      {/* Floating elements */}
      <div className="floating-element absolute top-24 left-20 w-8 h-8 border border-nova/50 rounded-md rotate-45 animate-float opacity-40 transition-transform duration-300"></div>
      <div className="floating-element absolute bottom-32 right-40 w-12 h-12 border border-aero/30 rounded-full animate-float opacity-30 transition-transform duration-300"></div>
      <div className="floating-element absolute top-40 right-32 w-6 h-6 border border-orion/40 rounded-md animate-float opacity-40 transition-transform duration-300"></div>
      
      {/* Animated dots */}
      <div className="absolute top-1/4 left-1/3 glow-dot"></div>
      <div className="absolute bottom-1/3 right-1/4 glow-dot" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-2/3 left-1/5 glow-dot" style={{ animationDelay: '1s' }}></div>
      
      {/* Glow effects */}
      <div className="glow-element absolute top-1/4 left-1/4 w-64 h-64 bg-nova/20 rounded-full blur-[100px] -z-10 transition-all duration-700 ease-out"></div>
      <div className="glow-element absolute bottom-1/4 right-1/4 w-72 h-72 bg-aero/10 rounded-full blur-[100px] -z-10 transition-all duration-700 ease-out"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="flex items-center mb-6 gap-3 fade-in-element">
            <div className="relative">
              <Hexagon className="w-8 h-8 text-nova animate-pulse-glow" />
              <div className="absolute inset-0 bg-nova/30 rounded-md blur-md animate-pulse opacity-70"></div>
            </div>
            <span className="text-sm font-medium backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full border border-white/10 shadow-sm">
              Next-Gen DeFi Protocol
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in-element">
            <span className="text-gradient">Smart DeFi Solutions</span>
            <br />
            <span className="text-gradient-nova relative group">
              Powered by 
              <span className="relative inline-block ml-2 group-hover:animate-pulse-glow transition-all duration-300">
                AI
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-nova/80 via-nova to-nova/80"></span>
              </span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8 fade-in-element">
            Automate your investments with cutting-edge AI strategies designed for 
            consistent returns in the evolving crypto landscape.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 fade-in-element">
            <Button 
              className="btn-gradient-nova px-8 py-6 rounded-md relative overflow-hidden group shadow-lg shadow-nova/20"
              asChild
            >
              <Link to="/dashboard">
                <span className="relative z-10 flex items-center gap-2">
                  Launch App 
                  <CircleDollarSign className="w-5 h-5 transition-transform group-hover:rotate-12" />
                </span>
                <span className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity"></span>
              </Link>
            </Button>
            <Link 
              to="/vaults" 
              className="group flex items-center gap-2 py-2 text-white hover:text-nova transition-all duration-300"
            >
              <span className="relative">
                View Available Vaults
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nova group-hover:w-full transition-all duration-300"></span>
              </span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="mt-16 glass-card rounded-2xl p-6 max-w-3xl w-full shadow-lg shadow-nova/5 card-hover-effect fade-in-element">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center relative">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center justify-center group">
                  <span className="mr-1">$</span>
                  <span className="relative">
                    27M<span className="text-nova">+</span>
                    <Sparkles className="absolute -top-2 -right-4 w-3 h-3 text-nova opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
                <div className="text-sm text-white/70">Total Value Locked</div>
                <div className="absolute top-0 right-0 w-px h-full bg-white/10 hidden md:block"></div>
              </div>
              <div className="text-center relative">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 group">
                  <span className="relative">
                    7.8<span className="text-orion">%</span>
                    <Sparkles className="absolute -top-2 -right-4 w-3 h-3 text-orion opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
                <div className="text-sm text-white/70">Avg. Monthly Return</div>
                <div className="absolute top-0 right-0 w-px h-full bg-white/10 hidden md:block"></div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-aero mb-1 group">
                  <span className="relative">
                    100<span className="text-aero">%</span>
                    <Sparkles className="absolute -top-2 -right-4 w-3 h-3 text-aero opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
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
