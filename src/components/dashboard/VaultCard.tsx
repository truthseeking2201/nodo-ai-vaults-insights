
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, ChevronRight } from 'lucide-react';
import { fadeIn, pulseGlow } from '@/lib/animations';

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
          button: 'bg-nova hover:bg-nova/90',
          shadow: 'shadow-neon-nova',
          glow: 'rgba(249, 115, 22, 0.6)'
        };
      case 'orion':
        return {
          border: 'border-orion/30',
          gradient: 'from-orion/20 via-orion/10 to-transparent',
          hover: 'hover:border-orion/50 hover:bg-orion/5',
          button: 'bg-orion hover:bg-orion/90',
          shadow: 'shadow-neon-orion',
          glow: 'rgba(245, 158, 11, 0.6)'
        };
      case 'aero':
        return {
          border: 'border-amber-500/30',
          gradient: 'from-amber-500/20 via-amber-500/10 to-transparent',
          hover: 'hover:border-amber-500/50 hover:bg-amber-500/5',
          button: 'bg-amber-500 hover:bg-amber-600',
          shadow: 'shadow-neon-aero',
          glow: 'rgba(217, 119, 6, 0.6)'
        };
      default:
        return {
          border: 'border-white/10',
          gradient: 'from-white/10 via-white/5 to-transparent',
          hover: 'hover:border-white/20 hover:bg-white/5',
          button: 'bg-primary hover:bg-primary/90',
          shadow: '',
          glow: 'rgba(255, 255, 255, 0.6)'
        };
    }
  };

  const styles = getVaultStyles();
  
  // Initialize animations when component mounts
  React.useEffect(() => {
    // Find card element by its data-vault-id attribute
    const cardElement = document.querySelector(`[data-vault-id="${vault.id}"]`);
    if (cardElement) {
      // Apply fade in animation
      fadeIn(cardElement, 800, 100);
      
      // Apply glow effect to icon
      const iconElement = cardElement.querySelector('.vault-icon');
      if (iconElement) {
        pulseGlow(iconElement, styles.glow);
      }
    }
  }, [vault.id, styles.glow]);

  return (
    <Card 
      data-vault-id={vault.id}
      className={`glass-card p-4 rounded-xl transition-all duration-300 border ${styles.border} ${styles.hover} transform hover:-translate-y-1 hover:${styles.shadow}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
        {/* Left section with vault info */}
        <div className="md:col-span-2">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full ${vault.iconBg} flex items-center justify-center mr-3 relative vault-icon overflow-hidden`}>
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
        <div className="backdrop-blur-sm p-2 rounded">
          <div className="text-xs text-white/60">Allocation</div>
          <div className="font-semibold font-mono">{vault.allocation}</div>
        </div>
        
        <div className="backdrop-blur-sm p-2 rounded">
          <div className="text-xs text-white/60">Current APY</div>
          <div className="font-semibold text-green-400 font-mono">{vault.apy}</div>
        </div>
        
        <div className="backdrop-blur-sm p-2 rounded">
          <div className="text-xs text-white/60">30d Profit</div>
          <div className="font-semibold font-mono">{vault.profit}</div>
        </div>
        
        {/* Right section with buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="w-full bg-transparent border border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:border-white/40"
          >
            Manage
          </Button>
          <Button 
            className={`w-full ${styles.button} text-white flex items-center gap-2 transition-all duration-300 hover:shadow-lg`}
            onClick={() => onOpenDepositDialog(vault)}
          >
            <Wallet size={16} className="transition-transform duration-300 group-hover:scale-110" />
            <span>Deposit</span>
            <ChevronRight size={16} className="ml-auto transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VaultCard;
