
import anime from 'animejs';

// Basic animations
export const fadeIn = (target: string | Element, duration: number = 800, delay: number = 0) => {
  return anime({
    targets: target,
    opacity: [0, 1],
    translateY: [10, 0],
    easing: 'easeOutExpo',
    duration,
    delay
  });
};

export const fadeOut = (target: string | Element, duration: number = 800, delay: number = 0) => {
  return anime({
    targets: target,
    opacity: [1, 0],
    translateY: [0, 10],
    easing: 'easeOutExpo',
    duration,
    delay
  });
};

// Staggered animations for lists or grid items
export const staggerFadeIn = (target: string | Element, staggerDelay: number = 50, duration: number = 800) => {
  return anime({
    targets: target,
    opacity: [0, 1],
    translateY: [10, 0],
    easing: 'easeOutExpo',
    duration,
    delay: anime.stagger(staggerDelay)
  });
};

// Value counter animation
export const countUp = (target: string | Element, endValue: number, duration: number = 2000) => {
  return anime({
    targets: target,
    textContent: [0, endValue],
    round: 1,
    easing: 'easeInOutExpo',
    duration,
    update: function(anim) {
      // For targets that need special formatting like currency
      const element = document.querySelector(target as string);
      if (element && element.hasAttribute('data-format')) {
        const format = element.getAttribute('data-format');
        if (format === 'currency') {
          element.textContent = '$' + element.textContent?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      }
    }
  });
};

// Visual effects
export const pulseGlow = (target: string | Element, color: string = 'rgba(249, 115, 22, 0.6)', duration: number = 1500) => {
  return anime({
    targets: target,
    boxShadow: [
      '0 0 0px rgba(249, 115, 22, 0)',
      `0 0 15px ${color}`,
      '0 0 0px rgba(249, 115, 22, 0)'
    ],
    easing: 'easeInOutSine',
    duration,
    loop: true
  });
};

// Interactive hovering elements
export const floatingElement = (target: string | Element, distance: number = 15) => {
  return anime({
    targets: target,
    translateY: [0, -distance, 0],
    easing: 'easeInOutSine',
    duration: 3000,
    loop: true
  });
};

// Path drawing animation for SVGs
export const drawSVGPath = (target: string | Element, duration: number = 1500, delay: number = 0) => {
  return anime({
    targets: target,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration,
    delay,
    direction: 'normal',
  });
};

// Background gradient animation
export const animateGradient = (target: string | Element, colors: string[], duration: number = 3000) => {
  // Create a gradient animation sequence
  const keyframes = [];
  for (let i = 0; i < colors.length; i++) {
    keyframes.push({ backgroundPosition: `${i * 100}% 0%` });
  }
  keyframes.push({ backgroundPosition: '100% 0%' });
  
  return anime({
    targets: target,
    keyframes,
    easing: 'easeInOutSine',
    duration,
    loop: true,
    direction: 'alternate'
  });
};

// Text scramble effect
export const textScramble = (target: string | Element, finalText: string, duration: number = 2000) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const originalText = document.querySelector(target as string)?.textContent || '';
  let output = '';
  let frameRate = 30;
  let frame = 0;
  
  const randomChar = () => characters.charAt(Math.floor(Math.random() * characters.length));
  
  const update = () => {
    const progress = anime.min(1, frame / frameRate);
    const textLength = Math.floor(finalText.length * progress);
    
    output = '';
    for (let i = 0; i < finalText.length; i++) {
      if (i < textLength) {
        output += finalText[i];
      } else {
        output += randomChar();
      }
    }
    
    document.querySelector(target as string)!.textContent = output;
    
    if (frame < frameRate) {
      frame++;
      requestAnimationFrame(update);
    }
  };
  
  update();
  
  return {
    reset: () => {
      document.querySelector(target as string)!.textContent = originalText;
    }
  };
};
