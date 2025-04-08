
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Bell, Settings, LineChart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AgentSelector from '@/components/dashboard/AgentSelector';
import DashboardStats from '@/components/dashboard/DashboardStats';
import VaultTabs from '@/components/dashboard/VaultTabs';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import DepositDialog from '@/components/dashboard/DepositDialog';

// AI agent data
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
  };

  // Generate vault data based on selected agent
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
                <AgentSelector 
                  agents={aiAgents}
                  selectedAgent={selectedAgent}
                  onAgentChange={handleAgentChange}
                />
                
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
            
            <DashboardStats agent={selectedAgent} />
            
            <VaultTabs 
              vaults={vaults}
              selectedAgent={selectedAgent}
              onOpenDepositDialog={handleOpenDepositDialog}
            />
            
            <ActivityFeed />
          </div>
        </div>
      </main>
      <Footer />
      
      <DepositDialog
        open={depositDialogOpen}
        onOpenChange={setDepositDialogOpen}
        selectedVault={selectedVault}
        primaryColor={selectedAgent?.primaryColor || "nova"}
        onSubmit={handleDepositSubmit}
      />
    </div>
  );
};

export default Dashboard;
