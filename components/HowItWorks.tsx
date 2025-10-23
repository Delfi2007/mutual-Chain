'use client'

import { CheckCircle2 } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Connect Wallet & Risk Assessment',
      description: 'Connect your wallet and our AI models analyze your profile using federated learning and XGBoost algorithms to calculate personalized premiums.',
    },
    {
      number: '02',
      title: 'Choose Coverage & Stake',
      description: 'Select from various coverage options. Smart contracts automatically pool funds using AMM mechanics. Zero-knowledge proofs protect your privacy.',
    },
    {
      number: '03',
      title: 'AI Monitoring & Oracles',
      description: 'Real-time monitoring with Chainlink oracles for parametric triggers. GANs detect fraud. Reinforcement learning optimizes pricing dynamically.',
    },
    {
      number: '04',
      title: 'Instant Claims & Settlement',
      description: 'File claims through our AI chatbot. Automated verification with zkSNARKs. Layer 2 solutions ensure fast, low-cost settlements in minutes.',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Four simple steps to get covered by the most advanced DeFi insurance protocol
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-300 -z-10"></div>
              )}
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="text-5xl font-bold text-gray-200 mb-4">{step.number}</div>
                <div className="bg-black p-2 rounded-lg w-fit mb-4">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
