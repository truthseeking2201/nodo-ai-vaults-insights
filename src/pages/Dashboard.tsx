
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { LineChart, ArrowRight, InfoIcon, Clock, ChevronDown, Sparkles, TrendingUp, Shield, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Strategy data
const strategies = [
  {
    id: "yield-cosmos",
    name: "Cosmic Yield",
    type: "Yield Optimization",
    icon: <Sparkles className="w-5 h-5 text-white" />,
    description: "Designed for stable returns with minimal volatility. Focused on secure yield generation.",
    apy: "6.84%",
    changePercent: "+0.91%",
    color: "bg-aero/20 text-aero",
    colorAccent: "aero",
    tvl: "5.43M USDC",
    tvlValue: "$5.43M"
  },
  {
    id: "quantum-nexus",
    name: "Quantum Nexus",
    type: "DeFi Analyst",
    icon: <LineChart className="w-5 h-5 text-white" />,
    description: "Nodo's quantitative strategy leveraging AI analytics for higher returns across DeFi protocols.",
    apy: "8.12%",
    changePercent: "+1.35%",
    color: "bg-nova/20 text-nova",
    colorAccent: "nova",
    tvl: "6.21M USDC",
    tvlValue: "$6.21M"
  },
  {
    id: "alpha-engine",
    name: "Alpha Engine",
    type: "Market Maker",
    icon: <TrendingUp className="w-5 h-5 text-white" />,
    description: "Advanced trading strategy targeting alpha generation through sophisticated market-making algorithms.",
    apy: "10.56%",
    changePercent: "+2.18%",
    color: "bg-orion/20 text-orion",
    colorAccent: "orion",
    tvl: "4.87M USDC",
    tvlValue: "$4.87M"
  }
];

// Portfolio allocation data
const portfolioAllocation = [
  { protocol: "Float", allocation: "58.84%", apy: "6.05%", value: "5.31M" },
  { protocol: "Compound V3", allocation: "21.21%", apy: "5.93%", value: "0.923.73" },
  { protocol: "Buffer", allocation: "10.65%", apy: "5.06%", value: "956.50" },
  { protocol: "Aave V3", allocation: "5.10%", apy: "4.91%", value: "0.00" },
  { protocol: "Solace", allocation: "4.20%", apy: "5.51%", value: "0.00" }
];

// Activity data
const activityData = [
  { 
    type: "Funds Withdrawn", 
    amount: "2.5 weeks ago", 
    action: "Compound V3 → Buffer",
    actionDetail: "0.02 USDC received"
  },
  { 
    type: "Funds Withdrawn", 
    amount: "2.5 weeks ago", 
    action: "Compound V3 → Buffer",
    actionDetail: "0.07 USDC received"
  },
  { 
    type: "Funds Withdrawn", 
    amount: "2.5 weeks ago", 
    action: "Compound V3 → Buffer",
    actionDetail: "0.12 USDC received"
  },
  { 
    type: "Funds Deposited", 
    amount: "3 weeks ago", 
    action: "Buffer → Overhide",
    actionDetail: "200 USDC transacted"
  }
];

const Dashboard = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);
  const [showDepositPanel, setShowDepositPanel] = useState(true);
  
  return (
    <div className="min-h-screen bg-nodo-darker text-white">
      <Navbar />
      
      <main className="pt-28 pb-12 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          {/* Header area with strategy selection */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-white/50 text-sm mb-2">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">0x87...64E</span>
              <InfoIcon className="w-4 h-4 ml-1" />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedStrategy.color}`}>
                  {selectedStrategy.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">{selectedStrategy.name}</h2>
                    <span className={`text-xs bg-${selectedStrategy.colorAccent}/10 text-${selectedStrategy.colorAccent} rounded-full px-2 py-0.5`}>
                      {selectedStrategy.type}
                    </span>
                  </div>
                  <div className="text-sm text-white/60">Sui Blockchain</div>
                </div>
              </div>
              
              <Button className="bg-nova hover:bg-nova/90 text-white">
                Deposit
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Strategy overview */}
              <Card className="glass-card mb-6 border border-white/10 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div>
                    <div className="text-sm text-white/60 mb-1">New strategy</div>
                    <h3 className="text-lg font-medium mb-1">{selectedStrategy.name}</h3>
                    <div className="text-xs text-white/50">Requires more data</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Current APY</div>
                    <div className="text-3xl font-bold text-white mb-1">{selectedStrategy.apy}</div>
                    <div className="text-xs text-green-500 flex items-center">
                      {selectedStrategy.changePercent} vs Medium DeFi Yield
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold">{selectedStrategy.tvl}</div>
                      <div className="text-sm text-white/60">{selectedStrategy.tvlValue}</div>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* About the vault */}
              <Card className="glass-card mb-6 border border-white/10">
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">About the vault</h3>
                  <p className="text-white/80 mb-4">
                    {selectedStrategy.name} strategy is a cutting-edge automated vaulting protocol that uses AI to offer effortless and secure optimized yield while diversifying risk.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-white/10 rounded-full px-3 py-1 text-sm">Smart AI rebalancing</span>
                    <span className="bg-white/10 rounded-full px-3 py-1 text-sm">Advanced yield logic</span>
                    <span className="bg-white/10 rounded-full px-3 py-1 text-sm">Security</span>
                    <span className="bg-white/10 rounded-full px-3 py-1 text-sm">Risk management</span>
                  </div>
                </div>
                
                <div className="border-t border-white/10">
                  <Tabs defaultValue="historic" className="w-full">
                    <div className="px-6 pt-4">
                      <TabsList className="bg-white/5 grid w-full grid-cols-2">
                        <TabsTrigger value="historic">Historic</TabsTrigger>
                        <TabsTrigger value="compare">Compare</TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="historic" className="p-6">
                      <div className="h-60 relative bg-white/5 rounded-lg">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-white/60 mb-2">Performance Chart</p>
                            <Button variant="outline" className="bg-transparent border-white/20 text-white">View Details</Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="compare" className="p-6">
                      <div className="h-60 relative bg-white/5 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-white/60 mb-2">Comparison with other strategies</p>
                          <Button variant="outline" className="bg-transparent border-white/20 text-white">Compare</Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
              
              {/* Vault exposure */}
              <Card className="glass-card mb-6 border border-white/10">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Vault exposure</h3>
                    <button className="text-white/50 hover:text-white">
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-white/80 mb-6">
                    This vault has investment exposures distributed through providers on the Sui blockchain.
                    Assets are selected and rebalanced by the Nodo AI engine to ensure maximum access
                    with risk optimized managed by BlockSpaces, an institutional-grade team. All
                    protocols are vetted for security, performance and trustworthy teams.
                  </p>
                  
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <div className="flex justify-between text-white/60 text-sm mb-3">
                      <span>Protocol</span>
                      <div className="grid grid-cols-3 gap-8">
                        <span className="text-right">% Allocation</span>
                        <span className="text-right">Current APY</span>
                        <span className="text-right">Liquidity</span>
                      </div>
                    </div>
                    
                    {portfolioAllocation.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-white/20"></div>
                          <span>{item.protocol}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-8 text-right text-sm">
                          <span>{item.allocation}</span>
                          <span>{item.apy}</span>
                          <span>{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
              
              {/* Rebalancing activity */}
              <Card className="glass-card mb-6 border border-white/10">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Rebalancing activity</h3>
                    <button className="text-white/50 hover:text-white">
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-white/60 text-sm mb-2">Previous 30 days</div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-white/60 text-xs">Optimizations performed</div>
                        <div className="text-lg font-bold">238</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs">Average protocol uptime</div>
                        <div className="text-lg font-bold">99.9 Hours</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs">Estimated earnings</div>
                        <div className="text-lg font-bold">$9.22</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-white/80 text-sm mb-6">
                    Continual monitoring and rebalancing is critical in getting the best possible yield for your
                    strategy & its timeframe. The system is constantly scanning protocol performing analytics and looks for
                    opportunities to shift assets to maximize returns in constantly shifting market conditions.
                  </div>
                  
                  {/* Activity list */}
                  <div className="space-y-4">
                    {activityData.map((item, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
                        <div>
                          <div className="text-white/60 text-xs mb-1">{item.type}</div>
                          <div className="text-sm">{item.amount}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-white/60 text-xs mb-1">Action</div>
                          <div className="text-sm font-medium">
                            {item.action}
                          </div>
                          <div className="text-xs text-white/60">
                            {item.actionDetail}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <button className="text-nova text-sm flex items-center gap-1 mx-auto">
                      View all rebalances <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
              
              {/* Fee structure */}
              <Card className="glass-card border border-white/10">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Strategy management fee</h3>
                    <button className="text-white/50 hover:text-white">
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">1.00% management fee</h4>
                    <p className="text-white/80 text-sm">
                      A 1.00% annualized management fee is charged for using this strategy. The fees are
                      continually accrued for and reflected in the market value of your position. This
                      strategy has no other fees, and there are no penalties or delays when withdrawing
                      funds from this strategy at any time.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Deposit panel */}
            {showDepositPanel && (
              <div className="lg:col-span-1">
                <Card className="glass-card border border-white/10 sticky top-6">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">Deposit</h3>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-sm text-white/60 mb-2">Deposit token</div>
                      <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                        <span className="font-medium">USDC</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-sm flex justify-between mb-2">
                        <span className="text-white/60">Amount</span>
                        <span className="text-white/60">Balance: 0 ($0.00)</span>
                      </div>
                      
                      <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                        <input 
                          type="text" 
                          placeholder="0.00" 
                          className="bg-transparent focus:outline-none w-full" 
                        />
                        <Button variant="outline" className="text-xs h-8 bg-white/10 border-white/20 hover:bg-white/20">
                          Max
                        </Button>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-nova/20 text-nova border border-nova/30 hover:bg-nova/40">
                      Log in
                    </Button>
                    
                    <div className="flex items-center gap-2 justify-center mt-4 text-white/60 text-xs">
                      <Clock className="w-4 h-4" />
                      <span>You cannot undo your chosen strategy</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
