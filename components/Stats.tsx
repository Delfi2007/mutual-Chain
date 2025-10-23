'use client'

import { TrendingUp, Users, Shield, Zap } from 'lucide-react'

export function Stats() {
  const stats = [
    {
      icon: TrendingUp,
      value: '$2.5M+',
      label: 'Total Value Locked',
      description: 'Secured in smart contracts',
    },
    {
      icon: Users,
      value: '1,247',
      label: 'Active Policyholders',
      description: 'Protected members',
    },
    {
      icon: Shield,
      value: '342',
      label: 'Claims Processed',
      description: 'Average 12min settlement',
    },
    {
      icon: Zap,
      value: '98.5%',
      label: 'AI Accuracy',
      description: 'Risk prediction rate',
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.description}</div>
                </div>
                <div className="bg-black p-3 rounded-lg">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
