import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LineChart, Sparkles, TrendingUp, X, BarChart3, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

// Vault Detail Dialog Component
const VaultDetailDialog = ({ 
  vault, 
  isOpen, 
  onClose 
}: { 
  vault: any, 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  if (!vault) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-nodo-darker border border-white/10 text-white">
        <DialogHeader>
          <div className="flex items-center mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${vault.color}`}>
              {vault.icon}
            </div>
            <DialogTitle className="text-xl">{vault.name}</DialogTitle>
          </div>
          <DialogDescription className="text-white/70">
            {vault.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="text-sm text-white/60 mb-1">APY</div>
            <div className="text-xl font-bold">{vault.apy}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="text-sm text-white/60 mb-1">TVL</div>
            <div className="text-xl font-bold">{vault.tvl}</div>
          </div>
        </div>
        
        <div className="bg-white/5 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Performance History</h3>
            <div className="flex items-center text-xs text-white/60 gap-2">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-nova rounded-full"></div>
                Returns
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-aero rounded-full"></div>
                Benchmark
              </span>
            </div>
          </div>
          <div className="h-32 flex items-center justify-center">
            <BarChart3 className="w-full h-full text-white/20" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-sm text-white/60 mb-2">Asset Allocation</h3>
            <div className="flex justify-center">
              <PieChart className="h-20 w-20 text-white/20" />
            </div>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-sm text-white/60 mb-2">Risk Level</h3>
            <div className="mt-2 flex flex-col items-center">
              <div className="w-full bg-white/10 h-2 rounded-full mb-2">
                <div 
                  className={`h-full rounded-full ${
                    vault.risk === "Low" ? "w-1/4 bg-aero" :
                    vault.risk === "Low-Medium" ? "w-2/5 bg-aero" :
                    vault.risk === "Medium" ? "w-1/2 bg-nova" :
                    vault.risk === "Medium-High" ? "w-3/4 bg-orion" :
                    "w-full bg-orion"
                  }`}
                ></div>
              </div>
              <div className="text-sm">{vault.risk}</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Button className="w-full bg-nova hover:bg-nova/90 text-white" asChild>
            <Link to="/dashboard">Invest in Vault</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const VaultCard = ({
  name,
  icon,
  description,
  apy,
  tvl,
  risk,
  color,
  shadow,
  onViewDetails
}: {
  name: string;
  icon: React.ReactNode;
  description: string;
  apy: string;
  tvl: string;
  risk: string;
  color: string;
  shadow: string;
  onViewDetails: () => void;
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
        onClick={onViewDetails}
      >
        View Vault
      </Button>
    </Card>
  );
};

const Vaults = () => {
  const [selectedVault, setSelectedVault] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
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

  const handleViewVault = (vault) => {
    setSelectedVault(vault);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

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
                <VaultCard 
                  key={index} 
                  {...vault} 
                  onViewDetails={() => handleViewVault(vault)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      <VaultDetailDialog 
        vault={selectedVault} 
        isOpen={dialogOpen} 
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default Vaults;
