// Optimized animation variants - faster and lighter
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 }
};

export const slideUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

// Disable animations on slower devices
export const shouldReduceMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

export const conditionalMotion = (props: any) => {
  return shouldReduceMotion() ? {} : props;
};
