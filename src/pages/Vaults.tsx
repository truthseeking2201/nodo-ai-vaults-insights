
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Sparkles, TrendingUp } from 'lucide-react';

const VaultCard = ({
  name,
  icon,
  description,
  apy,
  tvl,
  risk,
  color,
  shadow
}: {
  name: string;
  icon: React.ReactNode;
  description: string;
  apy: string;
  tvl: string;
  risk: string;
  color: string;
  shadow: string;
}) => {
  return (
    <Card className={`glass-card p-6 rounded-xl group hover-scale ${shadow}`}>
      <div className="flex justify-between items-center mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <div className={`px-3 py-1 rounded-full text-xs ${color} bg-white/10`}>{risk}</div>
      </div>
      
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-white/70 text-sm mb-4">{description}</p>
      
      <div className="flex justify-between mb-6">
        <div>
          <div className="text-sm text-white/60">APY</div>
          <div className="text-lg font-bold">{apy}</div>
        </div>
        <div>
          <div className="text-sm text-white/60">TVL</div>
          <div className="text-lg font-bold">{tvl}</div>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full bg-transparent border border-white/20 hover:bg-white/10 text-white"
      >
        View Vault
      </Button>
    </Card>
  );
};

const Vaults = () => {
  const vaults = [
    {
      name: "Market Making Vault",
      icon: <LineChart className="w-5 h-5 text-white" />,
      description: "Automated liquidity management with sophisticated market-making strategies across multiple DEXs.",
      apy: "7.2% - 9.8%",
      tvl: "$12.8M",
      risk: "Medium",
      color: "bg-nova/20 text-nova",
      shadow: "shadow-neon-nova"
    },
    {
      name: "Yield Optimization Vault",
      icon: <Sparkles className="w-5 h-5 text-white" />,
      description: "Maximize returns across various Sui-based DeFi protocols and yield pools.",
      apy: "5.8% - 8.4%",
      tvl: "$9.2M",
      risk: "Low-Medium",
      color: "bg-aero/20 text-aero",
      shadow: "shadow-neon-aero"
    },
    {
      name: "DeFi Analytics Vault",
      icon: <LineChart className="w-5 h-5 text-white" />,
      description: "Data-driven insights and automated trading based on on-chain analytics.",
      apy: "8.6% - 12.4%",
      tvl: "$5.5M",
      risk: "Medium-High",
      color: "bg-orion/20 text-orion",
      shadow: "shadow-neon-orion"
    },
    {
      name: "Arbitrage Vault",
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      description: "Capturing price differences across exchanges with high-frequency trading strategies.",
      apy: "10.2% - 15.6%",
      tvl: "$3.2M",
      risk: "High",
      color: "bg-orion/20 text-orion",
      shadow: "shadow-neon-orion"
    },
    {
      name: "Stablecoin Yield Vault",
      icon: <Sparkles className="w-5 h-5 text-white" />,
      description: "Low-risk yield generation strategies focusing on stablecoin liquidity pools.",
      apy: "3.8% - 5.2%",
      tvl: "$7.5M",
      risk: "Low",
      color: "bg-aero/20 text-aero",
      shadow: "shadow-neon-aero"
    },
    {
      name: "Strategic Lending Vault",
      icon: <LineChart className="w-5 h-5 text-white" />,
      description: "Optimize lending positions across various lending protocols on Sui.",
      apy: "6.4% - 8.9%",
      tvl: "$4.1M",
      risk: "Medium",
      color: "bg-nova/20 text-nova",
      shadow: "shadow-neon-nova"
    }
  ];

  return (
    <div className="min-h-screen bg-nodo-darker text-white">
      <Navbar />
      <main>
        <div className="pt-28 pb-12 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Vaults</h1>
              <p className="text-white/70 max-w-3xl">
                Our specialized vaults leverage advanced AI agents to execute strategies with precision and efficiency. 
                Each vault is designed to meet specific investment objectives with varying risk profiles.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vaults.map((vault, index) => (
                <VaultCard key={index} {...vault} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Vaults;
