'use client'

import Link from 'next/link'
import { ArrowRight, Shield, Sparkles, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Built for Small Businesses & Startups</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-tight">
              Get Funded
              <span className="block gradient-text">Grow Faster</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Access funding, insurance, and credit in one platform. 
              No banks, no lengthy applications. Built for small businesses and startups 
              who can't access traditional financing. Get funded in 24-48 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/funding" className="btn-primary inline-flex items-center justify-center group">
                Get Funding Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/grants" className="btn-secondary inline-flex items-center justify-center">
                Browse Grants
              </Link>
            </div>

            {/* Key Features Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4 text-black" />
                <span className="text-sm font-medium">AI Risk Assessment</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                <Lock className="h-4 w-4 text-black" />
                <span className="text-sm font-medium">Zero-Knowledge Proofs</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                <Sparkles className="h-4 w-4 text-black" />
                <span className="text-sm font-medium">Instant Claims</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 shadow-2xl">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-3xl font-bold text-black">$2.5M+</div>
                  <div className="text-sm text-gray-600 mt-1">Total Value Locked</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-3xl font-bold text-black">1,247</div>
                  <div className="text-sm text-gray-600 mt-1">Active Policies</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-3xl font-bold text-black">98.5%</div>
                  <div className="text-sm text-gray-600 mt-1">Accuracy Rate</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-3xl font-bold text-black">24/7</div>
                  <div className="text-sm text-gray-600 mt-1">AI Monitoring</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-black text-white p-4 rounded-xl shadow-lg animate-float">
                <Shield className="h-8 w-8" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
