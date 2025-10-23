'use client'

import { useState } from 'react'
import { FileText, Upload, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useAccount } from 'wagmi'

export default function ClaimsPage() {
  const { address, isConnected } = useAccount()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    policyId: '',
    claimType: '',
    amount: '',
    description: '',
    date: '',
  })
  const [files, setFiles] = useState<File[]>([])
  const [submitted, setSubmitted] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true)
    }, 1500)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-black mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600">
            Please connect your wallet to file a claim
          </p>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8">
            <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-black mb-4">Claim Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your claim has been submitted successfully. Our AI is now processing your claim.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-600 mb-2">Claim ID</div>
              <div className="text-xl font-mono font-bold text-black">CLM-2025-{Math.floor(Math.random() * 10000)}</div>
            </div>
            <div className="space-y-3 text-left text-sm mb-6">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>AI verification in progress</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>Fraud detection scan completed</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>zkSNARK privacy verification enabled</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Expected processing time: <span className="font-semibold text-black">8-12 minutes</span>
            </p>
            <button onClick={() => window.location.href = '/dashboard'} className="btn-primary w-full">
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            File a Claim
          </h1>
          <p className="text-xl text-gray-600">
            Submit your claim with AI-powered verification
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    step > s ? 'bg-black' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-2xl mx-auto mt-4">
            <span className="text-sm font-medium text-black">Details</span>
            <span className="text-sm font-medium text-gray-500">Evidence</span>
            <span className="text-sm font-medium text-gray-500">Review</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-black mb-6">Claim Details</h2>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Select Policy
                  </label>
                  <select
                    className="input-field"
                    value={formData.policyId}
                    onChange={(e) => setFormData({ ...formData, policyId: e.target.value })}
                    required
                  >
                    <option value="">Choose a policy</option>
                    <option value="1">Business Liability - Policy #1</option>
                    <option value="2">Equipment Protection - Policy #2</option>
                    <option value="3">Income Protection - Policy #3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Claim Type
                  </label>
                  <select
                    className="input-field"
                    value={formData.claimType}
                    onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="property">Property Damage</option>
                    <option value="liability">Liability</option>
                    <option value="theft">Theft</option>
                    <option value="equipment">Equipment Failure</option>
                    <option value="income">Income Loss</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Claim Amount ($)
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="1000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Incident Date
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Description
                  </label>
                  <textarea
                    className="input-field"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Please provide detailed information about the incident..."
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-primary w-full"
                >
                  Continue to Evidence
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-black mb-6">Upload Evidence</h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-black transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Drag and drop files here, or click to browse
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <label htmlFor="file-upload" className="btn-secondary cursor-pointer inline-block">
                    Choose Files
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-black">Uploaded Files:</h3>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <span className="text-sm text-black">{file.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> All files are encrypted and stored on IPFS with privacy protection via zkSNARKs
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-secondary flex-1"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="btn-primary flex-1"
                  >
                    Review Claim
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-black mb-6">Review & Submit</h2>
                
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="text-sm text-gray-600 mb-1">Policy</div>
                    <div className="font-semibold text-black">Policy #{formData.policyId}</div>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="text-sm text-gray-600 mb-1">Claim Type</div>
                    <div className="font-semibold text-black capitalize">{formData.claimType}</div>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="text-sm text-gray-600 mb-1">Amount</div>
                    <div className="font-semibold text-black">${formData.amount}</div>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="text-sm text-gray-600 mb-1">Incident Date</div>
                    <div className="font-semibold text-black">{formData.date}</div>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="text-sm text-gray-600 mb-1">Description</div>
                    <div className="text-black">{formData.description}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Evidence Files</div>
                    <div className="font-semibold text-black">{files.length} file(s) attached</div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-900">
                    By submitting this claim, you confirm that all information provided is accurate and true.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-secondary flex-1"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    Submit Claim
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
