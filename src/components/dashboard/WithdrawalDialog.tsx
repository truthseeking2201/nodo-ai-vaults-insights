
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vault: {
    name: string;
    icon: React.ReactNode;
    iconBg: string;
  };
  userBalance: number;
  colorAccent?: string;
}

const WithdrawalDialog: React.FC<WithdrawalDialogProps> = ({
  open,
  onOpenChange,
  vault,
  userBalance,
  colorAccent = 'nova'
}) => {
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);
  const [percentageToWithdraw, setPercentageToWithdraw] = useState<number>(0);
  const { toast } = useToast();
  
  const handleWithdrawal = () => {
    toast({
      title: "Withdrawal Initiated",
      description: `${withdrawalAmount.toLocaleString()} USDC withdrawal has been initiated.`,
      duration: 5000,
    });
    onOpenChange(false);
  };
  
  const handleSliderChange = (value: number[]) => {
    const percentage = value[0];
    setPercentageToWithdraw(percentage);
    setWithdrawalAmount((percentage / 100) * userBalance);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value) || 0;
    setWithdrawalAmount(amount);
    setPercentageToWithdraw((amount / userBalance) * 100);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-nodo-darker border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Withdraw from Vault</DialogTitle>
          <DialogDescription className="text-white/70">
            Choose how much you'd like to withdraw from {vault.name}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-4 my-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${vault.iconBg}`}>
            {vault.icon}
          </div>
          <div>
            <h3 className="font-medium">{vault.name}</h3>
            <p className="text-sm text-white/60">Available: {formatCurrency(userBalance)}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-white">Amount to withdraw</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                value={withdrawalAmount || ''}
                onChange={handleInputChange}
                className="bg-white/5 border-white/20 text-white"
                step="0.01"
                min="0"
                max={userBalance}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">USDC</span>
            </div>
            <div className="flex justify-between text-sm text-white/60">
              <span>0%</span>
              <span>100%</span>
            </div>
            <Slider 
              value={[percentageToWithdraw]} 
              max={100} 
              step={1}
              className={`${
                colorAccent === 'nova' ? '[&>span]:bg-nova' :
                colorAccent === 'orion' ? '[&>span]:bg-orion' :
                colorAccent === 'aero' ? '[&>span]:bg-amber-500' :
                '[&>span]:bg-white'
              }`}
              onValueChange={handleSliderChange} 
            />
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm flex items-center gap-1 text-white/70">
                <Info className="w-4 h-4" /> 
                <span>{percentageToWithdraw.toFixed(0)}% of balance</span>
              </div>
              <button
                onClick={() => handleSliderChange([100])}
                className={`text-xs ${
                  colorAccent === 'nova' ? 'text-nova' :
                  colorAccent === 'orion' ? 'text-orion' :
                  colorAccent === 'aero' ? 'text-amber-500' :
                  'text-white'
                }`}
              >
                Max
              </button>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-md p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Amount to receive</span>
              <span>{formatCurrency(withdrawalAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Estimated gas fee</span>
              <span>$0.52</span>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between flex-row">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)} 
            className="border-white/20 bg-transparent text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button 
            className={`${
              colorAccent === 'nova' ? 'bg-nova hover:bg-nova/90' :
              colorAccent === 'orion' ? 'bg-orion hover:bg-orion/90' :
              colorAccent === 'aero' ? 'bg-amber-500 hover:bg-amber-600' :
              'bg-white hover:bg-white/90'
            } text-white`}
            onClick={handleWithdrawal}
            disabled={withdrawalAmount <= 0}
          >
            Withdraw <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawalDialog;
