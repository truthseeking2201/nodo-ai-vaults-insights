
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, ChevronRight } from 'lucide-react';

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
  const getVaultStyles = () => {
    switch (primaryColor) {
      case 'nova':
        return {
          border: 'border-nova/30',
          gradient: 'from-nova/20 via-nova/10 to-transparent',
          hover: 'hover:border-nova/50 hover:bg-nova/5',
          button: 'bg-nova hover:bg-nova/90'
        };
      case 'orion':
        return {
          border: 'border-orion/30',
          gradient: 'from-orion/20 via-orion/10 to-transparent',
          hover: 'hover:border-orion/50 hover:bg-orion/5',
          button: 'bg-orion hover:bg-orion/90'
        };
      case 'aero':
        return {
          border: 'border-amber-500/30',
          gradient: 'from-amber-500/20 via-amber-500/10 to-transparent',
          hover: 'hover:border-amber-500/50 hover:bg-amber-500/5',
          button: 'bg-amber-500 hover:bg-amber-600'
        };
      default:
        return {
          border: 'border-white/10',
          gradient: 'from-white/10 via-white/5 to-transparent',
          hover: 'hover:border-white/20 hover:bg-white/5',
          button: 'bg-primary hover:bg-primary/90'
        };
    }
  };

  const styles = getVaultStyles();

  return (
    <Card 
      className={`glass-card p-4 rounded-xl transition-all duration-300 border ${styles.border} ${styles.hover}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
        {/* Left section with vault info */}
        <div className="md:col-span-2">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full ${vault.iconBg} flex items-center justify-center mr-3 relative`}>
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${styles.gradient} opacity-50`}></div>
              {vault.icon}
            </div>
            <div>
              <div className="font-bold relative">
                {vault.title}
              </div>
              <div className="text-xs text-white/60">Active since {vault.activeDate}</div>
            </div>
          </div>
        </div>
        
        {/* Center section with stats */}
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
        
        {/* Right section with buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="w-full bg-transparent border border-white/20 text-white hover:bg-white/10"
          >
            Manage
          </Button>
          <Button 
            className={`w-full ${styles.button} text-white flex items-center gap-2`}
            onClick={() => onOpenDepositDialog(vault)}
          >
            <Wallet size={16} />
            <span>Deposit</span>
            <ChevronRight size={16} className="ml-auto" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VaultCard;
