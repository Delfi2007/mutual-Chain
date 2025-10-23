'use client'

import { useState } from 'react'
import axios from 'axios'

const AI_API_URL = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:5000'

export function useAI() {
  const [loading, setLoading] = useState(false)

  const assessRisk = async (data: {
    business_type: string
    revenue: number
    employees: number
    location: string
    claims: number
    coverage: number
  }) => {
    setLoading(true)
    try {
      const response = await axios.post(`${AI_API_URL}/api/risk-assessment`, data)
      return response.data
    } catch (error) {
      console.error('Risk assessment error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const detectFraud = async (data: {
    claim_id: number
    policy_id: number
    amount: number
    description: string
    time_since_policy: number
  }) => {
    setLoading(true)
    try {
      const response = await axios.post(`${AI_API_URL}/api/fraud-detection`, data)
      return response.data
    } catch (error) {
      console.error('Fraud detection error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const verifyClaim = async (data: {
    claim_id: number
    policy_id: number
    amount: number
    description: string
    evidence_hash: string
    zk_proof: string
  }) => {
    setLoading(true)
    try {
      const response = await axios.post(`${AI_API_URL}/api/claim-verification`, data)
      return response.data
    } catch (error) {
      console.error('Claim verification error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    assessRisk,
    detectFraud,
    verifyClaim,
    loading,
  }
}
