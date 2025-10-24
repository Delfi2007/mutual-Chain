// Performance monitoring
export const reportWebVitals = (metric: any) => {
  if (metric.label === 'web-vital') {
    console.log(metric);
  }
};

// Preload critical resources
export const preloadResources = () => {
  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
};

// Optimize images
export const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
