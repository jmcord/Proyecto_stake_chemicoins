import React, { useState, useEffect } from 'react';
import { Button, Title } from './ui';
import { useContractRead } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';

export default function StakingInfo({ account }) {
  const [stakingBalance, setStakingBalance] = useState(0);
  const [rewardsBalance, setRewardsBalance] = useState(0);

  const { data: stakingData } = useContractRead({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'getStakingBalance',
    args: [account]
  });

  const { data: rewardsData } = useContractRead({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'getRewardsBalance',
    args: [account]
  });

  useEffect(() => {
    if (stakingData) {
      setStakingBalance(stakingData.toNumber());
    }
  }, [stakingData]);

  useEffect(() => {
    if (rewardsData) {
      setRewardsBalance(rewardsData.toNumber());
    }
  }, [rewardsData]);

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <Title>Staking Information</Title>
      <div>
        <p>Staking Balance: {stakingBalance}</p>
        <p>Rewards Balance: {rewardsBalance}</p>
      </div>
    </section>
  );
}