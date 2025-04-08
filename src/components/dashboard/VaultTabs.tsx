
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VaultCard from './VaultCard';

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
        <TabsTrigger value="all" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">All Vaults</TabsTrigger>
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
  );
};

export default VaultTabs;
