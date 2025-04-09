
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LineChart, Sparkles, ShieldCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// Vault Card Component
const VaultCard = ({
  name,
  type,
  icon,
  description,
  apy,
  color,
  shadow,
  highlight
}: {
  name: string;
  type: string;
  icon: React.ReactNode;
  description: string;
  apy: string;
  color: string;
  shadow: string;
  highlight?: boolean;
}) => {
  return (
    <Card className={`glass-card p-6 rounded-xl group hover-scale ${shadow} ${highlight ? 'border-' + color + '/30' : 'border-white/10'} transition-all duration-300`}>
      <div className="flex justify-between items-center mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>
        {highlight && (
          <span className={`px-3 py-1 rounded-full text-xs ${color} bg-white/10`}>Featured</span>
        )}
      </div>
      
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-white/70 text-sm mb-4">{description}</p>
      
      <div className="flex justify-between mb-6">
        <div>
          <div className="text-sm text-white/60">Expected APY</div>
          <div className="text-lg font-bold font-mono">{apy}</div>
        </div>
        <div>
          <div className="text-sm text-white/60">Type</div>
          <div className="text-sm font-medium">{type}</div>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className={`w-full bg-transparent border border-white/20 hover:bg-white/10 hover:border-${color} text-white group-hover:text-${color} transition-all`}
        asChild
      >
        <Link to={`/vaults`}>
          <span>Learn More</span>
          <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Link>
      </Button>
    </Card>
  );
};

const VaultsSection = () => {
  return (
    <div className="py-16 px-6 md:px-12 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Nodo <span className="text-gradient-nova">Vaults</span></h2>
            <p className="text-white/70 max-w-xl">
              Discover our top-performing AI-powered investment vaults with institutional-grade risk management
            </p>
          </div>
          <Link to="/vaults" className="group flex items-center gap-2 py-2 mt-4 md:mt-0 text-white hover:text-nova transition-colors">
            View All Vaults
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <VaultCard
            name="Quantum Yield Nexus"
            type="DeFi Analyst"
            icon={<LineChart className="w-5 h-5 text-white" />}
            description="Nodo's quantitative strategy leveraging AI analytics for higher returns across DeFi protocols."
            apy="8.6% - 12.4%"
            color="bg-nova/20 text-nova"
            shadow="shadow-neon-nova"
            highlight={true}
          />
          
          <VaultCard
            name="Steady Cosmos Vault"
            type="Yield Optimization"
            icon={<Sparkles className="w-5 h-5 text-white" />}
            description="Designed for stable returns with minimal volatility. Focused on secure yield generation."
            apy="5.8% - 8.4%"
            color="bg-aero/20 text-aero"
            shadow="shadow-neon-aero"
          />
          
          <VaultCard
            name="Phoenix Alpha Engine"
            type="Market Maker"
            icon={<TrendingUp className="w-5 h-5 text-white" />}
            description="Advanced trading strategy targeting alpha generation through sophisticated market-making algorithms."
            apy="10.2% - 15.8%"
            color="bg-orion/20 text-orion"
            shadow="shadow-neon-orion"
          />
        </div>
      </div>
    </div>
  );
};

export default VaultsSection;
