'use client'

import Link from 'next/link'
import { useState, memo } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Menu, X, Shield, ChevronDown } from 'lucide-react'

export const Navbar = memo(function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [fundingOpen, setFundingOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)

  const fundingItems = [
    { name: 'Get Funding', href: '/funding', desc: 'Apply for loans & equity' },
    { name: 'Grants', href: '/grants', desc: 'Free money, no repayment' },
    { name: 'Invoice Financing', href: '/invoice-financing', desc: 'Get paid instantly' },
    { name: 'Credit Score', href: '/credit-score', desc: 'Build your credit' },
  ]

  const toolsItems = [
    { name: 'Dashboard', href: '/dashboard', desc: 'Your overview' },
    { name: 'Risk Calculator', href: '/risk-calculator', desc: 'Get instant quotes' },
    { name: 'Claims', href: '/claims', desc: 'File insurance claims' },
    { name: 'Analytics', href: '/analytics', desc: 'Protocol metrics' },
  ]

  // Prefetch all pages on mount for instant navigation
  if (typeof window !== 'undefined') {
    const prefetchPages = () => {
      const router = (window as any).next?.router;
      if (router) {
        [...fundingItems, ...toolsItems].forEach(item => {
          router.prefetch(item.href);
        });
      }
    };
    setTimeout(prefetchPages, 100);
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Enhanced */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-black to-gray-800 p-2.5 rounded-xl transition-transform duration-75 hover:scale-105">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-black leading-none">MutualChain</span>
              <span className="text-xs text-gray-500 font-medium">For Small Business</span>
            </div>
          </Link>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg font-medium transition-colors duration-75"
            >
              Home
            </Link>

            {/* Funding Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setFundingOpen(true)}
                onMouseLeave={() => setFundingOpen(false)}
                className="px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg font-medium transition-colors duration-75 flex items-center gap-1"
              >
                Funding
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {fundingOpen && (
                <div
                  onMouseEnter={() => setFundingOpen(true)}
                  onMouseLeave={() => setFundingOpen(false)}
                  className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-xl shadow-xl py-2"
                >
                  {fundingItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={true}
                      className="block px-4 py-3 hover:bg-blue-50 transition-colors duration-75"
                    >
                      <div className="font-semibold text-black">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-600 mt-0.5">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Tools Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
                className="px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg font-medium transition-colors duration-75 flex items-center gap-1"
              >
                Tools
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {toolsOpen && (
                <div
                  onMouseEnter={() => setToolsOpen(true)}
                  onMouseLeave={() => setToolsOpen(false)}
                  className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-xl shadow-xl py-2"
                >
                  {toolsItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={true}
                      className="block px-4 py-3 hover:bg-green-50 transition-colors duration-75"
                    >
                      <div className="font-semibold text-black">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-600 mt-0.5">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg font-medium transition-colors duration-75"
            >
              About
            </Link>

            {/* Connect Wallet Button - Enhanced */}
            <div className="ml-4 pl-4 border-l border-gray-300">
              <ConnectButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-all"
          >
            {isOpen ? <X className="h-6 w-6 text-black" /> : <Menu className="h-6 w-6 text-black" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 py-6 space-y-1 max-h-[80vh] overflow-y-auto">
            <Link
              href="/"
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg font-medium transition-colors duration-75"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Funding Section */}
            <div className="py-2">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 mb-2">
                Funding Options
              </div>
              {fundingItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors duration-75"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="font-semibold text-black">{item.name}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{item.desc}</div>
                </Link>
              ))}
            </div>

            {/* Mobile Tools Section */}
            <div className="py-2">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 mb-2">
                Tools & Analytics
              </div>
              {toolsItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 px-4 hover:bg-green-50 rounded-lg transition-colors duration-75"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="font-semibold text-black">{item.name}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{item.desc}</div>
                </Link>
              ))}
            </div>

            <Link
              href="/about"
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg font-medium transition-colors duration-75"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            {/* Mobile Wallet Connect */}
            <div className="pt-4 border-t border-gray-200 mt-4">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
})
