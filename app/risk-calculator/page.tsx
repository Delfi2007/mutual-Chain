'use client'

import { useState } from 'react'
import { Calculator, TrendingDown, Shield, Sparkles } from 'lucide-react'

export default function RiskCalculatorPage() {
  const [formData, setFormData] = useState({
    businessType: '',
    revenue: '',
    employees: '',
    location: '',
    coverage: '',
    claims: '',
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate AI calculation
    setTimeout(() => {
      const baseRate = 50
      const revenueMultiplier = parseInt(formData.revenue) / 50000
      const employeeMultiplier = parseInt(formData.employees) / 10
      const claimsMultiplier = parseInt(formData.claims) > 0 ? 1.3 : 0.8
      
      const monthlyPremium = Math.round(baseRate * revenueMultiplier * employeeMultiplier * claimsMultiplier)
      const riskScore = Math.max(20, Math.min(95, 85 - (parseInt(formData.claims) * 10)))
      
      setResult({
        monthlyPremium,
        annualPremium: monthlyPremium * 12,
        riskScore,
        riskLevel: riskScore > 70 ? 'Low' : riskScore > 50 ? 'Medium' : 'High',
        discount: claimsMultiplier < 1 ? 20 : 0,
      })
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Risk Assessment</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Risk Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant premium estimates using our advanced machine learning models
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-black mb-6">Business Information</h2>
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Business Type
                </label>
                <select
                  className="input-field"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  required
                >
                  <option value="">Select type</option>
                  <option value="retail">Retail</option>
                  <option value="tech">Technology</option>
                  <option value="consulting">Consulting</option>
                  <option value="food">Food Service</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="gig">Gig Worker</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Annual Revenue ($)
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                  placeholder="100000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Number of Employees
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.employees}
                  onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                  placeholder="5"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Location
                </label>
                <select
                  className="input-field"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                >
                  <option value="">Select location</option>
                  <option value="urban">Urban</option>
                  <option value="suburban">Suburban</option>
                  <option value="rural">Rural</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Desired Coverage ($)
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.coverage}
                  onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
                  placeholder="50000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Previous Claims (Last 3 Years)
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.claims}
                  onChange={(e) => setFormData({ ...formData, claims: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate Premium
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-black mb-6">Your Premium</h2>
                  
                  <div className="text-center mb-8">
                    <div className="text-5xl font-bold text-black mb-2">
                      ${result.monthlyPremium}
                    </div>
                    <div className="text-gray-600">per month</div>
                    <div className="text-sm text-gray-500 mt-2">
                      ${result.annualPremium} per year
                    </div>
                  </div>

                  {result.discount > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-900">
                          {result.discount}% Discount Applied!
                        </span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        No claims in the last 3 years
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">AI Risk Score</span>
                      <span className="font-bold text-black">{result.riskScore}/100</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Risk Level</span>
                      <span className={`font-bold ${
                        result.riskLevel === 'Low' ? 'text-green-600' :
                        result.riskLevel === 'Medium' ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {result.riskLevel}
                      </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-gray-600">Coverage Amount</span>
                      <span className="font-bold text-black">${formData.coverage}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h3 className="font-bold text-black mb-4">AI Analysis</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span className="text-gray-700">Excellent payment history likelihood</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span className="text-gray-700">Low fraud risk detected</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span className="text-gray-700">Stable business profile</span>
                    </li>
                  </ul>
                </div>

                <button className="btn-primary w-full">
                  Purchase Policy
                </button>
              </>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">
                  Calculate Your Premium
                </h3>
                <p className="text-gray-600">
                  Fill out the form to get an instant AI-powered premium estimate
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
