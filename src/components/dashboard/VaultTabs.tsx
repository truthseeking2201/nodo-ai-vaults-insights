
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VaultOption } from '../vaults/VaultSelector';

// Define the vault data structure
const vaults: VaultOption[] = [
  {
    id: "vault-111",
    name: "Quantum Nexus",
    type: "Yield Optimization",
    icon: <div className="w-4 h-4 bg-amber-500 rounded-full"></div>,
    color: "bg-amber-500/20"
  },
  {
    id: "vault-502",
    name: "Orion Protocol",
    type: "AI Analyst",
    icon: <div className="w-4 h-4 bg-orion rounded-full"></div>,
    color: "bg-orion/20"
  },
  {
    id: "vault-309",
    name: "Nova Strategy",
    type: "Market Maker",
    icon: <div className="w-4 h-4 bg-nova rounded-full"></div>,
    color: "bg-nova/20"
  }
];

interface VaultTabsProps {
  selectedVault: VaultOption;
  onSelectVault: (vault: VaultOption) => void;
}

export function VaultTabs({ selectedVault, onSelectVault }: VaultTabsProps) {
  return (
    <Tabs value={selectedVault.id} className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        {vaults.map((vault) => (
          <TabsTrigger
            key={vault.id}
            value={vault.id}
            onClick={() => onSelectVault(vault)}
            className="data-[state=active]:bg-white/10"
          >
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${vault.color.replace('/20', '')}`}></span>
              {vault.name}
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default VaultTabs;
