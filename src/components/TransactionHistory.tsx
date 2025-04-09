
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowDownCircle, ArrowUpCircle, Search, Filter, Calendar, FileText, Download } from "lucide-react";

// Mock transaction data
const mockTransactions = [
  {
    id: "TXN-1234",
    date: "2025-04-09T10:30:00",
    type: "deposit",
    amount: 500,
    status: "completed",
    description: "Initial deposit"
  },
  {
    id: "TXN-1235",
    date: "2025-04-08T14:45:00",
    type: "withdrawal",
    amount: 100,
    status: "completed",
    description: "Fund withdrawal"
  },
  {
    id: "TXN-1236",
    date: "2025-04-07T09:15:00",
    type: "deposit",
    amount: 1000,
    status: "completed", 
    description: "Investment funding"
  },
  {
    id: "TXN-1237",
    date: "2025-04-06T16:20:00",
    type: "withdrawal",
    amount: 250,
    status: "pending",
    description: "Partial withdrawal"
  },
  {
    id: "TXN-1238",
    date: "2025-04-05T13:10:00",
    type: "deposit",
    amount: 750,
    status: "processing",
    description: "Additional investment"
  }
];

interface Transaction {
  id: string;
  date: string;
  type: "deposit" | "withdrawal";
  amount: number;
  status: "completed" | "pending" | "processing" | "failed";
  description: string;
}

const TransactionHistory = () => {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [filter, setFilter] = useState<"all" | "deposits" | "withdrawals">("all");

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === "all") return true;
    if (filter === "deposits") return transaction.type === "deposit";
    if (filter === "withdrawals") return transaction.type === "withdrawal";
    return true;
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="pl-9 h-10 w-full sm:w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" /> Date Range
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 px-4 py-3">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filter === "all" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Transactions
            </button>
            <button
              onClick={() => setFilter("deposits")}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filter === "deposits" ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Deposits
            </button>
            <button
              onClick={() => setFilter("withdrawals")}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filter === "withdrawals" ? "bg-red-100 text-red-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Withdrawals
            </button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {transaction.type === "deposit" ? (
                        <ArrowDownCircle className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <ArrowUpCircle className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span className="capitalize">{transaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className={`${
                    transaction.type === "deposit" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No transactions found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Transaction Detail Dialog */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Complete information about this transaction.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-center mb-4">
                <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
                  selectedTransaction.type === "deposit" ? "bg-green-100" : "bg-red-100"
                }`}>
                  {selectedTransaction.type === "deposit" ? (
                    <ArrowDownCircle className="h-8 w-8 text-green-600" />
                  ) : (
                    <ArrowUpCircle className="h-8 w-8 text-red-600" />
                  )}
                </div>
              </div>
              
              <h3 className="text-center text-lg font-medium text-gray-900">
                {selectedTransaction.type === "deposit" ? "+" : "-"}${selectedTransaction.amount.toFixed(2)}
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium">{selectedTransaction.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium">{formatDate(selectedTransaction.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{selectedTransaction.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTransaction.status)}`}>
                    {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Description:</span>
                  <span className="font-medium">{selectedTransaction.description}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-6">
                      <div className="relative">
                        <div className="h-2 w-2 rounded-full bg-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="h-6 w-6 rounded-full border-2 border-green-600"></div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">Transaction Initiated</p>
                      <p className="text-xs text-gray-500">{formatDate(selectedTransaction.date)}</p>
                    </div>
                  </div>
                  
                  {selectedTransaction.status !== "pending" && (
                    <div className="flex items-start">
                      <div className="flex items-center h-6">
                        <div className="relative">
                          <div className="h-2 w-2 rounded-full bg-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          <div className="h-6 w-6 rounded-full border-2 border-blue-600"></div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">Processing</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(new Date(new Date(selectedTransaction.date).getTime() + 1000 * 60 * 10).toISOString())}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {selectedTransaction.status === "completed" && (
                    <div className="flex items-start">
                      <div className="flex items-center h-6">
                        <div className="relative">
                          <div className="h-2 w-2 rounded-full bg-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          <div className="h-6 w-6 rounded-full border-2 border-green-600"></div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">Completed</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(new Date(new Date(selectedTransaction.date).getTime() + 1000 * 60 * 30).toISOString())}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center pt-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" /> Download Receipt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionHistory;
