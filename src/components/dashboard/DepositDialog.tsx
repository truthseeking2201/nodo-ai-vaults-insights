
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CircleDollarSign, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from '@/components/ui/label';
import { Card } from "@/components/ui/card";

interface DepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedVault: any;
  primaryColor: string;
  onSubmit: (values: any) => void;
  vaults?: any[]; // Added vaults array for switching
  onVaultChange?: (vaultId: string) => void; // Added handler for vault switching
}

const DepositDialog: React.FC<DepositDialogProps> = ({ 
  open, 
  onOpenChange, 
  selectedVault, 
  primaryColor, 
  onSubmit,
  vaults = [],
  onVaultChange
}) => {
  const form = useForm({
    defaultValues: {
      amount: "",
    },
  });

  if (!selectedVault) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-nodo-darker border border-white/10 text-white glass-card animate-in fade-in-0 zoom-in-95 duration-300">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${selectedVault.color} flex items-center justify-center relative group`}>
              {selectedVault.icon}
              <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300"></span>
            </div>
            <DialogTitle className="group">
              Deposit to <span className="group-hover:text-gradient-nova transition-all duration-300">{selectedVault.name}</span>
            </DialogTitle>
          </div>
          <DialogDescription className="text-white/70">
            Make a deposit to start earning <span className="text-green-400 font-semibold">{selectedVault.apy}</span> APY
          </DialogDescription>
        </DialogHeader>
        
        {vaults.length > 0 && onVaultChange && (
          <div className="mb-4 animate-in fade-in-50 slide-in-from-bottom-5 duration-300 delay-150">
            <Label className="text-sm font-medium mb-2 block">Select a Vault</Label>
            <div className="grid grid-cols-1 gap-3">
              {vaults.map((vault, index) => (
                <Card
                  key={vault.id}
                  className={`p-3 border cursor-pointer transition-all duration-300 card-hover-effect ${
                    selectedVault.id === vault.id 
                      ? `bg-${vault.colorAccent}/20 border-${vault.colorAccent}/50` 
                      : 'bg-nodo-dark border-white/10 hover:bg-white/5'
                  }`}
                  onClick={() => onVaultChange(vault.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${vault.color} flex items-center justify-center relative`}>
                        {vault.icon}
                        <span className={`absolute inset-0 rounded-full bg-${vault.colorAccent}/20 opacity-0 hover:opacity-100 scale-0 hover:scale-100 transition-all duration-300`}></span>
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-white transition-colors duration-300">{vault.name}</p>
                        <p className="text-xs text-white/60">{vault.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-400">{vault.apy}</p>
                      <p className="text-xs text-white/60">APY</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-300 delay-300">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (USDC)</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="0.00"
                        className="bg-nodo-dark border-white/20 text-white pl-8 focus:border-white/40 focus:ring focus:ring-white/10 transition-all duration-300"
                        {...field}
                      />
                    </FormControl>
                    <CircleDollarSign className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
                  </div>
                  <FormDescription className="text-white/60 flex justify-between">
                    <span>Available: 125,000 USDC</span>
                    <button 
                      type="button" 
                      className="text-xs text-white hover:text-nova transition-colors duration-300"
                      onClick={() => form.setValue('amount', '125000')}
                    >
                      MAX
                    </button>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between text-sm text-white/70 p-3 bg-white/5 rounded-lg">
              <span>Estimated APY:</span>
              <span className="text-green-400 font-semibold relative group">
                {selectedVault.apy}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-green-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)} 
                className="bg-transparent border-white/20 text-white hover:bg-white/10 relative overflow-hidden group"
              >
                <span className="relative z-10">Cancel</span>
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
              <Button 
                type="submit" 
                className={`bg-${primaryColor || 'nova'} relative group overflow-hidden`}
              >
                <span className="relative z-10 flex items-center gap-1">
                  Confirm Deposit
                  <ChevronRight size={16} className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DepositDialog;
