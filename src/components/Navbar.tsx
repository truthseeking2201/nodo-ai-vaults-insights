
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, LineChart, Activity, Wallet, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="px-6 md:px-12 py-4 backdrop-blur-md bg-nodo-darker/80 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-white">
              NODO
              <span className="text-nova ml-0.5">AI</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/vaults"
              className={cn(
                "text-sm transition-colors hover:text-nova",
                isActive("/vaults") ? "text-nova" : "text-white/70"
              )}
            >
              Vaults
            </Link>
            <Link 
              to="/analytics"
              className={cn(
                "text-sm transition-colors hover:text-nova",
                isActive("/analytics") ? "text-nova" : "text-white/70"
              )}
            >
              Analytics
            </Link>
            <Link 
              to="/activity"
              className={cn(
                "text-sm transition-colors hover:text-nova",
                isActive("/activity") ? "text-nova" : "text-white/70"
              )}
            >
              Activity
            </Link>
            <Link 
              to="/dashboard"
              className={cn(
                "text-sm transition-colors hover:text-nova",
                isActive("/dashboard") ? "text-nova" : "text-white/70"
              )}
            >
              Dashboard
            </Link>
            <Link 
              to="/transactions"
              className={cn(
                "text-sm transition-colors hover:text-nova",
                isActive("/transactions") ? "text-nova" : "text-white/70"
              )}
            >
              Transactions
            </Link>
            <a 
              href="#"
              className="text-sm text-white/70 transition-colors hover:text-nova"
            >
              Docs
            </a>
          </div>
          
          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-nova hover:bg-nova/90 text-white">
              Launch App
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              className="text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-nodo-darker/95 backdrop-blur-md p-6 lg:hidden z-40">
          <div className="flex flex-col space-y-6">
            <Link 
              to="/vaults"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-lg text-white hover:text-nova transition-colors"
            >
              <LineChart size={20} />
              <span>Vaults</span>
            </Link>
            <Link 
              to="/analytics"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-lg text-white hover:text-nova transition-colors"
            >
              <LineChart size={20} />
              <span>Analytics</span>
            </Link>
            <Link 
              to="/activity"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-lg text-white hover:text-nova transition-colors"
            >
              <Activity size={20} />
              <span>Activity</span>
            </Link>
            <Link 
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-lg text-white hover:text-nova transition-colors"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/transactions"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-lg text-white hover:text-nova transition-colors"
            >
              <Wallet size={20} />
              <span>Transactions</span>
            </Link>
            <a 
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-lg text-white hover:text-nova transition-colors"
            >
              <span>Docs</span>
            </a>
            <div className="pt-6">
              <Button className="w-full bg-nova hover:bg-nova/90 text-white">
                Launch App
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
