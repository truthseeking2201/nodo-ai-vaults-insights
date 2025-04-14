
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
  
  return (
    <Card className={`relative overflow-hidden border ${
      colorAccent === 'nova' ? 'border-nova/30' :
      colorAccent === 'orion' ? 'border-orion/30' :
      colorAccent === 'aero' ? 'border-amber-500/30' :
      'border-white/10'
    }`}>
      {/* Gradient background effect */}
      <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${
        colorAccent === 'nova' ? 'from-nova/20 to-transparent' :
        colorAccent === 'orion' ? 'from-orion/20 to-transparent' :
        colorAccent === 'aero' ? 'from-amber-500/20 to-transparent' :
        'from-white/10 to-transparent'
      }`}></div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Account Balance</h3>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            colorAccent === 'nova' ? 'bg-nova/20' :
            colorAccent === 'orion' ? 'bg-orion/20' :
            colorAccent === 'aero' ? 'bg-amber-500/20' :
            'bg-white/10'
          }`}>
            <CircleDollarSign className={`w-5 h-5 ${
              colorAccent === 'nova' ? 'text-nova' :
              colorAccent === 'orion' ? 'text-orion' :
              colorAccent === 'aero' ? 'text-amber-500' :
              'text-white'
            }`} />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="text-3xl font-bold">${currentValue.toLocaleString()}</div>
          <div className="flex items-center gap-1 mt-1">
            <span className={isProfitable ? 'text-green-400' : 'text-red-400'}>
              {isProfitable ? '+' : ''}{profitLoss.toLocaleString()} ({profitLossPercentage}%)
            </span>
            {isProfitable ? 
              <ArrowUpRight className="w-4 h-4 text-green-400" /> : 
              <TrendingDown className="w-4 h-4 text-red-400" />
            }
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            className={`w-full ${
              colorAccent === 'nova' ? 'bg-nova hover:bg-nova/90' :
              colorAccent === 'orion' ? 'bg-orion hover:bg-orion/90' :
              colorAccent === 'aero' ? 'bg-amber-500 hover:bg-amber-600' :
              'bg-primary hover:bg-primary/90'
            } text-white flex items-center gap-2`}
            onClick={onDeposit}
          >
            <Wallet className="w-4 h-4" /> Deposit
          </Button>
          
          <Button 
            variant="outline" 
            className={`w-full border ${
              colorAccent === 'nova' ? 'border-nova/30 text-nova hover:bg-nova/10' :
              colorAccent === 'orion' ? 'border-orion/30 text-orion hover:bg-orion/10' :
              colorAccent === 'aero' ? 'border-amber-500/30 text-amber-500 hover:bg-amber-500/10' :
              'border-white/20 text-white hover:bg-white/10'
            } bg-transparent`}
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
