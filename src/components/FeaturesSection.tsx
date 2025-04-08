
import React from 'react';
import { Shield, Zap, TrendingUp } from 'lucide-react';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  color 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string 
}) => {
  return (
    <div className={`glass-card p-6 rounded-xl border border-white/10 hover:border-${color} transition-all duration-300 hover:-translate-y-1`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-${color}/20 text-${color}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-nova/50 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-aero/50 to-transparent"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Powered by Advanced AI</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Our intelligent algorithms analyze market conditions and execute strategies with precision 
            for optimal returns in any environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Shield className="w-6 h-6" />}
            title="Enhanced Security"
            description="Multi-layer security with advanced encryption ensuring your assets remain protected at all times."
            color="nova"
          />
          
          <FeatureCard 
            icon={<Zap className="w-6 h-6" />}
            title="Real-Time Analysis"
            description="AI-powered analytics provide instant insights and execute trades with millisecond precision."
            color="orion"
          />
          
          <FeatureCard 
            icon={<TrendingUp className="w-6 h-6" />}
            title="Optimized Returns"
            description="Smart contract automation finds the highest yields across multiple protocols and chains."
            color="aero"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
