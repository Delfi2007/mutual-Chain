'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Shield, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

export default function CreditScorePage() {
  const [creditScore, setCreditScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading credit score
    setTimeout(() => {
      setCreditScore(725);
      setLoading(false);
    }, 1500);
  }, []);

  const scoreColor = creditScore >= 700 ? 'text-green-600' : creditScore >= 600 ? 'text-yellow-600' : 'text-red-600';
  const scoreRating = creditScore >= 700 ? 'Excellent' : creditScore >= 600 ? 'Good' : 'Fair';

  const creditFactors = [
    { name: 'Payment History', score: 95, impact: 'High', status: 'excellent' },
    { name: 'Credit Utilization', score: 78, impact: 'High', status: 'good' },
    { name: 'Credit Age', score: 65, impact: 'Medium', status: 'fair' },
    { name: 'Transaction Volume', score: 88, impact: 'Medium', status: 'excellent' },
    { name: 'Community Trust', score: 92, impact: 'Low', status: 'excellent' },
  ];

  const creditHistory = [
    { date: '2025-10-15', action: 'Loan Payment', amount: '$2,500', impact: '+12 points' },
    { date: '2025-09-20', action: 'Insurance Premium', amount: '$500', impact: '+5 points' },
    { date: '2025-08-10', action: 'Grant Received', amount: '$10,000', impact: '+8 points' },
    { date: '2025-07-05', action: 'Invoice Paid', amount: '$3,200', impact: '+6 points' },
  ];

  const benefits = [
    { score: '650+', benefit: 'Access to micro-loans up to $10,000' },
    { score: '700+', benefit: 'Lower interest rates (5-8% APR)' },
    { score: '750+', benefit: 'Priority funding approval' },
    { score: '800+', benefit: 'Premium investor matching' },
  ];

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
            Business Credit Score
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build your business credit on blockchain. Track your score, get better funding terms, 
            and unlock exclusive benefits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Credit Score */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-8"
            >
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-600 mt-4">Calculating your credit score...</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-6">
                    <div className={`text-7xl font-bold ${scoreColor}`}>{creditScore}</div>
                    <div className="text-2xl font-semibold text-gray-700 mt-2">{scoreRating}</div>
                    <div className="text-sm text-gray-600 mt-1">out of 850</div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                    <div
                      className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${(creditScore / 850) * 100}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-2xl font-bold text-green-600">+45</div>
                      <div className="text-xs text-gray-600 mt-1">Last 30 days</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-xs text-gray-600 mt-1">Positive actions</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-2xl font-bold text-purple-600">Top 15%</div>
                      <div className="text-xs text-gray-600 mt-1">Percentile</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Credit Factors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-black mb-6">Score Breakdown</h2>
              <div className="space-y-4">
                {creditFactors.map((factor, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="font-semibold text-black">{factor.name}</div>
                        <div className="text-xs text-gray-600">Impact: {factor.impact}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          factor.status === 'excellent' ? 'text-green-600' :
                          factor.status === 'good' ? 'text-blue-600' : 'text-yellow-600'
                        }`}>
                          {factor.score}%
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          factor.status === 'excellent' ? 'bg-green-500' :
                          factor.status === 'good' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${factor.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Credit History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-black mb-6">Recent Activity</h2>
              <div className="space-y-3">
                {creditHistory.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-semibold text-black">{item.action}</div>
                        <div className="text-sm font-semibold text-green-600">{item.impact}</div>
                      </div>
                      <div className="text-sm text-gray-600">{item.amount}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Score Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Score Benefits
              </h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="font-semibold text-black text-sm mb-1">{benefit.score}</div>
                    <div className="text-xs text-gray-700">{benefit.benefit}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Improve Score */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-green-50 border border-green-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Improve Your Score
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Pay invoices on time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Complete business profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Build transaction history</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Earn community endorsements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Maintain low credit utilization</span>
                </li>
              </ul>
            </motion.div>

            {/* Blockchain Verified */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Blockchain Verified
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Your credit score is permanently recorded on the blockchain, ensuring:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Tamper-proof records</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Portable credit history</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Privacy-first approach</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Instant verification</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
