'use client'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACTS } from '@/lib/contracts'
import toast from 'react-hot-toast'

export function useInsuranceContract() {
  const contractConfig = {
    address: CONTRACTS.INSURANCE.address as `0x${string}`,
    abi: CONTRACTS.INSURANCE.abi,
  }

  // Read functions
  const { data: tvl } = useReadContract({
    ...contractConfig,
    functionName: 'totalValueLocked',
  })

  // Write functions
  const { writeContract: createPolicy, data: createPolicyHash } = useWriteContract()
  const { writeContract: fileClaim, data: fileClaimHash } = useWriteContract()
  const { writeContract: payPremium } = useWriteContract()
  const { writeContract: stake } = useWriteContract()

  // Wait for transactions
  const { isLoading: isCreatingPolicy } = useWaitForTransactionReceipt({
    hash: createPolicyHash,
  })

  const { isLoading: isFilingClaim } = useWaitForTransactionReceipt({
    hash: fileClaimHash,
  })

  return {
    tvl,
    createPolicy,
    fileClaim,
    payPremium,
    stake,
    isCreatingPolicy,
    isFilingClaim,
  }
}
