'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Search, Filter, Calendar, DollarSign, Users, CheckCircle, Clock } from 'lucide-react';

export default function GrantsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [applied, setApplied] = useState<number[]>([]);

  const categories = ['all', 'women-owned', 'minority', 'tech', 'green', 'retail', 'food'];

  const grants = [
    {
      id: 1,
      name: 'Small Business Startup Grant',
      provider: 'MutualChain Foundation',
      amount: '$10,000',
      deadline: '30 days left',
      category: 'all',
      eligibility: 'Businesses less than 2 years old',
      funded: 25,
      total: 50,
    },
    {
      id: 2,
      name: 'Women Entrepreneurs Fund',
      provider: 'Community Pool',
      amount: '$15,000',
      deadline: '45 days left',
      category: 'women-owned',
      eligibility: 'Women-owned businesses',
      funded: 18,
      total: 30,
    },
    {
      id: 3,
      name: 'Minority Business Grant',
      provider: 'Diversity Fund',
      amount: '$12,000',
      deadline: '60 days left',
      category: 'minority',
      eligibility: 'Minority-owned businesses',
      funded: 12,
      total: 25,
    },
    {
      id: 4,
      name: 'Green Technology Grant',
      provider: 'Eco Initiative',
      amount: '$20,000',
      deadline: '90 days left',
      category: 'green',
      eligibility: 'Sustainable/eco-friendly businesses',
      funded: 8,
      total: 15,
    },
    {
      id: 5,
      name: 'Tech Innovation Fund',
      provider: 'Tech Accelerator',
      amount: '$25,000',
      deadline: '20 days left',
      category: 'tech',
      eligibility: 'Technology startups',
      funded: 30,
      total: 40,
    },
    {
      id: 6,
      name: 'Local Food Business Grant',
      provider: 'Food Alliance',
      amount: '$8,000',
      deadline: '40 days left',
      category: 'food',
      eligibility: 'Food & beverage businesses',
      funded: 15,
      total: 35,
    },
  ];

  const filteredGrants = grants.filter(grant => {
    const matchesSearch = grant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grant.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || grant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApply = (grantId: number) => {
    setApplied([...applied, grantId]);
    // Simulate application submission
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="w-12 h-12 text-green-600" />
            <h1 className="text-4xl font-bold text-black">
              Business Grants & Funding
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find no-repayment grants perfect for your small business. 
            100% free money to help you grow.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Available Grants', value: '156', icon: Gift },
            { label: 'Total Funding', value: '$2.8M', icon: DollarSign },
            { label: 'Businesses Funded', value: '340+', icon: Users },
            { label: 'Avg. Award', value: '$12,500', icon: CheckCircle },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200"
            >
              <stat.icon className="w-8 h-8 text-green-600 mb-2" />
              <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search grants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="women-owned">Women-Owned</option>
                <option value="minority">Minority-Owned</option>
                <option value="tech">Technology</option>
                <option value="green">Green/Sustainable</option>
                <option value="retail">Retail</option>
                <option value="food">Food & Beverage</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Grants List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGrants.map((grant, index) => (
            <motion.div
              key={grant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-black mb-1">{grant.name}</h3>
                  <p className="text-sm text-gray-600">{grant.provider}</p>
                </div>
                <div className="bg-green-100 px-3 py-1 rounded-full">
                  <span className="text-sm font-bold text-green-800">{grant.amount}</span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{grant.deadline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Users className="w-4 h-4" />
                  <span>{grant.eligibility}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Funded: {grant.funded}/{grant.total}</span>
                  <span>{Math.round((grant.funded / grant.total) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${(grant.funded / grant.total) * 100}%` }}
                  />
                </div>
              </div>

              {applied.includes(grant.id) ? (
                <div className="bg-green-50 border border-green-200 rounded-lg py-3 px-4 text-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <span className="text-sm font-semibold text-green-800">Application Submitted</span>
                </div>
              ) : (
                <button
                  onClick={() => handleApply(grant.id)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Apply Now
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {filteredGrants.length === 0 && (
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No grants found matching your criteria.</p>
          </div>
        )}

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-black mb-6">Tips for Grant Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-black mb-2">✓ Do:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Read all eligibility requirements carefully</li>
                <li>• Provide detailed business information</li>
                <li>• Explain how funds will be used</li>
                <li>• Submit supporting documents</li>
                <li>• Apply to multiple grants</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-2">✗ Don't:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Miss application deadlines</li>
                <li>• Provide false information</li>
                <li>• Apply if you don't meet criteria</li>
                <li>• Ignore follow-up requests</li>
                <li>• Give up after one rejection</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
