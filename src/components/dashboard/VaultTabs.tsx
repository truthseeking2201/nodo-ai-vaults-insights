import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { VaultOption } from '../vaults/VaultSelector';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Info, ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apply3DEffect, fadeIn, staggerFadeIn } from '@/lib/animations';

const vaults: VaultOption[] = [
  {
    id: "vault-111",
    name: "Quantum Nexus",
    type: "Yield Optimization",
    icon: <div className="w-4 h-4 bg-amber-500 rounded-full"></div>,
    color: "bg-amber-500/20",
    colorAccent: "aero",
    status: "active",
    securityScore: 98,
    lastAudit: "March 15, 2025",
    performanceRating: "A+",
    riskLevel: "Low"
  },
  {
    id: "vault-502",
    name: "Orion Protocol",
    type: "AI Analyst",
    icon: <div className="w-4 h-4 bg-orion rounded-full"></div>,
    color: "bg-orion/20",
    colorAccent: "orion",
    status: "active",
    securityScore: 95,
    lastAudit: "January 22, 2025",
    performanceRating: "A",
    riskLevel: "Medium"
  },
  {
    id: "vault-309",
    name: "Nova Strategy",
    type: "Market Maker",
    icon: <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>,
    color: "bg-emerald-500/20",
    colorAccent: "emerald",
    status: "maintenance",
    securityScore: 92,
    lastAudit: "February 5, 2025",
    performanceRating: "B+",
    riskLevel: "High"
  }
];

interface VaultTabsProps {
  selectedVault: VaultOption;
  onSelectVault: (vault: VaultOption) => void;
}

