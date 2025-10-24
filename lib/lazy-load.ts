import dynamic from 'next/dynamic';

// Lazy load heavy components
export const LazyChart = dynamic(() => import('recharts').then(mod => mod.LineChart), {
  ssr: false,
});

export const LazyBarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), {
  ssr: false,
});

export const LazyPieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), {
  ssr: false,
});
