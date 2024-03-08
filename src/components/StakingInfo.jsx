import React, { useState } from 'react';
import { useContractRead } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';

function StakingInfo() {
  const [address, setAddress] = useState('');
  const [stakingBalance, setStakingBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: stakingData, loading: stakingLoading, error: stakingError, fetch: fetchStakingData } = useContractRead({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'getStakingBalance',
    args: [address]
  });

  const handleFetchStakingBalance = async () => {
    console.log("Fetching staking balance for address:", address); // Log address for debugging
    setLoading(true);
    try {
      await fetchStakingData();
      if (stakingData !== undefined) {
        console.log("Staking Data:", stakingData); // Log staking data
        setStakingBalance(stakingData.toNumber());
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleFetchStakingBalance} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Staking Balance'}
      </button>
      {stakingError && <p>Error fetching staking balance: {stakingError.message}</p>}
      {stakingBalance !== null && (
        <div>
          <p>Staking Balance:</p>
          <input type="text" value={stakingBalance} readOnly />
        </div>
      )}
    </div>
  );
}

export default StakingInfo;
