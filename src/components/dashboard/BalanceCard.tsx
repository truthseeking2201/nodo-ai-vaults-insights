
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, TrendingDown, Wallet, CircleDollarSign } from 'lucide-react';

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
          border: 'border-nova/30',
          gradient: 'from-nova/20 via-nova/10 to-transparent',
          icon: 'bg-nova/20 text-nova',
          button: 'bg-nova hover:bg-nova/90',
          outline: 'border-nova/30 text-nova hover:bg-nova/10'
        };
      case 'orion':
        return {
          border: 'border-orion/30',
          gradient: 'from-orion/20 via-orion/10 to-transparent',
          icon: 'bg-orion/20 text-orion',
          button: 'bg-orion hover:bg-orion/90',
          outline: 'border-orion/30 text-orion hover:bg-orion/10'
        };
      case 'aero':
        return {
          border: 'border-amber-500/30',
          gradient: 'from-amber-500/20 via-amber-500/10 to-transparent',
          icon: 'bg-amber-500/20 text-amber-500',
          button: 'bg-amber-500 hover:bg-amber-600',
          outline: 'border-amber-500/30 text-amber-500 hover:bg-amber-500/10'
        };
      default:
        return {
          border: 'border-white/10',
          gradient: 'from-white/10 via-white/5 to-transparent',
          icon: 'bg-white/10 text-white',
          button: 'bg-primary hover:bg-primary/90',
          outline: 'border-white/20 text-white hover:bg-white/10'
        };
    }
  };

  const styles = getVaultStyles();
  
  return (
    <Card className={`relative overflow-hidden border ${styles.border}`}>
      {/* Enhanced gradient background effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient}`}></div>
      <div className={`absolute inset-0 opacity-5 bg-[url('/grid-pattern.svg')] bg-repeat`}></div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Account Balance</h3>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${styles.icon}`}>
            <CircleDollarSign className="w-5 h-5" />
          </div>
        </div>
        
        <div className="mb-6 space-y-1">
          <div className="text-3xl font-bold">${currentValue.toLocaleString()}</div>
          <div className="flex items-center gap-2">
            <span className={isProfitable ? 'text-green-400' : 'text-red-400'}>
              {isProfitable ? '+' : ''}{profitLoss.toLocaleString()} ({profitLossPercentage}%)
            </span>
            {isProfitable ? 
              <ArrowUpRight className="w-4 h-4 text-green-400" /> : 
              <TrendingDown className="w-4 h-4 text-red-400" />
            }
          </div>
          <div className="text-sm text-white/60">
            Initial investment: ${initialInvestment.toLocaleString()}
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            className={`w-full ${styles.button} text-white flex items-center gap-2`}
            onClick={onDeposit}
          >
            <Wallet className="w-4 h-4" /> Deposit
          </Button>
          
          <Button 
            variant="outline" 
            className={`w-full bg-transparent ${styles.outline}`}
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
