
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Activity = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const transactions = [
    {
      id: "0x6a8d...f41c",
      type: "Swap",
      description: "Swapped 5,000 USDC for 25.8 SUI",
      vault: "Market Making",
      timestamp: "5 min ago",
      status: "Completed",
      color: "bg-nova/20 text-nova border-nova/30"
    },
    {
      id: "0x9c3e...a27b",
      type: "Yield",
      description: "Deployed 12,500 USDC to Scallop lending protocol",
      vault: "Yield Optimization",
      timestamp: "23 min ago",
      status: "Completed",
      color: "bg-aero/20 text-aero border-aero/30"
    },
    {
      id: "0x2b7f...d93e",
      type: "Rebalance",
      description: "Portfolio rebalanced: +3% SUI, -3% USDC",
      vault: "Analytics",
      timestamp: "1 hour ago",
      status: "Completed",
      color: "bg-orion/20 text-orion border-orion/30"
    },
    {
      id: "0xf45a...c28d",
      type: "Deposit",
      description: "User deposited 10,000 USDC into vault",
      vault: "Market Making",
      timestamp: "2 hours ago",
      status: "Completed",
      color: "bg-nova/20 text-nova border-nova/30"
    },
    {
      id: "0x3d7c...e61a",
      type: "Withdraw",
      description: "User withdrew 2,500 USDC from vault",
      vault: "Yield Optimization",
      timestamp: "5 hours ago",
      status: "Completed",
      color: "bg-aero/20 text-aero border-aero/30"
    },
    {
      id: "0x8f4b...a93c",
      type: "Swap",
      description: "Swapped 12.5 SUI for 250 USDC",
      vault: "Market Making",
      timestamp: "6 hours ago",
      status: "Completed",
      color: "bg-nova/20 text-nova border-nova/30"
    },
    {
      id: "0xc7e2...b58f",
      type: "Yield",
      description: "Harvested 320 USDC rewards from lending position",
      vault: "Yield Optimization",
      timestamp: "8 hours ago",
      status: "Completed",
      color: "bg-aero/20 text-aero border-aero/30"
    },
    {
      id: "0x1a5d...e72c",
      type: "Rebalance",
      description: "Portfolio rebalanced due to market volatility",
      vault: "Analytics",
      timestamp: "12 hours ago",
      status: "Completed",
      color: "bg-orion/20 text-orion border-orion/30"
    }
  ];

  return (
    <div className="min-h-screen bg-nodo-darker text-white">
      <Navbar />
      <main>
        <div className="pt-28 pb-12 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Activity Feed</h1>
              <p className="text-white/70 max-w-3xl">
                Real-time on-chain activity from our AI agents, providing complete transparency into vault operations.
              </p>
            </div>
            
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-white/80">Live Updates</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`bg-transparent border ${activeFilter === 'all' ? 'border-nova text-nova' : 'border-white/20 text-white/70'} hover:bg-white/5`}
                    onClick={() => setActiveFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`bg-transparent border ${activeFilter === 'swaps' ? 'border-nova text-nova' : 'border-white/20 text-white/70'} hover:bg-white/5`}
                    onClick={() => setActiveFilter('swaps')}
                  >
                    Swaps
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`bg-transparent border ${activeFilter === 'yields' ? 'border-nova text-nova' : 'border-white/20 text-white/70'} hover:bg-white/5`}
                    onClick={() => setActiveFilter('yields')}
                  >
                    Yields
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`bg-transparent border ${activeFilter === 'deposits' ? 'border-nova text-nova' : 'border-white/20 text-white/70'} hover:bg-white/5`}
                    onClick={() => setActiveFilter('deposits')}
                  >
                    Deposits
                  </Button>
                  <div className="relative">
                    <Input
                      placeholder="Search transactions..."
                      className="pl-9 bg-white/5 border-white/20 focus:border-nova"
                    />
                    <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 text-white/50 w-4 h-4" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border border-white/20 text-white/70 hover:bg-white/5"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </div>
            
            <Card className="glass-card rounded-xl overflow-hidden border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr className="text-left">
                      <th className="px-6 py-3 text-xs font-medium text-white/70">Transaction</th>
                      <th className="px-6 py-3 text-xs font-medium text-white/70">Description</th>
                      <th className="px-6 py-3 text-xs font-medium text-white/70">Vault</th>
                      <th className="px-6 py-3 text-xs font-medium text-white/70">Time</th>
                      <th className="px-6 py-3 text-xs font-medium text-white/70">Status</th>
                      <th className="px-6 py-3 text-xs font-medium text-white/70">Verify</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.color.split(" ")[0]}`}>
                              <span className="text-xs font-medium">{tx.type.charAt(0)}</span>
                            </div>
                            <span className="ml-3 text-sm font-mono">{tx.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{tx.description}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${tx.color}`}>
                            {tx.vault}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/70">{tx.timestamp}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <Eye size={16} className="text-white/70" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-sm text-white/60">Showing 8 of 248 transactions</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent border border-white/20 text-white/70 hover:bg-white/5">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent border border-white/20 text-white/70 hover:bg-white/5">
                    Next
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Activity;
