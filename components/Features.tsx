'use client'

import { Brain, Shield, Zap, Lock, DollarSign, TrendingUp } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: DollarSign,
      title: 'Get Funded Fast',
      description: 'Access funding from community investors, peer lenders, and grants. Get approved in 24-48 hours, not months. No traditional banks required.',
      technologies: ['Community Funding', 'Micro-loans', 'Grants', '3-8% APR'],
    },
    {
      icon: TrendingUp,
      title: 'Build Business Credit',
      description: 'Build your business credit score on blockchain. Get better funding terms, lower rates, and unlock exclusive benefits as you grow.',
      technologies: ['Blockchain Credit', 'Tamper-proof', 'Portable History', 'Instant Verify'],
    },
    {
      icon: Brain,
      title: 'AI Risk Assessment',
      description: 'Get instant premium quotes powered by advanced AI. Fair pricing based on your actual risk profile, not outdated formulas.',
      technologies: ['XGBoost', 'Transformers', 'Federated Learning', '98.5% Accuracy'],
    },
    {
      icon: Shield,
      title: 'Smart Insurance',
      description: 'Automated claims processing with smart contracts. No paperwork, no delays. Average settlement time under 12 minutes.',
      technologies: ['Auto-Processing', 'Chainlink Oracles', 'zkProofs', 'Instant Payout'],
    },
    {
      icon: Zap,
      title: 'Invoice Financing',
      description: 'Don\'t wait 30-90 days for payment. Get 80-90% of your invoice value within 24 hours. Improve your cash flow instantly.',
      technologies: ['80-90% Advance', '24hr Funding', '3-5% Fee', 'No Credit Check'],
    },
    {
      icon: Lock,
      title: 'Privacy & Security',
      description: 'Zero-knowledge proofs protect your sensitive data. All transactions secured on blockchain with military-grade encryption.',
      technologies: ['zkSNARKs', 'Encrypted', 'Blockchain Verified', 'Privacy-First'],
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Everything Small Businesses Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Funding, insurance, and credit - all in one platform. 
            Built specifically for startups and small businesses who can't access traditional financing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card group hover:border-black transition-colors">
              <div className="bg-black p-3 rounded-lg w-fit mb-4 group-hover:bg-gray-800 transition-colors">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {feature.technologies.map((tech, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
