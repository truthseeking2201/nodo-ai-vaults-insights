
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-gradient">NODO AI</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/vaults" className="text-sm text-white/80 hover:text-white transition-colors">
            Vaults
          </Link>
          <Link to="/analytics" className="text-sm text-white/80 hover:text-white transition-colors">
            Analytics
          </Link>
          <Link to="/activity" className="text-sm text-white/80 hover:text-white transition-colors">
            Activity
          </Link>
          <Link to="/docs" className="text-sm text-white/80 hover:text-white transition-colors">
            Docs
          </Link>
        </div>

        <div className="hidden md:block">
          <Button 
            variant="outline"
            className="bg-transparent border border-nova hover:bg-nova/20 text-white transition-all duration-300"
          >
            Launch App
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-panel mt-2 mx-4 p-4 rounded-lg animate-scale-up">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/vaults" 
              className="py-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Vaults
            </Link>
            <Link 
              to="/analytics" 
              className="py-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link 
              to="/activity" 
              className="py-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Activity
            </Link>
            <Link 
              to="/docs" 
              className="py-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Docs
            </Link>
            <Button 
              variant="outline"
              className="w-full bg-transparent border border-nova hover:bg-nova/20 text-white transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Launch App
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
