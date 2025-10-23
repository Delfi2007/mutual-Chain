'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet, arbitrum, optimism, base } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { Toaster } from 'react-hot-toast'

const config = getDefaultConfig({
  appName: 'MutualChain',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || 'YOUR_PROJECT_ID',
  chains: [mainnet, arbitrum, optimism, base],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#000',
                color: '#fff',
              },
            }}
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
