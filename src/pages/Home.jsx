import { TokenBalance, Owner, TokenInfo, TransferTokensForm, BuyTokens }  from '../components'  //{ TokenBalance, Owner, TokenInfo, TransferTokensForm } from '../components'
import MintTokensForm from '../components/MintTokens'

export default function Home() {
  return (
    <section className="flex flex-col place-items-center gap-4 py-20 px-20">
      <h1>Blockmaker ERC20 Token</h1>
      <TokenBalance />
      <Owner />
      <TokenInfo />
      <MintTokensForm />
      <BuyTokens />
      <TransferTokensForm />
      
    </section>
  )
}