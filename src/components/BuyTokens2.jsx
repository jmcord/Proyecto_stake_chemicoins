import React, { useState } from 'react';
import { Button } from './ui';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';
import Web3 from 'web3'; // Import Web3 library

export default function BuyTokensForm2() {
  const [ethAmount, setEthAmount] = useState('');
  const web3 = new Web3(window.ethereum);

  // Prepare contract write configuration
  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'buyChemicoins2',
    args: [] // No arguments needed for this function
  });

  // Initialize contract write hook
  const { data: writeData, write } = useContractWrite(config);

  // Initialize transaction wait hook
  const { isLoading: isTransactionLoading } = useWaitForTransaction({
    hash: writeData?.hash
  });

  // Handle input change event
  const handleEthAmountChange = (event) => {
    setEthAmount(event.target.value);
  };

  // Handle buy tokens event
  const handleBuyTokens = async () => {
    // Check if a valid amount of ETH is entered by the user
    if (!ethAmount || parseFloat(ethAmount) <= 0) {
      // Show error message or alert to the user
      return;
    }

    // Calculate the amount of tokens to buy based on the ETH amount
    const ethAmountFloat = parseFloat(ethAmount);
    const tokenPrice = 0.01; // 0.01 ETH per token
    const tokensToBuy = ethAmountFloat / tokenPrice;

    console.log('Tokens to buy:', tokensToBuy); // Log the tokens to buy to the console

    try {
      // Send Ethereum to an address using MetaMask
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: window.ethereum.selectedAddress,
            to: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
            value: web3.utils.toWei(ethAmount, 'ether'),
            gasLimit: '0x5028',
            maxPriorityFeePerGas: '0x3b9aca00',
            maxFeePerGas: '0x2540be400',
          },
        ],
      });

      // Wait for the user to send the ETH and then call the contract function to buy the tokens
      write();
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error:', error);
      // Show an error message to the user
    }
  };

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <h2>Buy Tokens</h2>
      <div>
        <label htmlFor="ethAmount">Amount of ETH:</label>
        <input
          type="number"
          id="ethAmount"
          value={ethAmount}
          onChange={handleEthAmountChange}
          placeholder="Enter amount of ETH"
        />
      </div>
      <Button
        disabled={!write && isTransactionLoading}
        onClick={handleBuyTokens}
        isLoading={isTransactionLoading}
      >
        {isTransactionLoading ? 'Buying Tokens...' : 'Buy Tokens'}
      </Button>
    </section>
  );
}
