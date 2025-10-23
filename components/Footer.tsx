'use client'

import Link from 'next/link'
import { Shield, Github, Twitter, MessageCircle } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-lg">
                <Shield className="h-6 w-6 text-black" />
              </div>
              <span className="text-xl font-bold">MutualChain</span>
            </div>
            <p className="text-gray-400 text-sm">
              DeFi Insurance Pool with AI Risk Assessment. Making insurance accessible for everyone.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/claims" className="hover:text-white transition-colors">File Claim</Link></li>
              <li><Link href="/risk-calculator" className="hover:text-white transition-colors">Risk Calculator</Link></li>
              <li><Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/whitepaper" className="hover:text-white transition-colors">Whitepaper</Link></li>
              <li><Link href="/api" className="hover:text-white transition-colors">API</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-gray-300 transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-gray-300 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-gray-300 transition-colors">
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} MutualChain. All rights reserved. Built with ❤️ for DeFi.</p>
        </div>
      </div>
    </footer>
  )
}
