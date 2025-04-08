
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LineChart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

// Vault Card Component
const VaultCard = ({
  name,
  icon,
  description,
  apy,
  color,
  shadow
}: {
  name: string;
  icon: React.ReactNode;
  description: string;
  apy: string;
  color: string;
  shadow: string;
}) => {
  return (
    <Card className={`glass-card p-6 rounded-xl group hover-scale ${shadow}`}>
      <div className="flex justify-between items-center mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-white/70 text-sm mb-4">{description}</p>
      
      <div className="flex justify-between mb-6">
        <div>
          <div className="text-sm text-white/60">Expected APY</div>
          <div className="text-lg font-bold">{apy}</div>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full bg-transparent border border-white/20 hover:bg-white/10 text-white"
        asChild
      >
        <Link to={`/vaults`}>
          Learn More
        </Link>
      </Button>
    </Card>
  );
};

const VaultsSection = () => {
  return (
    <div className="py-16 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Popular Vaults</h2>
            <p className="text-white/70">
              Discover our top-performing AI-powered investment strategies
            </p>
          </div>
          <Link to="/vaults" className="group flex items-center gap-2 py-2 mt-4 md:mt-0 text-white hover:text-nova transition-colors">
            View All Vaults
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <VaultCard
            name="Market Making"
            icon={<LineChart className="w-5 h-5 text-white" />}
            description="Automated liquidity management with market-making strategies."
            apy="7.2% - 9.8%"
            color="bg-nova/20 text-nova"
            shadow="shadow-neon-nova"
          />
          
          <VaultCard
            name="Yield Optimization"
            icon={<Sparkles className="w-5 h-5 text-white" />}
            description="Maximize returns across DeFi protocols and yield pools."
            apy="5.8% - 8.4%"
            color="bg-aero/20 text-aero"
            shadow="shadow-neon-aero"
          />
          
          <VaultCard
            name="Stablecoin Yield"
            icon={<LineChart className="w-5 h-5 text-white" />}
            description="Low-risk strategies focusing on stablecoin liquidity pools."
            apy="3.8% - 5.2%"
            color="bg-orion/20 text-orion"
            shadow="shadow-neon-orion"
          />
        </div>
      </div>
    </div>
  );
};

export default VaultsSection;
