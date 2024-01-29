import { Button, TextInput, Title } from './ui'
import { useState, useEffect } from 'react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { blockmakerTokenABI } from '../contracts/ABIs'

export default function TransferTokensForm() {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')

  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'buyChemicoins',
    args: [to, BigInt(amount * 10 ** 18)]
  })

  const { data: writeData, write } = useContractWrite(config)

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError
  } = useWaitForTransaction({
    hash: writeData?.hash
  })



  const handlerAmountInputChange = (event) => {
    setAmount(event.target.value)
  }

  useEffect(() => {
    if (isTransactionSuccess) {
      setTo('')
      setAmount('')
      console.log('Transacción Completada!')
    }
    if (isTransactionError) {
      console.log('Transacción Fallida!')
    }
  }, [isTransactionSuccess, isTransactionError])

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <Title>TransferForm</Title>

      <form className="grid gap-4">
        <TextInput type="number" placeholder="Amount" onChange={handlerAmountInputChange} />
        <Button disabled={!write || isTransactionLoading} onClick={() => write?.()} isLoading={isTransactionLoading}>
          {isTransactionLoading ? 'Transfiriendo CHE tokens...' : 'Transferir CHE tokens'}
        </Button>
      </form>
    </section>
  )
}