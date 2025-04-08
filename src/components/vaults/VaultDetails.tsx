
import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowRight, GaugeCircle } from 'lucide-react';

interface VaultDetailsProps {
  vault: any;
}

const VaultDetails: React.FC<VaultDetailsProps> = ({ vault }) => {
  // Generate sample performance data for the chart
  const generateChartData = () => {
    const days = 10;
    const data = [];
    let value = 100;
    
    for (let i = 0; i < days; i++) {
      value = value + (Math.random() * 0.5) - 0.1;
      data.push({
        day: i,
        value: value.toFixed(2)
      });
    }
    
    return data;
  };
  
  const chartData = generateChartData();
  const minValue = Math.min(...chartData.map(d => parseFloat(d.value))) - 0.5;
  const maxValue = Math.max(...chartData.map(d => parseFloat(d.value))) + 0.5;

  return (
    <div>
      {/* Overview Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">overview</h2>
        <p className="text-white/80 max-w-4xl">
          {vault.description}
        </p>
      </div>
      
      {/* Performance Chart */}
      <Card className="glass-card p-8 rounded-xl border border-white/10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 mb-6">
          <div>
            <div className="text-sm text-white/60 mb-1">NAV</div>
            <div className="text-2xl font-bold font-mono text-aero">{vault.nav}</div>
          </div>
          <div>
            <div className="text-sm text-white/60 mb-1">TVL</div>
            <div className="text-2xl font-bold font-mono">{vault.tvl}</div>
          </div>
          <div>
            <div className="text-sm text-white/60 mb-1">inception</div>
            <div className="text-lg font-mono">{vault.inception}</div>
          </div>
        </div>
        
        {/* Chart */}
        <div className="h-60 relative">
          {/* Chart Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-white/40 font-mono">
            {Array.from({ length: 6 }).map((_, i) => {
              const value = minValue + ((maxValue - minValue) / 5) * i;
              return (
                <div key={i} className="py-1">
                  ${value.toFixed(2)}
                </div>
              );
            })}
          </div>
          
          {/* Chart area */}
          <div className="absolute left-16 right-0 top-0 bottom-0">
            {/* Horizontal grid lines */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute w-full border-t border-white/5"
                style={{ top: `${100 - (i * 20)}%` }}
              ></div>
            ))}
            
            {/* Path for the chart */}
            <svg className="w-full h-full overflow-visible">
              <path
                d={`M ${chartData.map((point, i) => 
                  `${(i / (chartData.length - 1)) * 100}% ${100 - ((parseFloat(point.value) - minValue) / (maxValue - minValue)) * 100}%`
                ).join(' L ')}`}
                fill="none"
                stroke={vault.chartColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-white/40 font-mono">
              {chartData.map((point, i) => {
                // Only show some labels to avoid overcrowding
                if (i % 2 === 0 || i === chartData.length - 1) {
                  return (
                    <div key={i}>
                      {i + 1} Apr
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </Card>
      
      {/* Technical Details Section */}
      <h2 className="text-2xl font-bold text-white mb-4">technical details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {/* Risk Rating */}
        <Card className="glass-card p-6 rounded-xl border border-white/10 h-full">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <GaugeCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-white/80">risk rating</span>
          </div>
          
          <div className="relative h-24 flex items-center justify-center">
            <div className="w-full h-3 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
            <div 
              className={`absolute w-5 h-5 rounded-full bg-white shadow-lg`}
              style={{ 
                left: vault.risk === "Low" ? "15%" : 
                      vault.risk === "Medium" ? "50%" : "85%" 
              }}
            ></div>
            <span 
              className="absolute -bottom-6 text-sm font-medium"
              style={{ 
                left: vault.risk === "Low" ? "15%" : 
                      vault.risk === "Medium" ? "50%" : "85%",
                transform: "translateX(-50%)"
              }}
            >
              {vault.risk}
            </span>
          </div>
        </Card>
        
        {/* Portfolio */}
        <Card className="glass-card p-6 rounded-xl border border-white/10 h-full">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              {vault.portfolio.icon}
            </div>
            <span className="text-sm text-white/80">portfolio</span>
          </div>
          
          <div className="flex items-center h-24">
            <span className="text-sm text-white/60">
              rebalanced on {vault.portfolio.releaseDate}
            </span>
          </div>
        </Card>
        
        {/* Chain */}
        <Card className="glass-card p-6 rounded-xl border border-white/10 h-full">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              {vault.chain.icon}
            </div>
            <span className="text-sm text-white/80">chain</span>
          </div>
          
          <div className="flex items-center h-24">
            <span className="text-lg">{vault.chain.name}</span>
          </div>
        </Card>
        
        {/* Compatibility */}
        <Card className="glass-card p-6 rounded-xl border border-white/10 h-full">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 13H15" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 17H12" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-sm text-white/80">compatibility</span>
          </div>
          
          <div className="flex items-center gap-3 h-24">
            {vault.compatibility.map((item, index) => (
              <div key={index}>
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Features Section */}
      <h2 className="text-2xl font-bold text-white mb-4">features</h2>
      <Card className="glass-card rounded-xl border border-white/10 overflow-hidden mb-8">
        {vault.features.map((feature, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-1 md:grid-cols-[200px_1fr] ${
              index !== vault.features.length - 1 ? 'border-b border-white/10' : ''
            }`}
          >
            <div className="p-6 border-r border-white/10">
              <div className="flex items-center gap-2">
                {feature.icon}
                <span className="text-sm">{feature.title}</span>
              </div>
            </div>
            <div className="p-6 whitespace-pre-line text-white/80">
              {feature.description}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default VaultDetails;
