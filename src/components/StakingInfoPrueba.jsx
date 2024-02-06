import React from 'react';
import { useStaking } from 'wagmi';
import { ErrorInfo } from './ui';

export default function StakingInfoPrueba() {
  const { data, isLoading } = useStaking(import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS);

  if (isLoading) return <div>Loading...</div>;

  const stakingBalance = data?.stakingBalance;
  const rewardsBalance = data?.rewardsBalance;

  return (
    <div className="bg-white p-4 border shadow rounded-md">
      <h2>Staking Information</h2>
      {stakingBalance !== undefined && rewardsBalance !== undefined ? (
        <div>
          <p>Staking Balance: {stakingBalance}</p>
          <p>Rewards Balance: {rewardsBalance}</p>
        </div>
      ) : (
        <ErrorInfo message="Failed to fetch staking information." />
      )}
    </div>
  );
}