export function VaultTabs({ selectedVault, onSelectVault }: VaultTabsProps) {
  const [hoveredVault, setHoveredVault] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const tabsElement = document.querySelector('.tabs-container');
    if (tabsElement) {
      fadeIn(tabsElement, 800);
    }
    
    const contentElements = document.querySelectorAll('.tab-content');
    if (contentElements.length > 0) {
      staggerFadeIn(contentElements, 100);
    }
    
    const detailsCards = document.querySelectorAll('.vault-details-card');
    detailsCards.forEach(card => {
      apply3DEffect(card, 5);
    });
  }, []);

  const handleInfoClick = (vaultId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const vault = vaults.find(v => v.id === vaultId);
    
    if (vault) {
      toast({
        title: `${vault.name} Details`,
        description: (
          <div className="space-y-2 pt-1">
            <div className="flex justify-between">
              <span className="text-sm text-white/80">Risk Level:</span>
              <span className={`text-sm font-medium ${getRiskColor(vault.riskLevel as string)}`}>{vault.riskLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/80">Security Score:</span>
              <span className="text-sm font-medium">{vault.securityScore}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/80">Last Audit:</span>
              <span className="text-sm font-medium">{vault.lastAudit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/80">Performance:</span>
              <span className={`text-sm font-medium ${getPerformanceColor(vault.performanceRating as string)}`}>
                {vault.performanceRating}
              </span>
            </div>
          </div>
        ),
        variant: "default",
      });
    }
  };

  const getVaultColors = (vaultId: string, colorAccent: string) => {
    switch (colorAccent) {
      case 'nova':
        return {
          activeGradient: "from-nova/90 to-nova-dark/80",
          activeBorder: "border-nova",
          hoverBg: "bg-nova/10",
          glowColor: "shadow-neon-nova"
        };
      case 'orion':
        return {
          activeGradient: "from-orion/90 to-orion-dark/80",
          activeBorder: "border-orion",
          hoverBg: "bg-orion/10",
          glowColor: "shadow-neon-orion"
        };
      case 'aero':
        return {
          activeGradient: "from-amber-500/90 to-amber-600/80",
          activeBorder: "border-amber-500",
          hoverBg: "bg-amber-500/10",
          glowColor: "shadow-neon-aero"
        };
      case 'emerald':
        return {
          activeGradient: "from-emerald-500/90 to-emerald-600/80",
          activeBorder: "border-emerald-500",
          hoverBg: "bg-emerald-500/10",
          glowColor: "shadow-neon-emerald"
        };
      default:
        return {
          activeGradient: "from-white/10 to-white/5",
          activeBorder: "border-white/20",
          hoverBg: "bg-white/5",
          glowColor: ""
        };
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 text-xs ml-2">
            Active
          </Badge>
        );
      case "maintenance":
        return (
          <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 text-xs ml-2 animate-pulse">
            Maintenance
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-emerald-400";
      case "Medium":
        return "text-amber-400";
      case "High":
        return "text-red-400";
      default:
        return "";
    }
  };
  
  const getPerformanceColor = (performance: string) => {
    if (performance.startsWith("A")) return "text-emerald-400";
    if (performance.startsWith("B")) return "text-amber-400";
    if (performance.startsWith("C")) return "text-yellow-400";
    return "text-red-400";
  };

  const handleMouseEnter = (vaultId: string) => {
    setHoveredVault(vaultId);
  };
  
  const handleMouseLeave = () => {
    setHoveredVault(null);
  };

  return (
    <Tabs value={selectedVault.id} className="w-full tabs-container">
      <TabsList className="grid grid-cols-3 mb-8 p-1 bg-white/5 backdrop-blur-md rounded-xl">
        {vaults.map((vault) => {
          const colors = getVaultColors(vault.id, vault.colorAccent || '');
          return (
            <TabsTrigger
              key={vault.id}
              value={vault.id}
              onClick={() => onSelectVault(vault)}
              onMouseEnter={() => handleMouseEnter(vault.id)}
              onMouseLeave={handleMouseLeave}
              className={`relative group transition-all duration-300 overflow-hidden rounded-lg ${
                selectedVault.id === vault.id 
                  ? `bg-gradient-to-r ${colors.activeGradient} border ${colors.activeBorder} ${colors.glowColor}` 
                  : `border border-transparent hover:${colors.hoverBg} hover:border-white/10`
              }`}
            >
              <div className="flex items-center gap-2 relative z-10">
                <span className={`w-3 h-3 rounded-full ${vault.color.replace('/20', '')} transition-transform duration-300 group-hover:scale-125`}></span>
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    <span className="font-medium">{vault.name}</span>
                    {getStatusIndicator(vault.status as string)}
                  </div>
                  <span className="text-xs opacity-70 text-left">{vault.type}</span>
                </div>
              </div>
              
              {hoveredVault === vault.id && (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-transparent hover:bg-white/10" 
                    onClick={(e) => handleInfoClick(vault.id, e)}
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 animate-slide-right"></div>
                </>
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {vaults.map((vault) => {
        const colors = getVaultColors(vault.id, vault.colorAccent || '');
        return (
          <TabsContent key={vault.id} value={vault.id} className="tab-content space-y-6">
            <div className="vault-details-card rounded-lg border border-white/10 p-6 bg-gradient-to-br from-black/40 to-black/10 backdrop-blur-lg transition-all duration-300 hover:border-white/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-12 h-12 rounded-full ${vault.color} flex items-center justify-center ${colors.glowColor} transition-transform duration-300 hover:scale-110`}>
                  <div className="w-6 h-6 bg-gradient-to-br from-white/80 to-white/40 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold flex items-center">
                    {vault.name}
                    {vault.status === "active" ? (
                      <ShieldCheck className="ml-2 w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="ml-2 w-4 h-4 text-amber-400" />
                    )}
                  </h3>
                  <p className="text-sm opacity-70">{vault.type}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col p-3 bg-white/5 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  <span className="text-xs opacity-60 mb-1">Risk Level</span>
                  <span className={`font-medium ${getRiskColor(vault.riskLevel as string)}`}>
                    {vault.riskLevel}
                  </span>
                  
                  <div className="mt-3 relative h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full ${
                        vault.riskLevel === "Low" ? "bg-emerald-500" : 
                        vault.riskLevel === "Medium" ? "bg-amber-500" : "bg-red-500"
                      }`}
                      style={{ width: `${vault.riskLevel === "Low" ? 30 : vault.riskLevel === "Medium" ? 60 : 90}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex flex-col p-3 bg-white/5 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  <span className="text-xs opacity-60 mb-1">Performance Rating</span>
                  <span className={`font-medium ${getPerformanceColor(vault.performanceRating as string)}`}>
                    {vault.performanceRating}
                  </span>
                  
                  <div className="mt-2 flex">
                    {["A+", "A", "A-"].includes(vault.performanceRating as string) ? (
                      <>
                        <span className="text-yellow-400">★★★★★</span>
                      </>
                    ) : ["B+", "B", "B-"].includes(vault.performanceRating as string) ? (
                      <>
                        <span className="text-yellow-400">★★★★</span>
                        <span className="text-white/20">★</span>
                      </>
                    ) : (
                      <>
                        <span className="text-yellow-400">★★★</span>
                        <span className="text-white/20">★★</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col p-3 bg-white/5 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  <span className="text-xs opacity-60 mb-1">Security Score</span>
                  <div className="flex items-center">
                    <span className="font-medium">{vault.securityScore}/100</span>
                  </div>
                  
                  <div className="mt-3 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${vault.securityScore > 95 ? 'bg-emerald-500' : 'bg-amber-500'} transition-all duration-1000 ease-out`}
                      style={{ width: `${vault.securityScore}%` }}
                    ></div>
                  </div>
                  <span className="text-xs mt-1 text-white/60">Last audit: {vault.lastAudit}</span>
                </div>
              </div>
              
              <Button 
                className={`mt-6 bg-gradient-to-r ${colors.activeGradient} hover:opacity-90 transition-opacity shadow-lg text-white`}
                size="sm"
              >
                <TrendingUp className="mr-2 h-3 w-3" /> View Performance
              </Button>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default VaultTabs;
