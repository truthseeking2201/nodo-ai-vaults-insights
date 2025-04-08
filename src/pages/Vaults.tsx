
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart as LineChartIcon, Sparkles, TrendingUp, BarChart3, PieChart, ShieldCheck, Hexagon, CircleDollarSign, ArrowRight, GaugeCircle, Clock, Layers, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import VaultDetails from '@/components/vaults/VaultDetails';

const vaults = [
  {
    id: "vault-111",
    name: "Yield Optimization Vault",
    code: "111",
    type: "Yield Optimization",
    icon: <Sparkles className="w-5 h-5 text-white" />,
    description: "Designed to optimize yield for stable coin holders - focusing on USDC holders. Through dynamic allocation and incentive-driven staking, this vault is designed for users to achieve maximum passive yields with minimal friction.",
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
      name: "Ethereum",
      icon: <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">E</div>
    },
    compatibility: [
      <div key="1" className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-xs text-white">M</div>,
      <div key="2" className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center text-xs text-white">S</div>,
      <div key="3" className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-xs text-white">B</div>
    ],
    features: [
      {
        title: "Dual-layer yield",
        icon: <Coins className="w-5 h-5 text-aero" />,
        description: "Earn native stable yield as well as aarná staking yields"
      },
      {
        title: "Portfolio rebalancing",
        icon: <Layers className="w-5 h-5 text-aero" />,
        description: "The underlying assets are dynamically adjusted to the best-performing protocols"
      },
      {
        title: "Redemption mode",
        icon: <Clock className="w-5 h-5 text-aero" />,
        description: "Users can choose to queue their withdrawals for lower gas costs or directly withdraw"
      },
      {
        title: "Fee structure",
        icon: <CircleDollarSign className="w-5 h-5 text-aero" />,
        description: "• No annual fee\n• 1% transaction and 10% performance fee"
      }
    ]
  },
  {
    id: "vault-502",
    name: "DeFi Analytics Vault",
    code: "502",
    type: "Quant & DeFi",
    icon: <LineChartIcon className="w-5 h-5 text-white" />,
    description: "Data-driven insights and automated trading based on on-chain analytics with quantitative strategies and advanced DeFi integrations.",
    nav: "$105.27",
    tvl: "$6,432.80",
    inception: "15 Apr 23",
    apy: "8.6% - 12.4%",
    risk: "Medium-High",
    color: "bg-orion/20 text-orion",
    shadow: "shadow-neon-orion",
    chartColor: "#9B87F5",
    portfolio: {
      icon: <PieChart className="w-5 h-5 text-white" />,
      releaseDate: "April 15, 2023"
    },
    chain: {
      name: "Sui",
      icon: <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center text-xs text-white">S</div>
    },
    compatibility: [
      <div key="1" className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-xs text-white">M</div>,
      <div key="2" className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center text-xs text-white">A</div>
    ],
    features: [
      {
        title: "AI-driven strategies",
        icon: <Sparkles className="w-5 h-5 text-orion" />,
        description: "Machine learning models optimize trading strategies based on market conditions"
      },
      {
        title: "Multi-chain exposure",
        icon: <Layers className="w-5 h-5 text-orion" />,
        description: "Access opportunities across multiple blockchains through optimized bridge protocols"
      },
      {
        title: "Real-time monitoring",
        icon: <BarChart3 className="w-5 h-5 text-orion" />,
        description: "24/7 automated position management with advanced risk parameters"
      },
      {
        title: "Fee structure",
        icon: <CircleDollarSign className="w-5 h-5 text-orion" />,
        description: "• 0.5% annual management fee\n• 15% performance fee"
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
          {/* Vault Selector */}
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
                            : "from-orion/90 to-orion/70"
                        } text-white shadow-lg` 
                      : "hover:bg-white/5"
                  }`}
                  onClick={() => setSelectedVault(vault)}
                >
                  <div className={`w-8 h-8 rounded-full ${vault.color} flex items-center justify-center mr-3`}>
                    {vault.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-xs opacity-70">ātv {vault.code}</div>
                    <div className="font-medium text-sm">{vault.type}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Vault Details */}
          <VaultDetails vault={selectedVault} />
          
          {/* Staking & Time Lock Rewards Section */}
          <div className="mt-16">
            <div className="glass-card p-8 rounded-xl border border-white/10 relative overflow-hidden">
              <div className="absolute -left-16 -bottom-16">
                <div className="relative w-48 h-48">
                  <div className="w-full h-full rounded-full border-4 border-aero/30 flex items-center justify-center">
                    <div className="w-36 h-36 rounded-full border-4 border-aero/50 flex flex-col items-center justify-center text-center bg-nodo-darker">
                      <div className="text-aero font-medium">booster</div>
                      <div className="text-aero font-medium">time lock</div>
                      <div className="text-white font-bold font-mono mt-1">USDC 2X</div>
                      <div className="text-aero text-sm">APY</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="ml-32">
                <h2 className="text-2xl font-bold mb-2">
                  <span className="text-aero">ātv</span> staking & time lock 
                  <span className="text-aero ml-2">rewards</span>
                </h2>
                <p className="text-white/70 mb-4">
                  Stake ātv and boost returns with pre-sale access to AARNA
                </p>
                <Button variant="outline" className="bg-transparent border-aero/30 text-aero hover:bg-aero/10">
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
