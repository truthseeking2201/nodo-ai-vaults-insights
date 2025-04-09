
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DepositFlow from "@/components/DepositFlow";
import TransactionHistory from "@/components/TransactionHistory";

const Index = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "transactions">("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">Finance Dashboard</h1>
            <nav className="flex space-x-4">
              <button 
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === "dashboard" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </button>
              <button 
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === "transactions" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => setActiveTab("transactions")}
              >
                Transactions
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" ? (
          <div className="space-y-8">
            {/* Account Summary */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Account Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-700">Total Balance</p>
                  <p className="text-2xl font-bold">$10,250.00</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-700">Total Earnings</p>
                  <p className="text-2xl font-bold">$850.75</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-purple-700">Active Investments</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => setIsDepositModalOpen(true)}>Make a Deposit</Button>
                <Button variant="outline">Withdraw Funds</Button>
                <Button variant="outline">View Investment Opportunities</Button>
              </div>
            </div>
          </div>
        ) : (
          <TransactionHistory />
        )}
      </main>

      <DepositFlow 
        isOpen={isDepositModalOpen} 
        onClose={() => setIsDepositModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
