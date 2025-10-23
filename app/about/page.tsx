import { Shield, Target, Users, Zap, Award, Globe } from 'lucide-react'

export default function AboutPage() {
  const team = [
    { role: 'Blockchain Lead', expertise: 'Solidity, Smart Contracts' },
    { role: 'AI/ML Engineer', expertise: 'XGBoost, Federated Learning' },
    { role: 'Frontend Developer', expertise: 'Next.js, Web3 Integration' },
    { role: 'Security Auditor', expertise: 'zkSNARKs, Cryptography' },
  ]

  const milestones = [
    { year: '2024 Q4', title: 'Protocol Launch', desc: 'Mainnet deployment on Arbitrum' },
    { year: '2025 Q1', title: 'AI Integration', desc: 'Federated learning models deployed' },
    { year: '2025 Q2', title: '$1M TVL', desc: 'Reached first million in coverage' },
    { year: '2025 Q3', title: 'Multi-chain', desc: 'Expanded to Optimism and Base' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            About MutualChain
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building the future of decentralized insurance with AI-powered risk assessment,
            blockchain transparency, and cutting-edge fintech technology.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                MutualChain is revolutionizing insurance by making it accessible, transparent,
                and affordable for small businesses and gig workers worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We leverage advanced AI models, blockchain technology, and zero-knowledge proofs
                to create a peer-to-peer insurance protocol that eliminates intermediaries
                and reduces costs by up to 40%.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-black" />
                  <span className="font-semibold">Decentralized</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-black" />
                  <span className="font-semibold">AI-Powered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-black" />
                  <span className="font-semibold">Global Access</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <Target className="h-10 w-10 text-black mb-4" />
                <h3 className="font-bold text-black mb-2">Problem Solving</h3>
                <p className="text-sm text-gray-600">
                  Addressing the lack of affordable insurance for underserved markets
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <Users className="h-10 w-10 text-black mb-4" />
                <h3 className="font-bold text-black mb-2">Community First</h3>
                <p className="text-sm text-gray-600">
                  Peer-to-peer model benefits all participants equally
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <Shield className="h-10 w-10 text-black mb-4" />
                <h3 className="font-bold text-black mb-2">Security</h3>
                <p className="text-sm text-gray-600">
                  Military-grade encryption and smart contract audits
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <Award className="h-10 w-10 text-black mb-4" />
                <h3 className="font-bold text-black mb-2">Innovation</h3>
                <p className="text-sm text-gray-600">
                  Cutting-edge AI and blockchain technology integration
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-black mb-12 text-center">
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-black mb-4">AI & Machine Learning</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• XGBoost for risk prediction</li>
                <li>• Transformers for NLP</li>
                <li>• Federated Learning (privacy)</li>
                <li>• GANs for fraud detection</li>
                <li>• Reinforcement Learning pricing</li>
                <li>• AutoML optimization</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-black mb-4">Blockchain & Web3</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Solidity smart contracts</li>
                <li>• Chainlink oracles</li>
                <li>• zkSNARKs/zkSTARKs</li>
                <li>• Layer 2 (Arbitrum, Base)</li>
                <li>• The Graph indexing</li>
                <li>• ERC-4337 abstraction</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-black mb-4">Fintech & Compliance</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Chainalysis AML</li>
                <li>• Plaid banking APIs</li>
                <li>• Stripe Identity</li>
                <li>• Monte Carlo risk models</li>
                <li>• VaR solvency analysis</li>
                <li>• Forta monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-black mb-12 text-center">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-5/12 text-right pr-8" style={{ textAlign: index % 2 === 0 ? 'right' : 'left' }}>
                    {index % 2 === 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-black mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.desc}</p>
                      </div>
                    )}
                  </div>
                  <div className="w-2/12 flex justify-center">
                    <div className="bg-black text-white rounded-full w-32 h-32 flex items-center justify-center font-bold text-sm text-center p-4 relative z-10">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="w-5/12 pl-8">
                    {index % 2 !== 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-black mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-black mb-12 text-center">
            Expert Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
                <div className="bg-black rounded-full w-20 h-20 mx-auto mb-4"></div>
                <h3 className="text-lg font-bold text-black mb-2">{member.role}</h3>
                <p className="text-sm text-gray-600">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">
            Join the Future of Insurance
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Be part of the revolution that's making insurance accessible to everyone
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/dashboard" className="btn-primary">
              Get Started
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
