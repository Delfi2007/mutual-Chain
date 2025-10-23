'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, DollarSign, Clock, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react';

export default function InvoiceFinancingPage() {
  const [uploadedInvoice, setUploadedInvoice] = useState(false);
  const [fundingRequested, setFundingRequested] = useState(false);

  const stats = [
    { label: 'Advance Rate', value: '80-90%', icon: DollarSign },
    { label: 'Funding Speed', value: '24 hours', icon: Clock },
    { label: 'Total Financed', value: '$1.2M', icon: TrendingUp },
    { label: 'Invoices Funded', value: '340+', icon: CheckCircle },
  ];

  const activeInvoices = [
    {
      id: 'INV-2024-001',
      client: 'ABC Corporation',
      amount: 15000,
      dueDate: '2025-11-15',
      advance: 12000,
      fee: 450,
      status: 'pending',
    },
    {
      id: 'INV-2024-002',
      client: 'XYZ Industries',
      amount: 8500,
      dueDate: '2025-11-20',
      advance: 6800,
      fee: 255,
      status: 'approved',
    },
    {
      id: 'INV-2024-003',
      client: 'Tech Solutions Inc',
      amount: 22000,
      dueDate: '2025-12-01',
      advance: 17600,
      fee: 660,
      status: 'funded',
    },
  ];

  const handleUpload = () => {
    setUploadedInvoice(true);
    setTimeout(() => setFundingRequested(true), 1000);
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
            <FileText className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-black">
              Invoice Financing
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get paid instantly for your outstanding invoices. Don't wait 30-90 days for payment. 
            Unlock your cash flow today with up to 90% advance.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200"
            >
              <stat.icon className="w-8 h-8 text-blue-600 mb-2" />
              <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Invoice Form */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-gray-200 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-black mb-6">Upload Invoice</h2>

              {fundingRequested ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-black mb-2">Funding Request Received!</h3>
                  <p className="text-gray-600 mb-6">
                    Your invoice is being verified. You'll receive funding within 24 hours.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left max-w-md mx-auto">
                    <h4 className="font-semibold text-black mb-3">Estimated Funding</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Invoice Amount:</span>
                        <span className="font-semibold text-black">$15,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Advance Rate (85%):</span>
                        <span className="font-semibold text-green-600">$12,750</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fee (3%):</span>
                        <span className="font-semibold text-gray-600">-$450</span>
                      </div>
                      <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between">
                        <span className="font-bold text-black">You Receive:</span>
                        <span className="font-bold text-black text-lg">$12,300</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : uploadedInvoice ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Verifying invoice...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Client Information */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Client/Customer Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ABC Corporation"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Invoice Number */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Invoice Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="INV-2024-001"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Invoice Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Invoice Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-600">$</span>
                      <input
                        type="number"
                        required
                        placeholder="15000"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Payment Due Date
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Upload Invoice File */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Upload Invoice (PDF, JPG, PNG)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        Maximum file size: 10MB
                      </p>
                      <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                    </div>
                  </div>

                  {/* Terms Acceptance */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <p className="font-semibold text-black mb-1">Important Terms:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• You'll receive 80-90% of invoice value upfront</li>
                          <li>• 3-5% fee applies based on invoice terms</li>
                          <li>• When client pays, we deduct our advance + fee</li>
                          <li>• You receive the remaining balance</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleUpload}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    Request Funding
                  </button>
                </div>
              )}
            </motion.div>

            {/* Active Invoices */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-black mb-6">Your Invoices</h2>
              <div className="space-y-4">
                {activeInvoices.map((invoice) => (
                  <div key={invoice.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold text-black">{invoice.id}</div>
                        <div className="text-sm text-gray-600">{invoice.client}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        invoice.status === 'funded' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status.toUpperCase()}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Invoice Amount</div>
                        <div className="font-semibold text-black">${invoice.amount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">You Receive</div>
                        <div className="font-semibold text-green-600">${(invoice.advance - invoice.fee).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Due Date</div>
                        <div className="font-semibold text-black">{invoice.dueDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Fee</div>
                        <div className="font-semibold text-black">${invoice.fee}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-black mb-4">How It Works</h3>
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Upload Invoice', desc: 'Submit your unpaid invoice' },
                  { step: 2, title: 'Get Verified', desc: 'We verify with your client' },
                  { step: 3, title: 'Receive Funds', desc: 'Get 80-90% within 24 hours' },
                  { step: 4, title: 'Client Pays', desc: 'When paid, receive balance' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-semibold text-black text-sm">{item.title}</div>
                      <div className="text-xs text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Calculator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-black mb-4">Quick Calculator</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-700">Invoice Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-600">$</span>
                    <input
                      type="number"
                      placeholder="10000"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Advance (85%)</span>
                    <span className="font-semibold text-green-600">$8,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fee (3%)</span>
                    <span className="font-semibold text-gray-600">-$300</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <span className="font-bold text-black">You Get</span>
                    <span className="font-bold text-black">$8,200</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-black mb-4">Benefits</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Instant cash flow</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>No debt incurred</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Improve working capital</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Grow your business faster</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Blockchain verified</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
