import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, PieChart, Bell, Settings, Sparkles, TrendingUp, Wallet, CircleDollarSign, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const aiAgents = [
  {
    id: "1",
    name: "Nodo Alpha",
    avatar: "bg-nova/20",
    primaryColor: "nova",
    activeVaults: 3,
    totalValue: "$48,250.84",
    monthChange: "+5.2%",
    returns: "+$876.21",
    nextRewards: "22h 14m"
  },
  {
    id: "2",
    name: "Quantum Beta",
    avatar: "bg-aero/20",
    primaryColor: "aero",
    activeVaults: 2,
    totalValue: "$32,170.45",
    monthChange: "+4.8%",
    returns: "+$655.90",
    nextRewards: "18h 45m"
  },
  {
    id: "3",
    name: "Orion Strategy",
    avatar: "bg-orion/20",
    primaryColor: "orion",
    activeVaults: 4,
    totalValue: "$67,890.32",
    monthChange: "+6.5%",
    returns: "+$1,204.15",
    nextRewards: "10h 30m"
  }
];

const Dashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState(aiAgents[0]);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [selectedVault, setSelectedVault] = useState<any>(null);
  
  const form = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const handleAgentChange = (agentId: string) => {
    const agent = aiAgents.find(agent => agent.id === agentId);
    if (agent) setSelectedAgent(agent);
  };

  const handleOpenDepositDialog = (vault: any) => {
    setSelectedVault(vault);
    setDepositDialogOpen(true);
  };

  const handleDepositSubmit = (values: any) => {
    console.log(`Depositing ${values.amount} to ${selectedVault.title}`);
    setDepositDialogOpen(false);
    form.reset();
  };

  const vaults = [
    {
      id: "1",
      title: "Market Making Vault",
      icon: <LineChart className="w-5 h-5 text-white" />,
      iconBg: `bg-${selectedAgent.primaryColor}/20`,
      activeDate: "Apr 2, 2025",
      allocation: "$25,000 USDC",
      apy: "8.4%",
      profit: "+$512.33"
    },
    {
      id: "2",
      title: "Yield Optimization Vault",
      icon: <Sparkles className="w-5 h-5 text-white" />,
      iconBg: `bg-${selectedAgent.primaryColor}/20`,
      activeDate: "Mar 22, 2025",
      allocation: "$15,000 USDC",
      apy: "6.9%",
      profit: "+$258.75"
    }
  ];

  return (
    <div className="min-h-screen bg-nodo-darker text-white">
      <Navbar />
      <main>
        <div className="pt-28 pb-12 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-transparent border border-white/20 text-white flex gap-2 items-center">
                      <div className={`w-8 h-8 rounded-full ${selectedAgent.avatar} flex items-center justify-center`}>
                        <span className="text-sm font-medium">{selectedAgent.name.charAt(0)}</span>
                      </div>
                      <span>{selectedAgent.name}</span>
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-nodo-dark border border-white/10 text-white">
                    {aiAgents.map(agent => (
                      <DropdownMenuItem 
                        key={agent.id} 
                        onClick={() => handleAgentChange(agent.id)}
                        className="hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full ${agent.avatar} flex items-center justify-center`}>
                            <span className="text-xs font-medium">{agent.name.charAt(0)}</span>
                          </div>
                          <span>{agent.name}</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
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
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="glass-card p-6 rounded-xl">
                <div className="text-sm text-white/60 mb-2">Total Portfolio Value</div>
                <div className="text-3xl font-bold">{selectedAgent.totalValue}</div>
                <div className="flex items-center text-green-400 text-sm mt-2">
                  <span className="mr-1">{selectedAgent.monthChange}</span>
                  <span className="text-white/60">this month</span>
                </div>
              </Card>
              
              <Card className="glass-card p-6 rounded-xl">
                <div className="text-sm text-white/60 mb-2">Active Vaults</div>
                <div className="text-3xl font-bold">{selectedAgent.activeVaults}</div>
                <div className="flex items-center text-white/60 text-sm mt-2">
                  <span className="mr-1">of 6 vaults</span>
                </div>
              </Card>
              
              <Card className="glass-card p-6 rounded-xl">
                <div className="text-sm text-white/60 mb-2">30d Returns</div>
                <div className="text-3xl font-bold text-green-400">{selectedAgent.returns}</div>
                <div className="flex items-center text-white/60 text-sm mt-2">
                  <span className="mr-1">+3.8% ROI</span>
                </div>
              </Card>
              
              <Card className="glass-card p-6 rounded-xl">
                <div className="text-sm text-white/60 mb-2">Next Rewards</div>
                <div className="text-3xl font-bold">{selectedAgent.nextRewards}</div>
                <div className="flex items-center text-white/60 text-sm mt-2">
                  <span className="mr-1">Est. $125.40</span>
                </div>
              </Card>
            </div>
            
            <Tabs defaultValue="active" className="mb-8">
              <TabsList className="bg-nodo-dark border border-white/10 mb-4">
                <TabsTrigger value="active" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Active Vaults</TabsTrigger>
                <TabsTrigger value="all" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">All Vaults</TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                <div className="grid gap-4">
                  {vaults.map((vault) => (
                    <Card key={vault.id} className="glass-card p-4 rounded-xl">
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                        <div className="md:col-span-2">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full ${vault.iconBg} flex items-center justify-center mr-3`}>
                              {vault.icon}
                            </div>
                            <div>
                              <div className="font-bold">{vault.title}</div>
                              <div className="text-xs text-white/60">Active since {vault.activeDate}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-white/60">Allocation</div>
                          <div className="font-semibold">{vault.allocation}</div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-white/60">Current APY</div>
                          <div className="font-semibold text-green-400">{vault.apy}</div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-white/60">30d Profit</div>
                          <div className="font-semibold">{vault.profit}</div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="w-full bg-transparent border border-white/20 text-white hover:bg-white/10"
                          >
                            Manage
                          </Button>
                          <Button 
                            className={`w-full bg-${selectedAgent.primaryColor} hover:bg-${selectedAgent.primaryColor}/90 text-white flex items-center gap-2`}
                            onClick={() => handleOpenDepositDialog(vault)}
                          >
                            <Wallet size={16} />
                            <span>Deposit</span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="all">
                <Card className="glass-card p-6 rounded-xl text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Explore All Vaults</h3>
                  <p className="text-white/70 mb-4">Discover more investment opportunities with our specialized AI vaults</p>
                  <Button className="bg-gradient-to-r from-nova to-aero" asChild>
                    <Link to="/vaults">Browse All Vaults</Link>
                  </Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card className="glass-card p-6 rounded-xl text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Portfolio Analytics</h3>
                  <p className="text-white/70 mb-4">Detailed analysis of your investment performance across all vaults</p>
                  <div className="h-60 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                    <span className="text-white/40">Analytics Dashboard Coming Soon</span>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Recent Activity</h3>
                <Link to="/activity" className="text-sm text-nova hover:text-nova-light">View All Activity</Link>
              </div>
              
              <Card className="glass-card rounded-xl overflow-hidden border-white/10">
                <div className="divide-y divide-white/10">
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
      
      <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-nodo-darker border border-white/10 text-white">
          <DialogHeader>
            {selectedVault && (
              <>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${selectedVault.iconBg} flex items-center justify-center`}>
                    {selectedVault.icon}
                  </div>
                  <DialogTitle>Deposit to {selectedVault.title}</DialogTitle>
                </div>
                <DialogDescription className="text-white/70">
                  Make a deposit to start earning {selectedVault.apy} APY
                </DialogDescription>
              </>
            )}
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleDepositSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (USDC)</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="0.00"
                          className="bg-nodo-dark border-white/20 text-white pl-8"
                          {...field}
                        />
                      </FormControl>
                      <CircleDollarSign className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
                    </div>
                    <FormDescription className="text-white/60">
                      Available: 125,000 USDC
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between text-sm text-white/70">
                <span>Estimated APY:</span>
                {selectedVault && <span className="text-green-400">{selectedVault.apy}</span>}
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDepositDialogOpen(false)} className="bg-transparent border-white/20 text-white">
                  Cancel
                </Button>
                <Button type="submit" className={`bg-${selectedAgent?.primaryColor || 'nova'}`}>
                  Confirm Deposit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
