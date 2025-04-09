
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Hexagon, CircleDollarSign, Sparkles } from 'lucide-react';
import anime from 'animejs';
import { fadeIn, staggerFadeIn, pulseGlow, floatingElement } from '@/lib/animations';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize animations
    if (heroRef.current) {
      // Animate hero elements
      fadeIn('.hero-fade-in', 800, 200);
      staggerFadeIn('.stagger-item', 120, 800);
      
      // Animate floating elements
      const floatingElements = heroRef.current.querySelectorAll('.floating-element');
      floatingElements.forEach((element, index) => {
        anime({
          targets: element,
          translateY: [0, index % 2 === 0 ? -15 : -10],
          translateX: [0, index % 2 === 0 ? 5 : -8],
          rotate: [0, index % 2 === 0 ? 10 : -15],
          opacity: [0, 0.4],
          easing: 'easeInOutSine',
          duration: 3000 + (index * 300),
          delay: 200 + (index * 100),
          loop: true,
          direction: 'alternate'
        });
      });
      
      // Animate glow elements
      const glowElements = heroRef.current.querySelectorAll('.glow-element');
      glowElements.forEach((element, index) => {
        anime({
          targets: element,
          opacity: [0.1, 0.2],
          scale: [1, 1.2],
          easing: 'easeInOutSine',
          duration: 4000 + (index * 500),
          delay: 100 + (index * 200),
          loop: true,
          direction: 'alternate'
        });
      });
      
      // Animate glow dots
      heroRef.current.querySelectorAll('.glow-dot').forEach((dot, index) => {
        pulseGlow(dot, index % 2 === 0 ? 'rgba(249, 115, 22, 0.6)' : 'rgba(217, 119, 6, 0.6)');
      });
      
      // Stats counter animation
      if (statsRef.current) {
        const statElements = statsRef.current.querySelectorAll('.stat-value');
        
        setTimeout(() => {
          statElements.forEach((stat) => {
            const value = stat.textContent || '';
            const numeric = parseFloat(value.replace(/[\$\%\+]/g, ''));
            
            anime({
              targets: stat,
              innerHTML: [0, numeric],
              round: 1,
              easing: 'easeInOutExpo',
              duration: 2500,
              update: function(anim) {
                const target = anim.animatables[0].target;
                const prefix = target.getAttribute('data-prefix') || '';
                const suffix = target.getAttribute('data-suffix') || '';
                const value = Math.round(target.innerHTML);
                target.innerHTML = `${prefix}${value}${suffix}`;
              }
            });
          });
        }, 600);
      }
      
      // Mouse parallax effect for background elements
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        
        const heroRect = heroRef.current.getBoundingClientRect();
        const mouseX = e.clientX - heroRect.left;
        const mouseY = e.clientY - heroRect.top;
        
        // Parallax for floating elements
        anime({
          targets: '.parallax-element',
          translateX: function(el: Element, i: number) {
            const depth = parseFloat(el.getAttribute('data-depth') || '0.03');
            return (mouseX - heroRect.width / 2) * depth;
          },
          translateY: function(el: Element, i: number) {
            const depth = parseFloat(el.getAttribute('data-depth') || '0.03');
            return (mouseY - heroRect.height / 2) * depth;
          },
          duration: 300,
          easing: 'easeOutQuad',
        });
        
        // Update glow position subtly
        anime({
          targets: '.glow-element',
          backgroundPosition: `${(mouseX / heroRect.width) * 100}% ${(mouseY / heroRect.height) * 100}%`,
          duration: 1000,
          easing: 'easeOutQuad',
        });
      };

      document.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <div className="relative pt-32 pb-24 overflow-hidden" ref={heroRef}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-neo-grid bg-neo-grid z-0 opacity-20 animated-bg"></div>
      
      {/* Floating elements with Anime.js */}
      <div className="floating-element parallax-element absolute top-24 left-20 w-8 h-8 border border-nova/50 rounded-md rotate-45 opacity-0" data-depth="0.05"></div>
      <div className="floating-element parallax-element absolute bottom-32 right-40 w-12 h-12 border border-aero/30 rounded-full opacity-0" data-depth="0.03"></div>
      <div className="floating-element parallax-element absolute top-40 right-32 w-6 h-6 border border-orion/40 rounded-md opacity-0" data-depth="0.07"></div>
      <div className="floating-element parallax-element absolute bottom-1/4 left-1/3 w-10 h-10 border border-nova/20 rounded-full opacity-0" data-depth="0.02"></div>
      <div className="floating-element parallax-element absolute top-1/3 right-1/5 w-8 h-8 border border-aero/30 rounded-md rotate-12 opacity-0" data-depth="0.04"></div>
      
      {/* Animated dots */}
      <div className="absolute top-1/4 left-1/3 glow-dot w-2 h-2 rounded-full bg-nova/60"></div>
      <div className="absolute bottom-1/3 right-1/4 glow-dot w-2 h-2 rounded-full bg-orion/60" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-2/3 left-1/5 glow-dot w-2 h-2 rounded-full bg-aero/60" style={{ animationDelay: '1s' }}></div>
      
      {/* Glow effects */}
      <div className="glow-element absolute top-1/4 left-1/4 w-64 h-64 bg-nova/20 rounded-full blur-[100px] -z-10 opacity-0"></div>
      <div className="glow-element absolute bottom-1/4 right-1/4 w-72 h-72 bg-aero/10 rounded-full blur-[100px] -z-10 opacity-0"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="flex items-center mb-6 gap-3 hero-fade-in">
            <div className="relative">
              <Hexagon className="w-8 h-8 text-nova" />
              <div className="absolute inset-0 bg-nova/30 rounded-md blur-md animate-pulse opacity-70"></div>
            </div>
            <span className="text-sm font-medium backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full border border-white/10 shadow-sm">
              Next-Gen DeFi Protocol
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 stagger-item">
            <span className="text-gradient block">Smart DeFi Solutions</span>
            <span className="text-gradient-nova relative group block">
              Powered by 
              <span className="relative inline-block ml-2 group-hover:animate-pulse-glow transition-all duration-300">
                AI
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-nova/80 via-nova to-nova/80"></span>
              </span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8 stagger-item">
            Automate your investments with cutting-edge AI strategies designed for 
            consistent returns in the evolving crypto landscape.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 stagger-item">
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
          
          <div ref={statsRef} className="mt-16 glass-card rounded-2xl p-6 max-w-3xl w-full shadow-lg shadow-nova/5 card-hover-effect stagger-item">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center relative">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center justify-center group">
                  <span className="mr-1 stat-value" data-prefix="$">27</span>
                  <span className="relative">
                    <span className="text-nova">M+</span>
                    <Sparkles className="absolute -top-2 -right-4 w-3 h-3 text-nova opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
                <div className="text-sm text-white/70">Total Value Locked</div>
                <div className="absolute top-0 right-0 w-px h-full bg-white/10 hidden md:block"></div>
              </div>
              <div className="text-center relative">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 group">
                  <span className="relative">
                    <span className="stat-value" data-suffix="%">7.8</span>
                    <Sparkles className="absolute -top-2 -right-4 w-3 h-3 text-orion opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
                <div className="text-sm text-white/70">Avg. Monthly Return</div>
                <div className="absolute top-0 right-0 w-px h-full bg-white/10 hidden md:block"></div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-aero mb-1 group">
                  <span className="relative">
                    <span className="stat-value" data-suffix="%">100</span>
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
