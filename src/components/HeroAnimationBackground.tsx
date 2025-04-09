
import React, { useRef, useEffect } from 'react';
import anime from 'animejs';

const HeroAnimationBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing elements
    containerRef.current.innerHTML = '';
    
    // Create hexagon grid
    createHexagonGrid(containerRef.current);
    
    // Create floating orbs
    createFloatingOrbs(containerRef.current);
    
    // Create glowing lines
    createGlowingLines(containerRef.current);
    
  }, []);
  
  const createHexagonGrid = (container: HTMLDivElement) => {
    const hexContainer = document.createElement('div');
    hexContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none';
    container.appendChild(hexContainer);
    
    // Create SVG for hexagons
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 1000 800');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.style.opacity = '0.12';
    hexContainer.appendChild(svg);
    
    const hexSize = 40;
    const cols = Math.ceil(1000 / (hexSize * 1.5)) + 1;
    const rows = Math.ceil(800 / (hexSize * Math.sqrt(3))) + 1;
    
    // Generate hexagons
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexSize * 1.5;
        const y = row * hexSize * Math.sqrt(3) + (col % 2 === 0 ? 0 : hexSize * Math.sqrt(3) / 2);
        
        const hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const points = [];
        
        for (let i = 0; i < 6; i++) {
          const angle = Math.PI / 3 * i - Math.PI / 6;
          const pointX = x + hexSize * Math.cos(angle);
          const pointY = y + hexSize * Math.sin(angle);
          points.push(`${pointX},${pointY}`);
        }
        
        hex.setAttribute('points', points.join(' '));
        hex.setAttribute('fill', 'none');
        hex.setAttribute('stroke', '#F97316');
        hex.setAttribute('stroke-width', '0.5');
        hex.setAttribute('stroke-opacity', '0.2');
        hex.setAttribute('data-x', x.toString());
        hex.setAttribute('data-y', y.toString());
        svg.appendChild(hex);
      }
    }
    
    // Animate hexagons
    anime({
      targets: svg.querySelectorAll('polygon'),
      strokeOpacity: [
        { value: 0.1, duration: 800, easing: 'easeInOutQuad' },
        { value: 0.5, duration: 800, easing: 'easeInOutQuad' }
      ],
      scale: [
        { value: 0.9, duration: 500, easing: 'easeOutElastic' },
        { value: 1, duration: 500, easing: 'easeInElastic' }
      ],
      delay: anime.stagger(10, { grid: [cols, rows], from: 'center' }),
      loop: true,
      direction: 'alternate'
    });
  };
  
  const createFloatingOrbs = (container: HTMLDivElement) => {
    const orbsContainer = document.createElement('div');
    orbsContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none';
    container.appendChild(orbsContainer);
    
    // Create floating orbs
    const colors = ['#F97316', '#F59E0B', '#D97706', '#FDBA74'];
    const sizes = [6, 8, 10, 12, 16];
    
    for (let i = 0; i < 20; i++) {
      const orb = document.createElement('div');
      orb.className = 'absolute rounded-full blur-sm';
      orb.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      orb.style.width = `${sizes[Math.floor(Math.random() * sizes.length)]}px`;
      orb.style.height = orb.style.width;
      orb.style.opacity = '0';
      orbsContainer.appendChild(orb);
      
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      orb.style.left = `${x}%`;
      orb.style.top = `${y}%`;
      
      // Create individual animation for each orb
      anime({
        targets: orb,
        opacity: [0, { value: Math.random() * 0.4 + 0.2, duration: 1000 }],
        translateX: [
          { value: anime.random(-20, 20), duration: anime.random(2000, 4000) },
          { value: anime.random(-20, 20), duration: anime.random(2000, 4000) }
        ],
        translateY: [
          { value: anime.random(-20, 20), duration: anime.random(2000, 4000) },
          { value: anime.random(-20, 20), duration: anime.random(2000, 4000) }
        ],
        scale: [
          { value: anime.random(0.8, 1.2), duration: anime.random(1000, 2000) },
          { value: anime.random(0.8, 1.2), duration: anime.random(1000, 2000) }
        ],
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate',
        delay: anime.random(0, 1000)
      });
    }
  };
  
  const createGlowingLines = (container: HTMLDivElement) => {
    const linesContainer = document.createElement('div');
    linesContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none';
    container.appendChild(linesContainer);
    
    // Create SVG for lines
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    linesContainer.appendChild(svg);
    
    // Create network of lines
    const nodePositions = [
      { x: 20, y: 30 }, { x: 30, y: 70 }, { x: 50, y: 20 }, 
      { x: 65, y: 50 }, { x: 80, y: 30 }, { x: 90, y: 80 },
      { x: 40, y: 90 }, { x: 10, y: 60 }, { x: 70, y: 85 }
    ];
    
    // Create connections between nodes
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        // Only connect some nodes based on proximity or randomly
        if (Math.random() < 0.3) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', nodePositions[i].x.toString());
          line.setAttribute('y1', nodePositions[i].y.toString());
          line.setAttribute('x2', nodePositions[j].x.toString());
          line.setAttribute('y2', nodePositions[j].y.toString());
          line.setAttribute('stroke', '#F97316');
          line.setAttribute('stroke-width', '0.2');
          line.setAttribute('stroke-opacity', '0.3');
          svg.appendChild(line);
          
          // Add animation for lines
          anime({
            targets: line,
            strokeDashoffset: [anime.setDashoffset, 0],
            strokeOpacity: [0, 0.3, 0],
            easing: 'easeInOutSine',
            duration: anime.random(3000, 6000),
            delay: anime.random(0, 2000),
            loop: true,
            direction: 'alternate',
            begin: function(anim) {
              line.setAttribute('stroke-dasharray', anime.setDashoffset(line).toString());
            }
          });
        }
      }
    }
    
    // Create nodes
    nodePositions.forEach(pos => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pos.x.toString());
      circle.setAttribute('cy', pos.y.toString());
      circle.setAttribute('r', '0.7');
      circle.setAttribute('fill', '#F97316');
      circle.setAttribute('fill-opacity', '0.5');
      svg.appendChild(circle);
      
      // Animate nodes
      anime({
        targets: circle,
        r: [0.5, 1, 0.5],
        fillOpacity: [0.3, 0.8, 0.3],
        easing: 'easeInOutSine',
        duration: anime.random(2000, 4000),
        loop: true,
        delay: anime.random(0, 1000)
      });
    });
  };

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden"></div>;
};

export default HeroAnimationBackground;
