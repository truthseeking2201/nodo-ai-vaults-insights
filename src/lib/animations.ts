
import anime from 'animejs';

// Updated type definition to include NodeListOf<Element>
type AnimationTarget = string | Element | NodeListOf<Element>;

// Basic animations
export const fadeIn = (target: AnimationTarget, duration: number = 800, delay: number = 0) => {
  return anime({
    targets: target,
    opacity: [0, 1],
    translateY: [10, 0],
    easing: 'easeOutExpo',
    duration,
    delay
  });
};

export const fadeOut = (target: AnimationTarget, duration: number = 800, delay: number = 0) => {
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
export const staggerFadeIn = (target: AnimationTarget, staggerDelay: number = 50, duration: number = 800) => {
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
export const countUp = (target: AnimationTarget, endValue: number, duration: number = 2000) => {
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
export const pulseGlow = (target: AnimationTarget, color: string = 'rgba(249, 115, 22, 0.6)', duration: number = 1500) => {
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
export const floatingElement = (target: AnimationTarget, distance: number = 15) => {
  return anime({
    targets: target,
    translateY: [0, -distance, 0],
    easing: 'easeInOutSine',
    duration: 3000,
    loop: true
  });
};

// Path drawing animation for SVGs
export const drawSVGPath = (target: AnimationTarget, duration: number = 1500, delay: number = 0) => {
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
export const animateGradient = (target: AnimationTarget, colors: string[], duration: number = 3000) => {
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

// Text scramble effect - Fixed to handle both string selectors and direct DOM element references
export const textScramble = (target: AnimationTarget, finalText: string, duration: number = 2000) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  
  // Get the element regardless of whether target is a string selector or an Element
  let element: Element | null = null;
  
  if (typeof target === 'string') {
    element = document.querySelector(target);
  } else if (target instanceof Element) {
    element = target;
  } else if (target instanceof NodeList && target.length > 0) {
    element = target[0] as Element;
  }
  
  if (!element) {
    console.error('Text scramble could not find target element');
    return { reset: () => {} };
  }
  
  const originalText = element.textContent || '';
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
    
    element!.textContent = output;
    
    if (frame < frameRate) {
      frame++;
      requestAnimationFrame(update);
    }
  };
  
  update();
  
  return {
    reset: () => {
      if (element) element.textContent = originalText;
    }
  };
};

// Added: Digital number counter with flipping effect
export const digitalCounter = (target: AnimationTarget, endValue: number, duration: number = 2000) => {
  return anime({
    targets: target,
    innerHTML: [0, endValue],
    round: 1,
    easing: 'easeInOutExpo',
    duration,
    update: function(anim) {
      const targets = anim.animatables;
      targets.forEach(animatable => {
        const target = animatable.target;
        const value = Math.floor(target.innerHTML);
        const formattedValue = value.toString().padStart(2, '0');
        target.innerHTML = formattedValue;
      });
    }
  });
};

// Added: Particle system animation
export const createParticleSystem = (container: HTMLElement, count: number = 30, color: string = '#F97316') => {
  // Clear any existing particles
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  // Create particles
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'absolute rounded-full';
    particle.style.backgroundColor = color;
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.opacity = '0';
    container.appendChild(particle);
  }

  // Animate particles
  return anime({
    targets: container.children,
    translateX: () => anime.random(-100, 100) + '%',
    translateY: () => anime.random(-100, 100) + '%',
    scale: () => anime.random(0.2, 1),
    opacity: [0, () => anime.random(0.3, 0.7)],
    duration: () => anime.random(1000, 3000),
    delay: anime.stagger(100, {from: 'center'}),
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutQuad',
  });
};

// Added: Advanced glow effect for elements
export const advancedGlow = (target: AnimationTarget, primaryColor: string, secondaryColor: string) => {
  return anime({
    targets: target,
    boxShadow: [
      '0 0 5px ' + primaryColor + '33',
      '0 0 20px ' + primaryColor + '66',
      '0 0 35px ' + secondaryColor + '33',
      '0 0 20px ' + primaryColor + '66',
      '0 0 5px ' + primaryColor + '33'
    ],
    easing: 'easeInOutSine',
    duration: 3000,
    loop: true
  });
};

// Added: Typing animation for text
export const typeText = (target: AnimationTarget, text: string, speed: number = 50) => {
  // Get the element
  let element: Element | null = null;
  
  if (typeof target === 'string') {
    element = document.querySelector(target);
  } else if (target instanceof Element) {
    element = target;
  } else if (target instanceof NodeList && target.length > 0) {
    element = target[0] as Element;
  }
  
  if (!element) {
    console.error('Type text could not find target element');
    return;
  }
  
  // Create the animation
  let i = 0;
  element.textContent = '';
  
  const typing = () => {
    if (i < text.length) {
      element!.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  };
  
  typing();
};
