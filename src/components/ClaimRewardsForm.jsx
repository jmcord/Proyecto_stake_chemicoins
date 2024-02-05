import React from 'react';
import { Button } from './ui';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';

export default function ClaimRewardsForm() {
  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'claimReward'
  });

  const { data: writeData, write } = useContractWrite(config);

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError
  } = useWaitForTransaction({
    hash: writeData?.hash
  });

  const handleClaimRewards = () => {
    write();
  };

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <h2>Claim Rewards</h2>
      <Button
        disabled={!write || isTransactionLoading}
        onClick={handleClaimRewards}
        isLoading={isTransactionLoading}
      >
        {isTransactionLoading ? 'Claiming Rewards...' : 'Claim Rewards'}
      </Button>
    </section>
  );
}