
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, PieChart, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-nodo-darker text-white">
      <Navbar />
      <main>
        <div className="pt-28 pb-12 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">User Dashboard</h1>
                <p className="text-white/70">
                  Welcome back! Here's an overview of your portfolio and investments.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <Button variant="outline" className="bg-transparent border border-white/20 text-white flex gap-2 items-center">
                  <Bell size={16} />
                  <span>Alerts</span>
                </Button>
                <Button variant="outline" className="bg-transparent border border-white/20 text-white flex gap-2 items-center">
                  <Settings size={16} />
                  <span>Settings</span>
                </Button>
              </div>
            </div>
            
            {/* Portfolio Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="glass-card p-6 rounded-xl">
                <div className="text-sm text-white/60 mb-2">Total Portfolio Value</div>
                <div className="text-3xl font-bold">$48,250.84</div>
                <div className="flex items-center text-green-400 text-sm mt-2">
                  <span className="mr-1">+5.2%</span>
                  <span className="text-white/60">this month</span>
                </div>
              </Card>
              
              <Card className="glass-card p-6 rounded-xl">
                <div className="text-sm text-white/60 mb-2">Active Vaults</div>
                <div className="text-3xl font-bold">3</div>
                <div className="flex items-center text-white/60 text-sm mt-2">
                  <span className="mr-1">of 6 vaults</span>
                </div>
              </Card>
              
              <Card className="glass-card p-6 rounded-xl">
                <div className="text-sm text-white/60 mb-2">30d Returns</div>
                <div className="text-3xl font-bold text-green-400">+$876.21</div>
                <div className="flex items-center text-white/60 text-sm mt-2">
                  <span className="mr-1">+3.8% ROI</span>
                </div>
              </Card>
              
              <Card className="glass-card p-6 rounded-xl">
                <div className="text-sm text-white/60 mb-2">Next Rewards</div>
                <div className="text-3xl font-bold">22h 14m</div>
                <div className="flex items-center text-white/60 text-sm mt-2">
                  <span className="mr-1">Est. $125.40</span>
                </div>
              </Card>
            </div>
            
            {/* Asset Allocation & Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Asset Allocation */}
              <Card className="glass-card p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Asset Allocation</h3>
                  <PieChart size={18} className="text-aero" />
                </div>
                
                <div className="h-48 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center mb-4">
                  <span className="text-white/40">Allocation Chart Placeholder</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-nova rounded-full mr-2"></div>
                      <span className="text-sm">SUI</span>
                    </div>
                    <span className="text-sm">45%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-aero rounded-full mr-2"></div>
                      <span className="text-sm">USDC</span>
                    </div>
                    <span className="text-sm">30%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orion rounded-full mr-2"></div>
                      <span className="text-sm">Other</span>
                    </div>
                    <span className="text-sm">25%</span>
                  </div>
                </div>
              </Card>
              
              {/* Performance Chart */}
              <Card className="glass-card p-6 rounded-xl lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Portfolio Performance</h3>
                  <div className="text-xs px-3 py-1 rounded-full bg-white/10">Last 30 days</div>
                </div>
                
                <div className="h-48 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center mb-4">
                  <span className="text-white/40">Performance Chart Placeholder</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-white/60">Total Return</div>
                    <div className="text-lg font-bold text-green-400">+8.2%</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60">Avg. Daily</div>
                    <div className="text-lg font-bold">+0.27%</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60">Max Drawdown</div>
                    <div className="text-lg font-bold text-orange-400">-2.1%</div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Active Vaults */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Your Active Vaults</h3>
                <Link to="/vaults" className="text-sm text-nova hover:text-nova-light">View All Vaults</Link>
              </div>
              
              <div className="grid gap-4">
                {/* Vault Item 1 */}
                <Card className="glass-card p-4 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div className="md:col-span-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-nova/20 flex items-center justify-center mr-3">
                          <LineChart className="w-5 h-5 text-nova" />
                        </div>
                        <div>
                          <div className="font-bold">Market Making Vault</div>
                          <div className="text-xs text-white/60">Active since Apr 2, 2025</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-white/60">Allocation</div>
                      <div className="font-semibold">$25,000 USDC</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-white/60">Current APY</div>
                      <div className="font-semibold text-green-400">8.4%</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-white/60">30d Profit</div>
                      <div className="font-semibold">+$512.33</div>
                    </div>
                    
                    <div>
                      <Button variant="outline" className="w-full bg-transparent border border-white/20 text-white hover:bg-white/10">
                        Manage
                      </Button>
                    </div>
                  </div>
                </Card>
                
                {/* Vault Item 2 */}
                <Card className="glass-card p-4 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div className="md:col-span-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-aero/20 flex items-center justify-center mr-3">
                          <PieChart className="w-5 h-5 text-aero" />
                        </div>
                        <div>
                          <div className="font-bold">Yield Optimization Vault</div>
                          <div className="text-xs text-white/60">Active since Mar 22, 2025</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-white/60">Allocation</div>
                      <div className="font-semibold">$15,000 USDC</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-white/60">Current APY</div>
                      <div className="font-semibold text-green-400">6.9%</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-white/60">30d Profit</div>
                      <div className="font-semibold">+$258.75</div>
                    </div>
                    
                    <div>
                      <Button variant="outline" className="w-full bg-transparent border border-white/20 text-white hover:bg-white/10">
                        Manage
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Recent Activity</h3>
                <Link to="/activity" className="text-sm text-nova hover:text-nova-light">View All Activity</Link>
              </div>
              
              <Card className="glass-card rounded-xl overflow-hidden border-white/10">
                <div className="divide-y divide-white/10">
                  {/* Activity Item 1 */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-nova/20 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-nova">S</span>
                      </div>
                      <div>
                        <div className="font-medium">Swapped 5,000 USDC for 25.8 SUI</div>
                        <div className="text-xs text-white/60">Market Making Vault • 5 min ago</div>
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                        Completed
                      </span>
                    </div>
                  </div>
                  
                  {/* Activity Item 2 */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-aero/20 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-aero">Y</span>
                      </div>
                      <div>
                        <div className="font-medium">Deployed 12,500 USDC to Scallop lending protocol</div>
                        <div className="text-xs text-white/60">Yield Optimization Vault • 23 min ago</div>
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                        Completed
                      </span>
                    </div>
                  </div>
                  
                  {/* Activity Item 3 */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-orion/20 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-orion">R</span>
                      </div>
                      <div>
                        <div className="font-medium">Portfolio rebalanced: +3% SUI, -3% USDC</div>
                        <div className="text-xs text-white/60">Analytics Vault • 1 hour ago</div>
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
