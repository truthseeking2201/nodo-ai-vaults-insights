
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart as LineChartIcon, Sparkles, TrendingUp, BarChart3, PieChart, ShieldCheck, Hexagon, CircleDollarSign, ArrowRight, GaugeCircle, Clock, Layers, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import VaultDetails from '@/components/vaults/VaultDetails';

// Define the vault data structure to reflect Nodo's offerings
const vaults = [
  {
    id: "vault-111",
    name: "Nodo Stability Vault",
    type: "Yield Optimization",
    icon: <Sparkles className="w-5 h-5 text-white" />,
    description: "Designed for stable returns with minimal volatility. This Nodo vault focuses on secure yield generation through proven DeFi strategies, optimized for USDC holders seeking consistent passive income with institutional-grade risk management.",
    nav: "$100.13",
    tvl: "$28,715.31",
    inception: "26 Mar 23",
    apy: "5.8% - 8.4%",
    risk: "Low",
    color: "bg-aero/20 text-aero",
    shadow: "shadow-neon-aero",
    chartColor: "#10B981",
    portfolio: {
      icon: <CircleDollarSign className="w-5 h-5 text-white" />,
      releaseDate: "May 27, 2023"
    },
    chain: {
      name: "Nodo Chain",
      icon: <div className="w-5 h-5 bg-nova/80 rounded-full flex items-center justify-center text-xs text-white">N</div>
    },
    compatibility: [
      <div key="1" className="w-5 h-5 bg-nova/60 rounded-full flex items-center justify-center text-xs text-white">N</div>,
      <div key="2" className="w-5 h-5 bg-aero/60 rounded-full flex items-center justify-center text-xs text-white">A</div>
    ],
    features: [
      {
        title: "Nodo Smart Yield",
        icon: <Coins className="w-5 h-5 text-aero" />,
        description: "Earn native yields plus additional Nodo token rewards through our innovative dual-layer system"
      },
      {
        title: "Dynamic Rebalancing",
        icon: <Layers className="w-5 h-5 text-aero" />,
        description: "Nodo's AI algorithms continuously adjust portfolio allocations to maximize returns across market conditions"
      },
      {
        title: "Flexible Withdrawals",
        icon: <Clock className="w-5 h-5 text-aero" />,
        description: "Choose between instant access or scheduled withdrawals with optimized gas efficiency"
      },
      {
        title: "Nodo Fee Structure",
        icon: <CircleDollarSign className="w-5 h-5 text-aero" />,
        description: "• No annual management fee\n• 1% transaction and 10% performance fee"
      }
    ]
  },
  {
    id: "vault-502",
    name: "Nodo Growth Engine",
    type: "DeFi Analyst",
    icon: <LineChartIcon className="w-5 h-5 text-white" />,
    description: "Nodo's quantitative strategy vault designed for higher returns. Leverages advanced AI algorithms and on-chain analytics to identify optimal trading opportunities across DeFi protocols. Suitable for investors seeking enhanced yield with managed risk exposure.",
    nav: "$105.27",
    tvl: "$6,432.80",
    inception: "15 Apr 23",
    apy: "8.6% - 12.4%",
    risk: "Medium",
    color: "bg-orion/20 text-orion",
    shadow: "shadow-neon-orion",
    chartColor: "#9B87F5",
    portfolio: {
      icon: <PieChart className="w-5 h-5 text-white" />,
      releaseDate: "April 15, 2023"
    },
    chain: {
      name: "Ethereum",
      icon: <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">E</div>
    },
    compatibility: [
      <div key="1" className="w-5 h-5 bg-nova/60 rounded-full flex items-center justify-center text-xs text-white">N</div>,
      <div key="2" className="w-5 h-5 bg-orion/60 rounded-full flex items-center justify-center text-xs text-white">O</div>
    ],
    features: [
      {
        title: "Nodo AI Trading",
        icon: <Sparkles className="w-5 h-5 text-orion" />,
        description: "Proprietary machine learning models optimize strategies based on market conditions and on-chain data"
      },
      {
        title: "Cross-Chain Exposure",
        icon: <Layers className="w-5 h-5 text-orion" />,
        description: "Access opportunities across multiple blockchains through Nodo's secure bridge technology"
      },
      {
        title: "24/7 Monitoring",
        icon: <BarChart3 className="w-5 h-5 text-orion" />,
        description: "Continuous position management with automated risk controls and alert systems"
      },
      {
        title: "Premium Fee Structure",
        icon: <CircleDollarSign className="w-5 h-5 text-orion" />,
        description: "• 0.5% annual management fee\n• 15% performance fee on profits"
      }
    ]
  },
  {
    id: "vault-703",
    name: "Nodo Alpha Strategy",
    type: "Market Maker",
    icon: <TrendingUp className="w-5 h-5 text-white" />,
    description: "Advanced trading strategy targeting alpha generation through sophisticated market-making algorithms. This Nodo vault utilizes high-frequency execution with optimized gas and MEV protection to capture spreads across decentralized exchanges.",
    nav: "$107.89",
    tvl: "$4,215.65",
    inception: "03 May 23",
    apy: "10.2% - 15.8%",
    risk: "High",
    color: "bg-nova/20 text-nova",
    shadow: "shadow-neon-nova",
    chartColor: "#F43F5E",
    portfolio: {
      icon: <BarChart3 className="w-5 h-5 text-white" />,
      releaseDate: "June 10, 2023"
    },
    chain: {
      name: "Multi-Chain",
      icon: <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-xs text-white">M</div>
    },
    compatibility: [
      <div key="1" className="w-5 h-5 bg-nova/60 rounded-full flex items-center justify-center text-xs text-white">N</div>,
      <div key="2" className="w-5 h-5 bg-orion/60 rounded-full flex items-center justify-center text-xs text-white">O</div>,
      <div key="3" className="w-5 h-5 bg-aero/60 rounded-full flex items-center justify-center text-xs text-white">A</div>
    ],
    features: [
      {
        title: "MEV Protection",
        icon: <ShieldCheck className="w-5 h-5 text-nova" />,
        description: "Advanced protection against frontrunning and sandwich attacks through private transaction channels"
      },
      {
        title: "ML Price Prediction",
        icon: <Sparkles className="w-5 h-5 text-nova" />,
        description: "Machine learning models predict short-term price movements to optimize entry and exit points"
      },
      {
        title: "Automated Rebalancing",
        icon: <Layers className="w-5 h-5 text-nova" />,
        description: "Strategy automatically adjusts position sizes based on market volatility and liquidity conditions"
      },
      {
        title: "Premium Fee Structure",
        icon: <CircleDollarSign className="w-5 h-5 text-nova" />,
        description: "• 1% annual management fee\n• 20% performance fee on profits"
      }
    ]
  }
];

