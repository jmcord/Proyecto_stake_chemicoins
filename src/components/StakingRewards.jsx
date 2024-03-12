import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { blockmakerTokenABI } from '../contracts/ABIs';

function StakingRewards() {
  const [rewards, setRewards] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);

      // Check if Web3 is injected by the browser (MetaMask)
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);

        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Get the selected account from MetaMask
          const accounts = await web3.eth.getAccounts();
          const address = accounts[0]; // Assuming the first account is the user's address

          // Instantiate the contract
          const contract = new web3.eth.Contract(blockmakerTokenABI, import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS);

          // Call the contract method to get the rewards
          const rewards = await contract.methods.getRewards(address).call();

          setRewards(rewards);
          setError(null);
        } catch (error) {
          console.error('Error fetching rewards:', error);
          setError('Error fetching rewards. Please try again.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Web3 is not available. Please install MetaMask to use this feature.');
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  return (
    <div>
      <h2>Rewards</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <p>{rewards !== null ? `Your rewards: ${rewards}` : 'No rewards found.'}</p>
          )}
        </>
      )}
    </div>
  );
}

export default StakingRewards;
