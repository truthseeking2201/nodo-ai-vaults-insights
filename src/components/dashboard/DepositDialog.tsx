
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CircleDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <DialogContent className="sm:max-w-[425px] bg-nodo-darker border border-white/10 text-white">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${selectedVault.color} flex items-center justify-center`}>
              {selectedVault.icon}
            </div>
            <DialogTitle>Deposit to {selectedVault.name}</DialogTitle>
          </div>
          <DialogDescription className="text-white/70">
            Make a deposit to start earning {selectedVault.apy} APY
          </DialogDescription>
        </DialogHeader>
        
        {vaults.length > 0 && onVaultChange && (
          <div className="mb-4">
            <FormLabel>Select Vault</FormLabel>
            <Select
              value={selectedVault.id}
              onValueChange={onVaultChange}
            >
              <SelectTrigger className="bg-nodo-dark border-white/20 text-white">
                <SelectValue placeholder="Select a vault" />
              </SelectTrigger>
              <SelectContent className="bg-nodo-darker border-white/10 text-white">
                {vaults.map((vault) => (
                  <SelectItem 
                    key={vault.id} 
                    value={vault.id}
                    className="hover:bg-white/10 focus:bg-white/10 text-white"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${vault.color} flex items-center justify-center`}></div>
                      <span>{vault.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        className="bg-nodo-dark border-white/20 text-white pl-8"
                        {...field}
                      />
                    </FormControl>
                    <CircleDollarSign className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
                  </div>
                  <FormDescription className="text-white/60">
                    Available: 125,000 USDC
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between text-sm text-white/70">
              <span>Estimated APY:</span>
              <span className="text-green-400">{selectedVault.apy}</span>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-white/20 text-white">
                Cancel
              </Button>
              <Button type="submit" className={`bg-${primaryColor || 'nova'}`}>
                Confirm Deposit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DepositDialog;
