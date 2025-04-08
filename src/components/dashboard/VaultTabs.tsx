
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VaultCard from './VaultCard';
import { LineChart, BarChart3, ChevronRight } from 'lucide-react';

interface VaultTabsProps {
  vaults: any[];
  selectedAgent: any;
  onOpenDepositDialog: (vault: any) => void;
}

const VaultTabs: React.FC<VaultTabsProps> = ({ vaults, selectedAgent, onOpenDepositDialog }) => {
  return (
    <Tabs defaultValue="active" className="mb-8">
      <TabsList className="bg-nodo-dark border border-white/10 mb-4">
        <TabsTrigger value="active" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Active Vaults</TabsTrigger>
        <TabsTrigger value="all" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">All Nodo Vaults</TabsTrigger>
        <TabsTrigger value="analytics" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Analytics</TabsTrigger>
      </TabsList>
      
      <TabsContent value="active">
        <div className="grid gap-4">
          {vaults.map((vault) => (
            <VaultCard 
              key={vault.id}
              vault={vault}
              onOpenDepositDialog={onOpenDepositDialog}
              primaryColor={selectedAgent.primaryColor}
            />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            className="bg-transparent border-white/20 hover:bg-white/10 text-white"
            asChild
          >
            <Link to="/vaults" className="flex items-center gap-2">
              <span>Explore All Nodo Vaults</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </TabsContent>
      
      <TabsContent value="all">
        <div className="grid gap-6">
          <Card className="glass-card p-6 rounded-xl border border-white/10 hover-scale transition-all">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-aero/20 flex items-center justify-center">
                  <LineChart className="w-5 h-5 text-aero" />
                </div>
                <div>
                  <div className="text-xs opacity-70">Yield Optimization</div>
                  <h3 className="font-bold">Nodo Stability Vault</h3>
                </div>
              </div>
              <span className="text-aero font-mono">5.8% - 8.4% APY</span>
            </div>
            <p className="text-white/70 text-sm mb-6 line-clamp-2">
              Designed to optimize yield for stable coin holders with Nodo's advanced risk management.
            </p>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-white/60">TVL</div>
                <div className="font-mono font-semibold">$28,715.31</div>
              </div>
              <Button variant="outline" className="border-aero/50 text-aero hover:bg-aero/10" asChild>
                <Link to="/vaults" className="flex items-center gap-2">
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </Card>
          
          <Card className="glass-card p-6 rounded-xl border border-white/10 hover-scale transition-all">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orion/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-orion" />
                </div>
                <div>
                  <div className="text-xs opacity-70">DeFi Analyst</div>
                  <h3 className="font-bold">Nodo Growth Engine</h3>
                </div>
              </div>
              <span className="text-orion font-mono">8.6% - 12.4% APY</span>
            </div>
            <p className="text-white/70 text-sm mb-6 line-clamp-2">
              Nodo's quantitative strategy leveraging AI analytics for higher returns across DeFi protocols.
            </p>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-white/60">TVL</div>
                <div className="font-mono font-semibold">$6,432.80</div>
              </div>
              <Button variant="outline" className="border-orion/50 text-orion hover:bg-orion/10" asChild>
                <Link to="/vaults" className="flex items-center gap-2">
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </Card>
          
          <div className="text-center py-4">
            <Button className="bg-gradient-to-r from-nova to-aero" asChild>
              <Link to="/vaults">Browse All Nodo Vaults</Link>
            </Button>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="analytics">
        <Card className="glass-card p-6 rounded-xl text-center py-12">
          <h3 className="text-xl font-semibold mb-2">Nodo Portfolio Analytics</h3>
          <p className="text-white/70 mb-4">Detailed analysis of your investment performance across all Nodo vaults</p>
          <div className="h-60 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
            <span className="text-white/40">Nodo Analytics Dashboard Coming Soon</span>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default VaultTabs;
