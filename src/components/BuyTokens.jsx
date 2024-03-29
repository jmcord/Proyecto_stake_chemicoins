import React, { useState } from 'react';
import { Button, TextInput } from './ui';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';
import Web3 from 'web3'; // Importa la biblioteca de Web3
import { etherUnits } from 'viem';

export default function BuyTokensForm() {
  const [amount, setAmount] = useState('');
  const web3 = new Web3(window.ethereum); // Inicializa una instancia de Web3

  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'buyChemicoins',
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

  const handleBuyTokens = async () => {
    // Verificar si el usuario ha ingresado una cantidad válida
    if (!amount || parseFloat(amount) <= 0) {
      // Mostrar mensaje de error o alerta al usuario
      return;
    }

    // Calcular el monto de ETH necesario para comprar los tokens (0.01 ETH por token)
    const ethAmount = parseFloat(amount) * 0.01;

    // Convertir el monto de ETH a wei
    const weiAmount = web3.utils.toWei(ethAmount.toString(), 'ether');

    console.log('Valor de weiAmount:', weiAmount); // Mostrar el valor de weiAmount en la consola
    console.log('Valor de ethAmount:', ethAmount); // Mostrar el valor de weiAmount en la consola
    try {
      // Obtener la dirección seleccionada por el usuario en MetaMask utilizando eth_accounts
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const from = accounts[0];
      console.log(from)
      // Solicitar al usuario que apruebe y envíe la cantidad de ETH necesaria a través de Metamask
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          to: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
          from: from,
          value: web3.utils.toWei(String(ethAmount),"ether"), // Convertir a string para evitar errores
          gas: '50000' // Ajustar el gas según sea necesario
        }],
      });

      // Esperar a que el usuario envíe los ETH y luego llamar a la función del contrato para comprar los tokens
      write();
    } catch (error) {
      // Manejar cualquier error que ocurra durante el proceso
      console.error('Error:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <h2>Buy Tokens</h2>
      <form className="grid gap-4">
        <TextInput
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountInputChange}
        />
        <Button
          disabled={!write && isTransactionLoading}
          onClick={handleBuyTokens}
          isLoading={isTransactionLoading}
        >
          {isTransactionLoading ? 'Buying Tokens...' : 'Buy Tokens'}
        </Button>
      </form>
    </section>
  );
}
