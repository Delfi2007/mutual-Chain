import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'MutualChain - DeFi Insurance Pool with AI Risk Assessment',
  description: 'Peer-to-peer insurance protocol powered by AI models, smart contracts, and blockchain technology. Affordable insurance for small businesses and gig workers.',
  keywords: 'DeFi, Insurance, AI, Blockchain, Smart Contracts, Risk Assessment, P2P Insurance',
}

// Speed up page transitions
export const viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col bg-white text-black">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
