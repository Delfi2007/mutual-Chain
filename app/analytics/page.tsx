'use client'

import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function AnalyticsPage() {
  const tvlData = [
    { month: 'Jan', value: 1200000 },
    { month: 'Feb', value: 1450000 },
    { month: 'Mar', value: 1680000 },
    { month: 'Apr', value: 1890000 },
    { month: 'May', value: 2150000 },
    { month: 'Jun', value: 2350000 },
    { month: 'Jul', value: 2480000 },
  ]

  const claimsData = [
    { month: 'Jan', filed: 45, approved: 42, rejected: 3 },
    { month: 'Feb', filed: 52, approved: 48, rejected: 4 },
    { month: 'Mar', filed: 48, approved: 46, rejected: 2 },
    { month: 'Apr', filed: 61, approved: 58, rejected: 3 },
    { month: 'May', filed: 55, approved: 52, rejected: 3 },
    { month: 'Jun', filed: 68, approved: 65, rejected: 3 },
  ]

  const policyDistribution = [
    { name: 'Business Liability', value: 420 },
    { name: 'Equipment', value: 315 },
    { name: 'Income Protection', value: 280 },
    { name: 'Property', value: 232 },
  ]

  const COLORS = ['#000000', '#404040', '#737373', '#a3a3a3']

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Protocol Analytics</h1>
          <p className="text-xl text-gray-600">
            Real-time insights powered by The Graph and on-chain data
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-8 w-8 text-green-600" />
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-black mb-1">$2.48M</div>
            <div className="text-sm text-gray-600">Total Value Locked</div>
            <div className="text-xs text-green-600 mt-2">+15.2% this month</div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-blue-600" />
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-black mb-1">1,247</div>
            <div className="text-sm text-gray-600">Active Policies</div>
            <div className="text-xs text-blue-600 mt-2">+8.4% this month</div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-black mb-1">342</div>
            <div className="text-sm text-gray-600">Claims Processed</div>
            <div className="text-xs text-purple-600 mt-2">12min avg settlement</div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <span className="text-xs font-semibold text-green-600">LIVE</span>
            </div>
            <div className="text-3xl font-bold text-black mb-1">98.5%</div>
            <div className="text-sm text-gray-600">AI Accuracy Rate</div>
            <div className="text-xs text-orange-600 mt-2">Fraud detection</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* TVL Chart */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-black mb-6">Total Value Locked</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tvlData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#000" 
                  strokeWidth={2}
                  dot={{ fill: '#000', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Claims Chart */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-black mb-6">Claims Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={claimsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="filed" fill="#000" />
                <Bar dataKey="approved" fill="#10b981" />
                <Bar dataKey="rejected" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Policy Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-black mb-6">Policy Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={policyDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {policyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Real-time Activity */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-black mb-6">Real-time Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-black">New Policy Created</div>
                  <div className="text-sm text-gray-600">Business Liability - $15,000</div>
                </div>
                <span className="text-xs text-gray-500">2 min ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-black">Claim Approved</div>
                  <div className="text-sm text-gray-600">Equipment Damage - $850</div>
                </div>
                <span className="text-xs text-gray-500">5 min ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-black">Premium Payment</div>
                  <div className="text-sm text-gray-600">0x742d...4f2e - $127</div>
                </div>
                <span className="text-xs text-gray-500">8 min ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-black">Risk Assessment</div>
                  <div className="text-sm text-gray-600">AI Score: 87/100</div>
                </div>
                <span className="text-xs text-gray-500">12 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
