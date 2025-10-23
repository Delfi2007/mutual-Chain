'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Ready to Experience the Future of Insurance?
          </h2>
          <p className="text-xl text-gray-300">
            Join thousands of businesses and gig workers who trust MutualChain 
            for affordable, transparent, and AI-powered insurance coverage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard" className="px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center group">
              Launch Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/risk-calculator" className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-200 inline-flex items-center">
              Calculate Your Premium
            </Link>
          </div>

          <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <div className="text-3xl font-bold mb-2">$0</div>
              <div className="text-gray-400">Platform Fees</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">&lt;12min</div>
              <div className="text-gray-400">Average Claim Settlement</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-gray-400">AI-Powered Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
