/**
 * TanStack Query (React Query) Configuration
 * For efficient data fetching and caching
 */

import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

// Custom hooks using TanStack Query

export const useCreditScore = (walletAddress: string) => {
  return useQuery({
    queryKey: ['creditScore', walletAddress],
    queryFn: async () => {
      const response = await fetch(`/api/credit-score/${walletAddress}`);
      if (!response.ok) throw new Error('Failed to fetch credit score');
      return response.json();
    },
    enabled: !!walletAddress,
  });
};

export const useLoanApplications = (businessId: string) => {
  return useQuery({
    queryKey: ['loanApplications', businessId],
    queryFn: async () => {
      const response = await fetch(`/api/loans/${businessId}`);
      if (!response.ok) throw new Error('Failed to fetch loans');
      return response.json();
    },
  });
};

export const useInvoices = (businessId: string) => {
  return useQuery({
    queryKey: ['invoices', businessId],
    queryFn: async () => {
      const response = await fetch(`/api/invoices/${businessId}`);
      if (!response.ok) throw new Error('Failed to fetch invoices');
      return response.json();
    },
  });
};

export const useSubmitLoanApplication = () => {
  return useMutation({
    mutationFn: async (applicationData: any) => {
      const response = await fetch('/api/loans/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
      });
      if (!response.ok) throw new Error('Failed to submit application');
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['loanApplications'] });
    },
  });
};

export const useUploadInvoice = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/invoices/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload invoice');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
};

export const usePlatformStats = () => {
  return useQuery({
    queryKey: ['platformStats'],
    queryFn: async () => {
      const response = await fetch('/api/analytics/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
    staleTime: 1000 * 60 * 1, // 1 minute for real-time stats
  });
};

// Prefetch utility for faster navigation
export const prefetchCreditScore = (walletAddress: string) => {
  queryClient.prefetchQuery({
    queryKey: ['creditScore', walletAddress],
    queryFn: async () => {
      const response = await fetch(`/api/credit-score/${walletAddress}`);
      return response.json();
    },
  });
};
