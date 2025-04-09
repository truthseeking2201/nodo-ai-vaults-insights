
import React from 'react';
import { Sparkles, LineChart, TrendingUp } from 'lucide-react';

export interface VaultOption {
  id: string;
  name: string;
  type: string;
  icon: React.ReactNode;
  color: string;
  colorAccent?: string;
}

interface VaultSelectorProps {
  vaults: VaultOption[];
  selectedVault: VaultOption;
  onSelectVault: (vault: VaultOption) => void;
}

const VaultSelector: React.FC<VaultSelectorProps> = ({
  vaults,
  selectedVault,
  onSelectVault,
}) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="glass-panel px-2 py-2 rounded-full flex items-center space-x-3">
        {vaults.map((vault) => (
          <button
            key={vault.id}
            className={`flex items-center px-4 py-2 rounded-full transition-all ${
              selectedVault.id === vault.id
                ? `bg-gradient-to-r ${
                    vault.id === "vault-111"
                      ? "from-amber-500/90 to-amber-600/70"
                      : vault.id === "vault-502"
                      ? "from-orion/90 to-orion/70"
                      : "from-nova/90 to-nova/70"
                  } text-white shadow-lg`
                : "hover:bg-white/5"
            }`}
            onClick={() => onSelectVault(vault)}
          >
            <div
              className={`w-8 h-8 rounded-full ${vault.color} flex items-center justify-center mr-3`}
            >
              {vault.icon}
            </div>
            <div className="text-left">
              <div className="text-xs opacity-70">{vault.type}</div>
              <div className="font-medium">{vault.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VaultSelector;
