'use client';

import { useState } from 'react';
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
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Get Funded for Your Business
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access capital from our decentralized network of lenders and investors. 
            No traditional banks, no credit score barriers.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center">
            <DollarSign className="h-12 w-12 text-black mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-black mb-2">$2.5M+</h3>
            <p className="text-gray-600">Total Funded</p>
          </div>
          <div className="card text-center">
            <Users className="h-12 w-12 text-black mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-black mb-2">500+</h3>
            <p className="text-gray-600">Businesses Funded</p>
          </div>
          <div className="card text-center">
            <Clock className="h-12 w-12 text-black mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-black mb-2">48hrs</h3>
            <p className="text-gray-600">Average Approval Time</p>
          </div>
        </div>

        {/* Funding Application Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="card">
            <h2 className="text-2xl font-bold text-black mb-6">Apply for Funding</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Business Type
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select your business type</option>
                  <option value="retail">Retail</option>
                  <option value="restaurant">Restaurant/Cafe</option>
                  <option value="tech">Tech Startup</option>
                  <option value="service">Service Business</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Funding Type
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {fundingOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setFundingType(option.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all duration-75 ${
                          fundingType === option.id
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-6 w-6 text-black" />
                          <div>
                            <div className="font-semibold text-black">{option.name}</div>
                            <div className="text-sm text-gray-600">{option.rate}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Funding Amount: ${parseInt(selectedAmount).toLocaleString()}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  <span>$1,000</span>
                  <span>$100,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Business Description
                </label>
                <textarea
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Tell us about your business and how you'll use the funding..."
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={submitted}
              >
                {submitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Application Submitted!
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
            </form>
          </div>

          {/* Available Investors */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-black mb-4">Available Funding Sources</h3>
              <div className="space-y-3">
                {availableInvestors.map((investor, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-black">{investor.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        investor.risk === 'Low' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {investor.risk} Risk
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Available: {investor.amount}</span>
                      <span className="text-black font-semibold">{investor.roi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Stories */}
            <div className="card">
              <h3 className="text-xl font-bold text-black mb-4">Recent Success Stories</h3>
              <div className="space-y-3">
                {successStories.map((story, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <h4 className="font-semibold text-black">{story.business}</h4>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{story.funded}</span>
                      <span className="text-green-600 font-semibold">{story.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="card">
          <h2 className="text-2xl font-bold text-black mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-black mb-2">Apply Online</h3>
              <p className="text-sm text-gray-600">
                Fill out our simple application form
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-black mb-2">Get Matched</h3>
              <p className="text-sm text-gray-600">
                Our AI matches you with suitable investors
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-black mb-2">Review Offers</h3>
              <p className="text-sm text-gray-600">
                Compare rates and choose the best option
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-black mb-2">Get Funded</h3>
              <p className="text-sm text-gray-600">
                Receive funds directly to your wallet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
