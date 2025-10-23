'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Users, CheckCircle, Clock, Award } from 'lucide-react';

export default function FundingPage() {
  const [selectedAmount, setSelectedAmount] = useState('5000');
  const [businessType, setBusinessType] = useState('');
  const [fundingType, setFundingType] = useState('equity');
  const [submitted, setSubmitted] = useState(false);

  const fundingOptions = [
    { id: 'equity', name: 'Equity Funding', rate: '5-20% equity', icon: TrendingUp },
    { id: 'loan', name: 'Micro Loan', rate: '3-8% APR', icon: DollarSign },
    { id: 'grant', name: 'Business Grant', rate: 'No repayment', icon: Award },
  ];

  const availableInvestors = [
    { name: 'Community Pool', amount: '$50,000', roi: '12% APR', risk: 'Low' },
    { name: 'Angel Investors', amount: '$25,000', roi: '15-20% equity', risk: 'Medium' },
    { name: 'MutualChain Fund', amount: '$100,000', roi: '10% APR', risk: 'Low' },
    { name: 'Peer Lenders', amount: '$15,000', roi: '8% APR', risk: 'Low' },
  ];

  const successStories = [
    { business: 'Local Coffee Shop', funded: '$10,000', status: 'Funded in 3 days' },
    { business: 'Tech Startup', funded: '$50,000', status: 'Funded in 1 week' },
    { business: 'Retail Store', funded: '$25,000', status: 'Funded in 5 days' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate matching with investors
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-black mb-4">
            Get Funded for Your Business
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access funding from our community of investors, peer lenders, and grants. 
            No traditional banks, no lengthy applications. Get funded in days, not months.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Funded', value: '$2.5M', icon: DollarSign },
            { label: 'Businesses Helped', value: '450+', icon: Users },
            { label: 'Avg. Time to Fund', value: '4 days', icon: Clock },
            { label: 'Success Rate', value: '92%', icon: CheckCircle },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Funding Application Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-black mb-6">Apply for Funding</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-black mb-2">Application Submitted!</h3>
                  <p className="text-gray-600 mb-6">
                    We're matching you with suitable investors. You'll receive offers within 24-48 hours.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Next Steps:</strong> Check your dashboard for investor offers. 
                      Average response time: 1-2 business days.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Funding Type */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-3">
                      Funding Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {fundingOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setFundingType(option.id)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            fundingType === option.id
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <option.icon className={`w-6 h-6 mb-2 ${
                            fundingType === option.id ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                          <div className="text-sm font-semibold text-black">{option.name}</div>
                          <div className="text-xs text-gray-600 mt-1">{option.rate}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Business Name */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your business name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Business Type */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Business Type
                    </label>
                    <select
                      required
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select type</option>
                      <option value="retail">Retail</option>
                      <option value="food">Food & Beverage</option>
                      <option value="tech">Technology</option>
                      <option value="service">Services</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Funding Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Funding Amount Needed
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-600">$</span>
                      <input
                        type="number"
                        required
                        value={selectedAmount}
                        onChange={(e) => setSelectedAmount(e.target.value)}
                        placeholder="5000"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex gap-2 mt-2">
                      {['5000', '10000', '25000', '50000'].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setSelectedAmount(amount)}
                          className="px-3 py-1 text-xs border border-gray-300 rounded-md hover:border-blue-600 hover:text-blue-600"
                        >
                          ${parseInt(amount).toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Purpose */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Funding Purpose
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe how you'll use the funds (e.g., inventory, equipment, expansion, working capital)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Monthly Revenue */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Average Monthly Revenue
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-600">$</span>
                      <input
                        type="number"
                        required
                        placeholder="10000"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Business Age */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Business Age
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select age</option>
                      <option value="new">Just starting</option>
                      <option value="6months">6 months - 1 year</option>
                      <option value="1-2years">1-2 years</option>
                      <option value="2-5years">2-5 years</option>
                      <option value="5+years">5+ years</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Available Investors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-black mb-4">Available Funding Sources</h3>
              <div className="space-y-3">
                {availableInvestors.map((investor, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="font-semibold text-black text-sm">{investor.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      Available: {investor.amount}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-green-600">{investor.roi}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        investor.risk === 'Low' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {investor.risk} Risk
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Success Stories */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-black mb-4">Recent Success Stories</h3>
              <div className="space-y-3">
                {successStories.map((story, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-black text-sm">{story.business}</div>
                      <div className="text-xs text-gray-600">{story.funded}</div>
                      <div className="text-xs text-green-600">{story.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-black mb-4">Why Choose Us?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>No credit checks required</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Flexible repayment terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Fast approval (24-48 hours)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Community-backed funding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Build credit on blockchain</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
