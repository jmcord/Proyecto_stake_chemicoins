import React, { useState } from 'react';
import { Button, TextInput } from './ui';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';

export default function UnstakeTokensForm() {
  const [amount, setAmount] = useState('');
  
  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'unstake',
    args: [parseInt(amount)] // Convertir a entero la cantidad ingresada por el usuario
  });

  const { data: writeData, write } = useContractWrite(config);

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError
  } = useWaitForTransaction({
    hash: writeData?.hash
  });

  const handleAmountInputChange = (event) => {
    setAmount(event.target.value);
  };

  const handleUnstakeTokens = () => {
    write();
  };

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <h2>Unstake Tokens</h2>
      <form className="grid gap-4">
        <TextInput
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountInputChange}
        />
        <Button
          disabled={!write || isTransactionLoading}
          onClick={handleUnstakeTokens}
          isLoading={isTransactionLoading}
        >
          {isTransactionLoading ? 'Unstaking Tokens...' : 'Unstake Tokens'}
        </Button>
      </form>
    </section>
  );
}