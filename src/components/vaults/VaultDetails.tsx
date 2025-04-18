import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ArrowRight, GaugeCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  ComposedChart, 
  Legend,
  ReferenceLine,
  Scatter
} from 'recharts';
import { fadeIn, staggerFadeIn } from '@/lib/animations';

interface VaultDetailsProps {
  vault: any;
}

const VaultDetails: React.FC<VaultDetailsProps> = ({ vault }) => {
  const [activeTimeframe, setActiveTimeframe] = useState("30D");
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartAnimation, setChartAnimation] = useState(false);
  
  const generateDetailedChartData = (days: number) => {
    const data = [];
    let baseValue = 100;
    let volume = 5000;
    
    for (let i = 0; i < days; i++) {
      const dayOfWeek = i % 7;
      const isWeekend = dayOfWeek >= 5;
      const trendFactor = Math.sin(i / 5) * 0.3;
      const volatilityFactor = isWeekend ? 0.3 : 0.5;
      const marketMovement = (Math.random() - 0.45 + trendFactor) * volatilityFactor;
      
      volume = volume + (volume * (Math.random() * 0.08 - 0.04));
      const volumeChange = Math.abs(marketMovement * volume * 0.7);
      
      baseValue = baseValue * (1 + marketMovement / 100);
      
      const marketValue = baseValue * (1 - 0.05 * Math.random());
      
      data.push({
        day: i + 1,
        date: new Date(2023, 3, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: parseFloat(baseValue.toFixed(2)),
        marketValue: parseFloat(marketValue.toFixed(2)),
        volume: Math.round(volumeChange),
        earnings: parseFloat((baseValue - (i === 0 ? 100 : data[i-1]?.value || 100)).toFixed(3))
      });
    }
    
    return data;
  };
  
  useEffect(() => {
    setChartAnimation(true);
    const days = activeTimeframe === "7D" ? 7 : 
                activeTimeframe === "14D" ? 14 : 
                activeTimeframe === "30D" ? 30 : 
                activeTimeframe === "90D" ? 90 : 180;
    
    setChartData(generateDetailedChartData(days));
    
    const metricElements = document.querySelectorAll('.metric-card');
    if (metricElements.length > 0) {
      staggerFadeIn(metricElements, 100, 600);
    }
    
    const timer = setTimeout(() => {
      setChartAnimation(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [activeTimeframe]);
  
  const minValue = chartData.length > 0 ? 
    Math.min(...chartData.map(d => Math.min(d.value, d.marketValue))) - 2 : 98;
  const maxValue = chartData.length > 0 ? 
    Math.max(...chartData.map(d => Math.max(d.value, d.marketValue))) + 2 : 102;
  
  const startValue = chartData.length > 0 ? chartData[0].value : 100;
  const endValue = chartData.length > 0 ? chartData[chartData.length - 1].value : 100;
  const percentChange = ((endValue - startValue) / startValue * 100).toFixed(2);
  const isPositive = parseFloat(percentChange) >= 0;
  
  const handlePointClick = (data: any, index: number) => {
    setSelectedPoint(index);
  };

  useEffect(() => {
    const detailsElement = document.querySelector('.vault-details-container');
    if (detailsElement) {
      fadeIn(detailsElement, 800);
    }
    
    const metricsElements = document.querySelectorAll('.metric-card');
    if (metricsElements.length > 0) {
      staggerFadeIn(metricsElements, 100);
    }
  }, []);

  return (
    <div className="vault-details-container">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">nodo <span className={`text-gradient-${vault.colorAccent || 'nova'}`}>vault overview</span></h2>
            <p className="text-white/80 max-w-4xl">
              {vault.description}
            </p>
          </div>
          
          <Button 
            className={`mt-4 md:mt-0 btn-gradient-${vault.colorAccent || 'nova'} text-white px-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105`}
            asChild
          >
            <Link to={`/dashboard?vault=${vault.id}`} className="flex items-center gap-2">
              <span>Deposit Now</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
      
      <Card className="glass-card p-8 rounded-xl border border-white/10 mb-12 transition-all duration-300 hover:border-white/20 hover:shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 mb-6">
          <div>
            <div className="text-sm text-white/60 mb-1">NAV</div>
            <div className={`text-2xl font-bold font-mono text-${vault.colorAccent || 'nova'}`}>{vault.nav}</div>
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
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="metric-card bg-white/5 backdrop-blur-md rounded-lg p-3 transition-all duration-300 hover:bg-white/10">
            <div className="text-xs text-white/60 mb-1">30d Change</div>
            <div className={`text-lg font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{percentChange}%
            </div>
          </div>
          <div className="metric-card bg-white/5 backdrop-blur-md rounded-lg p-3 transition-all duration-300 hover:bg-white/10">
            <div className="text-xs text-white/60 mb-1">Volatility</div>
            <div className="text-lg font-bold">Low</div>
          </div>
          <div className="metric-card bg-white/5 backdrop-blur-md rounded-lg p-3 transition-all duration-300 hover:bg-white/10">
            <div className="text-xs text-white/60 mb-1">Sharpe Ratio</div>
            <div className="text-lg font-bold">2.1</div>
          </div>
          <div className="metric-card bg-white/5 backdrop-blur-md rounded-lg p-3 transition-all duration-300 hover:bg-white/10">
            <div className="text-xs text-white/60 mb-1">Max Drawdown</div>
            <div className="text-lg font-bold">-3.2%</div>
          </div>
        </div>
        
        <div className="h-80 relative mt-6">
          <ChartContainer
            config={{
              value: {
                label: "Vault Performance",
                theme: {
                  light: vault.chartColor || "#F97316", 
                  dark: vault.chartColor || "#F97316"
                }
              },
              marketValue: {
                label: "Market Benchmark",
                theme: {
                  light: "#64748b",
                  dark: "#64748b"
                }
              }
            }}
          >
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 5, bottom: 30 }}
              className={chartAnimation ? "opacity-0 transition-opacity duration-500" : "opacity-100 transition-opacity duration-500"}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={vault.chartColor || "#F97316"} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={vault.chartColor || "#F97316"} stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0.1}/>
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feFlood floodColor={vault.chartColor || "#F97316"} floodOpacity="0.3" result="coloredBlur" />
                  <feComposite in="SourceGraphic" in2="coloredBlur" operator="over" />
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                tickMargin={10}
                tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <YAxis 
                domain={[minValue, maxValue]}
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                tickFormatter={(value) => `$${value}`}
                width={60}
                tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                cursor={{
                  stroke: "rgba(255, 255, 255, 0.2)",
                  strokeDasharray: "3 3",
                  strokeWidth: 1
                }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>{value}</span>}
                iconType="circle"
                iconSize={8}
              />
              
              <ReferenceLine 
                y={100} 
                stroke="rgba(255,255,255,0.2)" 
                strokeDasharray="3 3" 
                label={{ 
                  value: "Initial", 
                  position: 'insideBottomRight', 
                  fill: 'rgba(255,255,255,0.5)',
                  fontSize: 10
                }} 
              />
              
              <Line 
                type="monotone" 
                dataKey="marketValue" 
                name="Market Benchmark" 
                stroke="#64748b" 
                strokeWidth={1.5} 
                dot={false}
                activeDot={{ 
                  r: 4, 
                  stroke: '#fff',
                  fill: '#64748b',
                  strokeWidth: 1
                }}
              />
              
              <Line 
                type="monotone" 
                dataKey="value" 
                name={`${vault.name} Performance`} 
                stroke={vault.chartColor || "#F97316"} 
                strokeWidth={2.5} 
                dot={false}
                activeDot={{ 
                  r: 6, 
                  stroke: 'white',
                  strokeWidth: 2, 
                  fill: vault.chartColor || "#F97316",
                  className: "filter" 
                }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-out"
              />
              
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="none" 
                fillOpacity={1} 
                fill="url(#colorValue)"
                isAnimationActive={true}
                animationDuration={1200}
              />
              
              {selectedPoint !== null && (
                <Scatter
                  data={[chartData[selectedPoint]]}
                  fill={vault.chartColor || "#F97316"}
                  shape={(props) => {
                    const { cx, cy } = props;
                    return (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={8} 
                        fill={vault.chartColor || "#F97316"} 
                        stroke="white" 
                        strokeWidth={2} 
                        filter="url(#glow)"
                      />
                    );
                  }}
                />
              )}
            </ComposedChart>
          </ChartContainer>
        </div>
        
        <div className="flex justify-end mt-4 space-x-2">
          {["7D", "14D", "30D", "90D", "ALL"].map((period) => (
            <Button 
              key={period}
              variant="outline" 
              size="sm" 
              onClick={() => setActiveTimeframe(period)}
              className={`text-xs border-white/10 transition-all duration-300 ${
                activeTimeframe === period 
                  ? `bg-${vault.colorAccent || 'nova'}/20 border-${vault.colorAccent || 'nova'}/40 text-${vault.colorAccent || 'nova'}`
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {period}
            </Button>
          ))}
        </div>
      </Card>
      
      <h2 className="text-2xl font-bold text-white mb-4">technical <span className={`text-gradient-${vault.colorAccent || 'nova'}`}>specifications</span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <Card className="glass-card p-6 rounded-xl border border-white/10 h-full">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <GaugeCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-white/80">risk profile</span>
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
        
        <Card className="glass-card p-6 rounded-xl border border-white/10 h-full">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              {vault.portfolio.icon}
            </div>
            <span className="text-sm text-white/80">nodo portfolio</span>
          </div>
          
          <div className="flex items-center h-24">
            <span className="text-sm text-white/60">
              last rebalanced: {vault.portfolio.releaseDate}
            </span>
          </div>
        </Card>
        
        <Card className="glass-card p-6 rounded-xl border border-white/10 h-full">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              {vault.chain.icon}
            </div>
            <span className="text-sm text-white/80">blockchain</span>
          </div>
          
          <div className="flex items-center h-24">
            <span className="text-lg">{vault.chain.name}</span>
          </div>
        </Card>
        
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
            <span className="text-sm text-white/80">nodo ecosystem</span>
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
      
      <h2 className="text-2xl font-bold text-white mb-4">nodo <span className={`text-gradient-${vault.colorAccent || 'nova'}`}>features</span></h2>
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
