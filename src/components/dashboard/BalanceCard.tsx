
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, TrendingDown, Wallet, CircleDollarSign } from 'lucide-react';
import { countUp, advancedGlow } from '@/lib/animations';

interface BalanceCardProps {
  initialInvestment: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  onDeposit: () => void;
  onWithdraw: () => void;
  colorAccent?: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  initialInvestment,
  currentValue,
  profitLoss,
  profitLossPercentage,
  onDeposit,
  onWithdraw,
  colorAccent = 'nova'
}) => {
  const isProfitable = profitLoss >= 0;
  
  const getVaultStyles = () => {
    switch (colorAccent) {
      case 'nova':
        return {
          border: 'border-nova/40',
          gradient: 'from-nova/20 via-nova/10 to-transparent',
          icon: 'bg-nova/30 text-nova',
          button: 'bg-gradient-to-r from-nova to-nova-dark hover:opacity-90',
          outline: 'border-nova/30 text-nova hover:bg-nova/10',
          primaryColor: '#F97316',
          secondaryColor: '#C2410C'
        };
      case 'orion':
        return {
          border: 'border-orion/40',
          gradient: 'from-orion/20 via-orion/10 to-transparent',
          icon: 'bg-orion/30 text-orion',
          button: 'bg-gradient-to-r from-orion to-orion-dark hover:opacity-90',
          outline: 'border-orion/30 text-orion hover:bg-orion/10',
          primaryColor: '#F59E0B',
          secondaryColor: '#B45309'
        };
      case 'aero':
        return {
          border: 'border-amber-500/40',
          gradient: 'from-amber-500/20 via-amber-500/10 to-transparent',
          icon: 'bg-amber-500/30 text-amber-500',
          button: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-90',
          outline: 'border-amber-500/30 text-amber-500 hover:bg-amber-500/10',
          primaryColor: '#D97706',
          secondaryColor: '#92400E'
        };
      default:
        return {
          border: 'border-white/20',
          gradient: 'from-white/10 via-white/5 to-transparent',
          icon: 'bg-white/20 text-white',
          button: 'bg-primary hover:bg-primary/90',
          outline: 'border-white/20 text-white hover:bg-white/10',
          primaryColor: '#FFFFFF',
          secondaryColor: '#CCCCCC'
        };
    }
  };

  const styles = getVaultStyles();

  // Apply animations when component mounts
  useEffect(() => {
    // Animate the balance number counting up
    const balanceElement = document.getElementById('current-balance');
    if (balanceElement) {
      countUp('#current-balance', currentValue, 1500);
    }

    // Apply glow effect to the icon
    const iconElement = document.querySelector('.balance-card-icon');
    if (iconElement) {
      advancedGlow(iconElement, styles.primaryColor, styles.secondaryColor);
    }
  }, [currentValue, styles.primaryColor, styles.secondaryColor]);
  
  return (
    <Card className={`relative overflow-hidden border backdrop-blur-xl ${styles.border} transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}>
      {/* Enhanced gradient background effect with animated overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient}`}></div>
      <div className={`absolute inset-0 opacity-5 bg-[url('/grid-pattern.svg')] bg-repeat`}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Account Balance</h3>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${styles.icon} balance-card-icon transition-transform duration-300 hover:scale-110`}>
            <CircleDollarSign className="w-5 h-5" />
          </div>
        </div>
        
        <div className="mb-6 space-y-1">
          <div id="current-balance" className="text-3xl font-bold font-mono" data-format="currency">
            {currentValue.toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <span className={`${isProfitable ? 'text-green-400' : 'text-red-400'} transition-colors duration-300`}>
              {isProfitable ? '+' : ''}{profitLoss.toLocaleString()} ({profitLossPercentage}%)
            </span>
            {isProfitable ? 
              <ArrowUpRight className="w-4 h-4 text-green-400 animate-pulse" /> : 
              <TrendingDown className="w-4 h-4 text-red-400 animate-pulse" />
            }
          </div>
          <div className="text-sm text-white/60">
            Initial investment: ${initialInvestment.toLocaleString()}
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            className={`w-full ${styles.button} text-white flex items-center gap-2 shadow-lg transition-all duration-300 hover:shadow-xl`}
            onClick={onDeposit}
          >
            <Wallet className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" /> 
            <span>Deposit</span>
          </Button>
          
          <Button 
            variant="outline" 
            className={`w-full bg-transparent ${styles.outline} transition-all duration-300`}
            onClick={onWithdraw}
          >
            Withdraw
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BalanceCard;
