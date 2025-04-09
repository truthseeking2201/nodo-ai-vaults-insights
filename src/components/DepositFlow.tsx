
import { useState } from "react";
import { Check, ArrowRight, X, Wallet, Clock, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

type Step = "amount" | "review" | "processing" | "complete";

interface DepositFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

const DepositFlow = ({ isOpen, onClose }: DepositFlowProps) => {
  const [currentStep, setCurrentStep] = useState<Step>("amount");
  const [amount, setAmount] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep === "amount") {
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        toast({
          title: "Invalid Amount",
          description: "Please enter a valid deposit amount.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep("review");
    } else if (currentStep === "review") {
      setCurrentStep("processing");
      simulateProcessing();
    }
  };

  const simulateProcessing = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentStep("complete"), 500);
          return 100;
        }
        return newProgress;
      });
    }, 800);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep("amount");
      setAmount("");
      setProgress(0);
    }, 300);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {["amount", "review", "processing", "complete"].map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === currentStep 
              ? "bg-blue-600 text-white" 
              : ["processing", "complete"].includes(currentStep) && index <= 2 || currentStep === "complete" && index <= 3 
                ? "bg-green-600 text-white" 
                : "bg-gray-200 text-gray-700"
          }`}>
            {["processing", "complete"].includes(currentStep) && index <= 1 || currentStep === "complete" && index <= 2 ? (
              <Check className="w-4 h-4" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          {index < 3 && (
            <div className={`w-12 h-1 ${
              ["processing", "complete"].includes(currentStep) && index <= 1 || currentStep === "complete" && index <= 2 
                ? "bg-green-600" 
                : "bg-gray-200"
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (currentStep) {
      case "amount":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Make a Deposit</DialogTitle>
              <DialogDescription>
                Enter the amount you would like to deposit into your account.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Deposit Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Select</h4>
                <div className="grid grid-cols-3 gap-2">
                  {["100", "250", "500"].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmount(value)}
                      className={`py-2 px-4 border rounded-md text-sm ${
                        amount === value
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      ${value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleNext}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        );
      
      case "review":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Review Your Deposit</DialogTitle>
              <DialogDescription>
                Please review the details of your deposit before continuing.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Amount:</span>
                  <span className="text-lg font-medium">${parseFloat(amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Fee:</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="font-medium">Total:</span>
                  <span className="text-lg font-bold">${parseFloat(amount).toFixed(2)}</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Payment Method</h4>
                <div className="border border-gray-300 rounded-md p-3 flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="font-medium">Bank Account (ACH)</p>
                    <p className="text-sm text-gray-500">Account ending in 4789</p>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setCurrentStep("amount")}>
                Back
              </Button>
              <Button onClick={handleNext}>
                Confirm Deposit
              </Button>
            </DialogFooter>
          </>
        );
      
      case "processing":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Processing Your Deposit</DialogTitle>
              <DialogDescription>
                Please wait while we process your deposit...
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-10 flex flex-col items-center">
              <Clock className="h-16 w-16 text-blue-600 animate-pulse mb-4" />
              <Progress value={progress} className="w-full h-2 mb-2" />
              <p className="text-sm text-gray-600">{progress}% complete</p>
            </div>
          </>
        );
      
      case "complete":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Deposit Successful!</DialogTitle>
              <DialogDescription>
                Your deposit has been successfully processed.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-8 flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                ${parseFloat(amount).toFixed(2)} Deposited
              </h3>
              <p className="text-gray-500 mb-4">
                Transaction ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
              </p>
              <div className="bg-blue-50 p-4 rounded-lg w-full">
                <h4 className="font-medium text-blue-700 mb-2">Next Steps:</h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    Your funds will be available within 1-3 business days
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    You can track this transaction in your Activity section
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    Consider exploring investment opportunities for your funds
                  </li>
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={() => {
                handleClose();
                // This would navigate to transactions in a real app
                document.querySelector('button[data-tab="transactions"]')?.click();
              }}>
                View Transactions
              </Button>
            </DialogFooter>
          </>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        {renderStepIndicator()}
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default DepositFlow;
