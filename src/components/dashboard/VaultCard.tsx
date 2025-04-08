
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

interface VaultCardProps {
  vault: {
    id: string;
    title: string;
    icon: React.ReactNode;
    iconBg: string;
    activeDate: string;
    allocation: string;
    apy: string;
    profit: string;
  };
  onOpenDepositDialog: (vault: any) => void;
  primaryColor: string;
}

const VaultCard: React.FC<VaultCardProps> = ({ vault, onOpenDepositDialog, primaryColor }) => {
  return (
    <Card key={vault.id} className="glass-card p-4 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
        <div className="md:col-span-2">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full ${vault.iconBg} flex items-center justify-center mr-3`}>
              {vault.icon}
            </div>
            <div>
              <div className="font-bold">{vault.title}</div>
              <div className="text-xs text-white/60">Nodo vault - Active since {vault.activeDate}</div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-white/60">Allocation</div>
          <div className="font-semibold font-mono">{vault.allocation}</div>
        </div>
        
        <div>
          <div className="text-xs text-white/60">Current APY</div>
          <div className="font-semibold text-green-400 font-mono">{vault.apy}</div>
        </div>
        
        <div>
          <div className="text-xs text-white/60">30d Profit</div>
          <div className="font-semibold font-mono">{vault.profit}</div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="w-full bg-transparent border border-white/20 text-white hover:bg-white/10"
          >
            Manage
          </Button>
          <Button 
            className={`w-full bg-${primaryColor} hover:bg-${primaryColor}/90 text-white flex items-center gap-2`}
            onClick={() => onOpenDepositDialog(vault)}
          >
            <Wallet size={16} />
            <span>Deposit</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VaultCard;
