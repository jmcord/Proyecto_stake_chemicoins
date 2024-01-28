import { useBalance, useAccount } from 'wagmi'
import { ErrorInfo } from './ui'

export default function TokenBalance() {
  const { address, isConnected } = useAccount()

  const { data, isLoading } = useBalance({
    address,
    token: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    watch: true
  })

  if (isLoading) return <div>Loading...</div>

  const tokenBalance = data?.formatted

  return (
    <div className="bg-white flex w-fit p-1 rounded-md text-xs md:text-base border shadow items-center gap-2">
      <p>TokenBalance</p>
      {isConnected ? (
        <p>
          {tokenBalance} {data?.symbol}
        </p>
      ) : (
        <ErrorInfo message="Conecta tu wallet para ver tu balance de BM" />
      )}
    </div>
  )
}