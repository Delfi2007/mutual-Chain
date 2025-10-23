'use client'

export function Technologies() {
  const techStack = [
    {
      category: 'AI & Machine Learning',
      color: 'bg-purple-50 border-purple-200',
      technologies: [
        { name: 'XGBoost', desc: 'Risk prediction' },
        { name: 'Transformers', desc: 'NLP for claims' },
        { name: 'Federated Learning', desc: 'Privacy-preserving ML' },
        { name: 'Reinforcement Learning', desc: 'Dynamic pricing' },
        { name: 'GANs', desc: 'Fraud detection' },
        { name: 'AutoML', desc: 'Model optimization' },
      ],
    },
    {
      category: 'Blockchain & Web3',
      color: 'bg-blue-50 border-blue-200',
      technologies: [
        { name: 'Solidity', desc: 'Smart contracts' },
        { name: 'Hardhat', desc: 'Development' },
        { name: 'Chainlink Oracles', desc: 'Real-world data' },
        { name: 'zkSNARKs/zkSTARKs', desc: 'Privacy' },
        { name: 'Layer 2 (Arbitrum)', desc: 'Scalability' },
        { name: 'The Graph', desc: 'Indexing' },
      ],
    },
    {
      category: 'Frontend & UX',
      color: 'bg-green-50 border-green-200',
      technologies: [
        { name: 'Next.js 14', desc: 'React framework' },
        { name: 'TypeScript', desc: 'Type safety' },
        { name: 'Wagmi/Viem', desc: 'Web3 integration' },
        { name: 'RainbowKit', desc: 'Wallet connect' },
        { name: 'Tailwind CSS', desc: 'Styling' },
        { name: 'Framer Motion', desc: 'Animations' },
      ],
    },
    {
      category: 'Storage & Data',
      color: 'bg-yellow-50 border-yellow-200',
      technologies: [
        { name: 'IPFS', desc: 'Decentralized storage' },
        { name: 'Arweave', desc: 'Permanent storage' },
        { name: 'Ceramic Network', desc: 'Identity' },
        { name: 'TimescaleDB', desc: 'Time-series data' },
        { name: 'Apache Kafka', desc: 'Streaming' },
        { name: 'InfluxDB', desc: 'Analytics' },
      ],
    },
    {
      category: 'Fintech & Compliance',
      color: 'bg-red-50 border-red-200',
      technologies: [
        { name: 'Chainalysis', desc: 'AML compliance' },
        { name: 'Plaid', desc: 'Banking APIs' },
        { name: 'Stripe Identity', desc: 'Verification' },
        { name: 'Monte Carlo', desc: 'Risk modeling' },
        { name: 'VaR Models', desc: 'Solvency' },
        { name: 'Forta Network', desc: 'Monitoring' },
      ],
    },
    {
      category: 'Advanced Features',
      color: 'bg-indigo-50 border-indigo-200',
      technologies: [
        { name: 'ERC-4337', desc: 'Account abstraction' },
        { name: 'LangChain', desc: 'AI chatbot' },
        { name: 'Push Protocol', desc: 'Notifications' },
        { name: 'Gnosis Safe', desc: 'Multi-sig' },
        { name: 'Uniswap V3', desc: 'Liquidity' },
        { name: 'WebAuthn', desc: 'Authentication' },
      ],
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Cutting-Edge Technology Stack
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built with the most advanced AI, blockchain, and fintech technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((stack, index) => (
            <div key={index} className={`p-6 rounded-xl border-2 ${stack.color} shadow-sm hover:shadow-md transition-shadow`}>
              <h3 className="text-xl font-bold text-black mb-4">{stack.category}</h3>
              <div className="space-y-2">
                {stack.technologies.map((tech, idx) => (
                  <div key={idx} className="flex justify-between items-start bg-white p-3 rounded-lg border border-gray-200">
                    <div>
                      <div className="font-semibold text-black text-sm">{tech.name}</div>
                      <div className="text-xs text-gray-500">{tech.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