const Vaults = () => {
  const [selectedVault, setSelectedVault] = useState(vaults[0]);
  
  return (
    <div className="min-h-screen bg-nodo-darker text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-nova/5 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-40 right-1/5 w-80 h-80 bg-aero/5 rounded-full blur-[150px] animate-pulse-glow"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-orion/5 rounded-full blur-[100px] animate-pulse-glow"></div>
      </div>
      
      <Navbar />
      <main className="relative z-10 container mx-auto">
        <div className="pt-32 pb-16 px-6 md:px-12">
          {/* Vault Selector - Made more concise and Nodo-themed */}
          <div className="flex justify-center mb-12">
            <div className="glass-panel px-2 py-2 rounded-full flex items-center space-x-3">
              {vaults.map((vault) => (
                <button 
                  key={vault.id}
                  className={`flex items-center px-4 py-2 rounded-full transition-all ${
                    selectedVault.id === vault.id 
                      ? `bg-gradient-to-r ${
                          vault.id === "vault-111" 
                            ? "from-aero/90 to-aero/70"
                            : vault.id === "vault-502"
                            ? "from-orion/90 to-orion/70"
                            : "from-nova/90 to-nova/70"
                        } text-white shadow-lg` 
                      : "hover:bg-white/5"
                  }`}
                  onClick={() => setSelectedVault(vault)}
                >
                  <div className={`w-8 h-8 rounded-full ${vault.color} flex items-center justify-center mr-3`}>
                    {vault.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-xs opacity-70">{vault.type}</div>
                    <div className="font-medium text-sm">{vault.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Vault Details - Content updated for Nodo */}
          <VaultDetails vault={selectedVault} />
          
          {/* Nodo Staking & Rewards Section */}
          <div className="mt-16">
            <div className="glass-card p-8 rounded-xl border border-white/10 relative overflow-hidden">
              <div className="absolute -left-16 -bottom-16">
                <div className="relative w-48 h-48">
                  <div className="w-full h-full rounded-full border-4 border-nova/30 flex items-center justify-center">
                    <div className="w-36 h-36 rounded-full border-4 border-nova/50 flex flex-col items-center justify-center text-center bg-nodo-darker">
                      <div className="text-nova font-medium">nodo</div>
                      <div className="text-nova font-medium">rewards</div>
                      <div className="text-white font-bold font-mono mt-1">USDC 2X</div>
                      <div className="text-nova text-sm">APY</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="ml-32">
                <h2 className="text-2xl font-bold mb-2">
                  <span className="text-nova">nodo</span> staking & yield 
                  <span className="text-nova ml-2">boosters</span>
                </h2>
                <p className="text-white/70 mb-4">
                  Stake NODO tokens to amplify your returns and unlock premium features
                </p>
                <Button variant="outline" className="bg-transparent border-nova/30 text-nova hover:bg-nova/10">
                  learn more <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Vaults;
