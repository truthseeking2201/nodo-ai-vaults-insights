import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LineChart, Sparkles, TrendingUp, BarChart3, PieChart, ShieldCheck, Hexagon, CircleDollarSign, Infinity } from 'lucide-react';
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
      <DialogContent className="sm:max-w-[650px] bg-nodo-darker border border-white/10 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-nova/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-aero/20 rounded-full blur-[80px]"></div>
        </div>
        
        <div className="relative z-10">
          <DialogHeader>
            <div className="flex items-center mb-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${vault.color}`}>
                {vault.icon}
              </div>
              <DialogTitle className="text-2xl font-bold">{vault.name}</DialogTitle>
            </div>
            <DialogDescription className="text-white/70 text-base">
              {vault.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="text-sm text-white/60 mb-1">Expected APY</div>
              <div className="text-2xl font-bold flex items-center">
                {vault.apy}
                <span className="text-nova text-sm ml-2">
                  <TrendingUp className="w-4 h-4 inline" />
                </span>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="text-sm text-white/60 mb-1">Total Value Locked</div>
              <div className="text-2xl font-bold flex items-center">
                {vault.tvl}
                <CircleDollarSign className="w-4 h-4 text-aero ml-2" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-5 rounded-xl border border-white/10 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-white flex items-center">
                <LineChart className="w-4 h-4 mr-2 text-nova" /> Performance History
              </h3>
              <div className="flex items-center text-xs text-white/60 gap-3">
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
            <div className="h-40 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
                {Array.from({ length: 12 }).map((_, i) => {
                  const height = 30 + Math.random() * 50;
                  const delay = i * 0.1;
                  return (
                    <div 
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-nova to-nova/40 rounded-full transition-all duration-1000"
                      style={{ 
                        height: `${height}%`, 
                        animationDelay: `${delay}s`,
                        animation: 'pulse 2s infinite ease-in-out'
                      }}
                    ></div>
                  );
                })}
              </div>
              <div className="absolute inset-x-0 bottom-4 px-4">
                <div className="h-0.5 w-full bg-white/10 rounded"></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="text-sm text-white/60 mb-3 flex items-center">
                <PieChart className="w-4 h-4 mr-2 text-orion" /> Asset Allocation
              </h3>
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0" style={{ 
                    backgroundImage: 'conic-gradient(#9b87f5 0% 40%, #10B981 40% 65%, #F97316 65% 100%)'
                  }}></div>
                  <div className="absolute inset-2 bg-nodo-darker rounded-full flex items-center justify-center">
                    <Infinity className="w-6 h-6 text-white/40" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs mt-4 px-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-nova rounded-full mr-1"></div>
                  <span>40% BTC</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-aero rounded-full mr-1"></div>
                  <span>25% ETH</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orion rounded-full mr-1"></div>
                  <span>35% USDC</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="text-sm text-white/60 mb-3 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-aero" /> Risk Analysis
              </h3>
              <div className="mt-4 flex flex-col items-center">
                <div className="w-full h-3 bg-white/5 rounded-full mb-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      vault.risk === "Low" ? "w-1/4 bg-aero" :
                      vault.risk === "Low-Medium" ? "w-2/5 bg-aero" :
                      vault.risk === "Medium" ? "w-1/2 bg-nova" :
                      vault.risk === "Medium-High" ? "w-3/4 bg-orion" :
                      "w-full bg-orion"
                    } shadow-[0_0_8px_rgba(16,185,129,0.8)]`}
                  ></div>
                </div>
                <div className="flex w-full justify-between text-xs text-white/60">
                  <span>Low Risk</span>
                  <span>Medium Risk</span>
                  <span>High Risk</span>
                </div>
                <div className="mt-4 px-4 py-2 rounded-full bg-white/10 text-sm font-medium">
                  {vault.risk} Risk Profile
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
            <h3 className="text-sm text-white/60 mb-2 flex items-center">
              <Hexagon className="w-4 h-4 mr-2 text-nova" /> Strategy Highlights
            </h3>
            <ul className="text-sm">
              {vault.highlights.map((highlight: string, idx: number) => (
                <li key={idx} className="py-1.5 flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-nova/80 mt-1.5 mr-2"></div>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <Button className="w-full bg-gradient-to-r from-nova to-nova-dark hover:opacity-90 text-white py-6 rounded-xl shadow-neon-nova" asChild>
              <Link to="/dashboard">Invest in Vault</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const vaults = [
  {
    name: "Market Making Vault",
    icon: <LineChart className="w-5 h-5 text-white" />,
    description: "Automated liquidity management with sophisticated market-making strategies across multiple DEXs.",
    apy: "7.2% - 9.8%",
    tvl: "$12.8M",
    risk: "Medium",
    color: "bg-nova/20 text-nova",
    shadow: "shadow-neon-nova",
    highlights: [
      "AI-powered price prediction for optimal order placement",
      "Automated risk management with dynamic position sizing",
      "Multi-DEX strategy execution for maximum efficiency",
      "Real-time market condition adaptation"
    ]
  },
  {
    name: "Yield Optimization Vault",
    icon: <Sparkles className="w-5 h-5 text-white" />,
    description: "Maximize returns across various Sui-based DeFi protocols and yield pools.",
    apy: "5.8% - 8.4%",
    tvl: "$9.2M",
    risk: "Low-Medium",
    color: "bg-aero/20 text-aero",
    shadow: "shadow-neon-aero",
    highlights: [
      "Automated yield farming across multiple protocols",
      "Smart contract security analysis for risk mitigation",
      "Gas optimization for maximum effective returns",
      "Impermanent loss protection strategy"
    ]
  },
  {
    name: "DeFi Analytics Vault",
    icon: <LineChart className="w-5 h-5 text-white" />,
    description: "Data-driven insights and automated trading based on on-chain analytics.",
    apy: "8.6% - 12.4%",
    tvl: "$5.5M",
    risk: "Medium-High",
    color: "bg-orion/20 text-orion",
    shadow: "shadow-neon-orion",
    highlights: [
      "Sentiment analysis of on-chain behavior",
      "Pattern recognition for market inefficiencies",
      "Neural network trading model with continuous learning",
      "Custom oracle integration for enhanced data accuracy"
    ]
  },
  {
    name: "Arbitrage Vault",
    icon: <TrendingUp className="w-5 h-5 text-white" />,
    description: "Capturing price differences across exchanges with high-frequency trading strategies.",
    apy: "10.2% - 15.6%",
    tvl: "$3.2M",
    risk: "High",
    color: "bg-orion/20 text-orion",
    shadow: "shadow-neon-orion",
    highlights: [
      "Low-latency execution framework for arb opportunities",
      "Cross-chain bridging for expanded market access",
      "MEV protection and flash loan implementation",
      "Dynamic fee optimization based on opportunity size"
    ]
  },
  {
    name: "Stablecoin Yield Vault",
    icon: <Sparkles className="w-5 h-5 text-white" />,
    description: "Low-risk yield generation strategies focusing on stablecoin liquidity pools.",
    apy: "3.8% - 5.2%",
    tvl: "$7.5M",
    risk: "Low",
    color: "bg-aero/20 text-aero",
    shadow: "shadow-neon-aero",
    highlights: [
      "Stablecoin-exclusive strategy for capital preservation",
      "Diversification across multiple stablecoin protocols",
      "Automated audit verification before allocation",
      "Inflation-protected yield optimization"
    ]
  },
  {
    name: "Strategic Lending Vault",
    icon: <LineChart className="w-5 h-5 text-white" />,
    description: "Optimize lending positions across various lending protocols on Sui.",
    apy: "6.4% - 8.9%",
    tvl: "$4.1M",
    risk: "Medium",
    color: "bg-nova/20 text-nova",
    shadow: "shadow-neon-nova",
    highlights: [
      "Dynamic interest rate model analysis",
      "Collateralization ratio management",
      "Liquidation risk mitigation system",
      "Automated portfolio rebalancing based on market conditions"
    ]
  }
];

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
    <Card className={`glass-card p-6 rounded-xl group hover-scale ${shadow} border border-white/10 hover:border-${color.split('-')[1]}/30 transition-all duration-300`}>
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
          <div className="text-lg font-bold flex items-center">
            {apy}
            <TrendingUp size={16} className="ml-1 text-nova" />
          </div>
        </div>
        <div>
          <div className="text-sm text-white/60">TVL</div>
          <div className="text-lg font-bold">{tvl}</div>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full bg-transparent border border-white/20 hover:bg-white/10 hover:border-nova text-white group-hover:text-nova transition-all flex items-center justify-center gap-2"
        onClick={onViewDetails}
      >
        View Vault
        <Hexagon size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </Button>
    </Card>
  );
};

const Vaults = () => {
  const [selectedVault, setSelectedVault] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const vaultsWithHighlights = [
    {
      name: "Market Making Vault",
      icon: <LineChart className="w-5 h-5 text-white" />,
      description: "Automated liquidity management with sophisticated market-making strategies across multiple DEXs.",
      apy: "7.2% - 9.8%",
      tvl: "$12.8M",
      risk: "Medium",
      color: "bg-nova/20 text-nova",
      shadow: "shadow-neon-nova",
      highlights: [
        "AI-powered price prediction for optimal order placement",
        "Automated risk management with dynamic position sizing",
        "Multi-DEX strategy execution for maximum efficiency",
        "Real-time market condition adaptation"
      ]
    },
    {
      name: "Yield Optimization Vault",
      icon: <Sparkles className="w-5 h-5 text-white" />,
      description: "Maximize returns across various Sui-based DeFi protocols and yield pools.",
      apy: "5.8% - 8.4%",
      tvl: "$9.2M",
      risk: "Low-Medium",
      color: "bg-aero/20 text-aero",
      shadow: "shadow-neon-aero",
      highlights: [
        "Automated yield farming across multiple protocols",
        "Smart contract security analysis for risk mitigation",
        "Gas optimization for maximum effective returns",
        "Impermanent loss protection strategy"
      ]
    },
    {
      name: "DeFi Analytics Vault",
      icon: <LineChart className="w-5 h-5 text-white" />,
      description: "Data-driven insights and automated trading based on on-chain analytics.",
      apy: "8.6% - 12.4%",
      tvl: "$5.5M",
      risk: "Medium-High",
      color: "bg-orion/20 text-orion",
      shadow: "shadow-neon-orion",
      highlights: [
        "Sentiment analysis of on-chain behavior",
        "Pattern recognition for market inefficiencies",
        "Neural network trading model with continuous learning",
        "Custom oracle integration for enhanced data accuracy"
      ]
    },
    {
      name: "Arbitrage Vault",
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      description: "Capturing price differences across exchanges with high-frequency trading strategies.",
      apy: "10.2% - 15.6%",
      tvl: "$3.2M",
      risk: "High",
      color: "bg-orion/20 text-orion",
      shadow: "shadow-neon-orion",
      highlights: [
        "Low-latency execution framework for arb opportunities",
        "Cross-chain bridging for expanded market access",
        "MEV protection and flash loan implementation",
        "Dynamic fee optimization based on opportunity size"
      ]
    },
    {
      name: "Stablecoin Yield Vault",
      icon: <Sparkles className="w-5 h-5 text-white" />,
      description: "Low-risk yield generation strategies focusing on stablecoin liquidity pools.",
      apy: "3.8% - 5.2%",
      tvl: "$7.5M",
      risk: "Low",
      color: "bg-aero/20 text-aero",
      shadow: "shadow-neon-aero",
      highlights: [
        "Stablecoin-exclusive strategy for capital preservation",
        "Diversification across multiple stablecoin protocols",
        "Automated audit verification before allocation",
        "Inflation-protected yield optimization"
      ]
    },
    {
      name: "Strategic Lending Vault",
      icon: <LineChart className="w-5 h-5 text-white" />,
      description: "Optimize lending positions across various lending protocols on Sui.",
      apy: "6.4% - 8.9%",
      tvl: "$4.1M",
      risk: "Medium",
      color: "bg-nova/20 text-nova",
      shadow: "shadow-neon-nova",
      highlights: [
        "Dynamic interest rate model analysis",
        "Collateralization ratio management",
        "Liquidation risk mitigation system",
        "Automated portfolio rebalancing based on market conditions"
      ]
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
    <div className="min-h-screen bg-nodo-darker text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-nova/5 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-40 right-1/5 w-80 h-80 bg-aero/5 rounded-full blur-[150px] animate-pulse-glow"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-orion/5 rounded-full blur-[100px] animate-pulse-glow"></div>
      </div>
      
      <Navbar />
      <main className="relative z-10">
        <div className="pt-32 pb-16 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-nova/20 flex items-center justify-center">
                  <Hexagon className="w-5 h-5 text-nova" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">AI-Powered Vaults</h1>
              </div>
              <p className="text-white/70 max-w-3xl text-lg">
                Our specialized vaults leverage advanced AI agents to execute strategies with precision and efficiency. 
                Each vault is designed to meet specific investment objectives with varying risk profiles.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vaultsWithHighlights.map((vault, index) => (
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
