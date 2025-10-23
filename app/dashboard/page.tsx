'use client'

import { useState } from 'react'
import { Shield, TrendingUp, AlertCircle, DollarSign, Activity, Clock } from 'lucide-react'
import { useAccount } from 'wagmi'

export default function DashboardPage() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState('overview')

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Shield className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-black mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to access your MutualChain dashboard
          </p>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Active Policies', value: '3', icon: Shield, color: 'text-blue-600' },
    { label: 'Total Coverage', value: '$25,000', icon: DollarSign, color: 'text-green-600' },
    { label: 'Monthly Premium', value: '$127', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Claims Pending', value: '0', icon: AlertCircle, color: 'text-orange-600' },
  ]

  const policies = [
    {
      id: 1,
      type: 'Business Liability',
      coverage: '$10,000',
      premium: '$52/mo',
      status: 'Active',
      expires: '2026-03-15',
      riskScore: 'Low',
    },
    {
      id: 2,
      type: 'Equipment Protection',
      coverage: '$8,000',
      premium: '$38/mo',
      status: 'Active',
      expires: '2026-05-22',
      riskScore: 'Low',
    },
    {
      id: 3,
      type: 'Income Protection',
      coverage: '$7,000',
      premium: '$37/mo',
      status: 'Active',
      expires: '2026-01-10',
      riskScore: 'Medium',
    },
  ]

  const recentActivity = [
    { type: 'Premium Paid', amount: '$127', date: '2025-10-15', status: 'Completed' },
    { type: 'Policy Renewed', amount: '-', date: '2025-10-01', status: 'Completed' },
    { type: 'Claim Filed', amount: '$500', date: '2025-09-20', status: 'Approved' },
    { type: 'Premium Paid', amount: '$127', date: '2025-09-15', status: 'Completed' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <Activity className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            {['overview', 'policies', 'claims', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Policies */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-black">Active Policies</h2>
              </div>
              <div className="p-6 space-y-4">
                {policies.map((policy) => (
                  <div key={policy.id} className="p-4 border border-gray-200 rounded-lg hover:border-black transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-black mb-1">{policy.type}</h3>
                        <p className="text-sm text-gray-600">Policy #{policy.id}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        {policy.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500 mb-1">Coverage</div>
                        <div className="font-semibold text-black">{policy.coverage}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Premium</div>
                        <div className="font-semibold text-black">{policy.premium}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Expires</div>
                        <div className="font-semibold text-black">{policy.expires}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Risk Score</div>
                        <div className={`font-semibold ${policy.riskScore === 'Low' ? 'text-green-600' : 'text-orange-600'}`}>
                          {policy.riskScore}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-black mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="btn-primary">New Policy</button>
                <button className="btn-secondary">File Claim</button>
                <button className="btn-secondary">Risk Assessment</button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Risk Score */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-black mb-4">AI Risk Score</h3>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-green-600 mb-2">92</div>
                <div className="text-sm text-gray-600">Excellent Rating</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment History</span>
                  <span className="font-semibold">98%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Claim Frequency</span>
                  <span className="font-semibold">Low</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Risk Profile</span>
                  <span className="font-semibold">Stable</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-black mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-black text-sm">{activity.type}</div>
                      <div className="text-xs text-gray-500">{activity.date}</div>
                    </div>
                    {activity.amount !== '-' && (
                      <div className="font-semibold text-sm text-black">{activity.amount}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
