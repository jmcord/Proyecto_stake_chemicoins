import { TokenBalance, Owner, TokenInfo, TransferTokensForm, BuyTokens }  from '../components'  //{ TokenBalance, Owner, TokenInfo, TransferTokensForm } from '../components'
import ClaimRewardsForm from '../components/ClaimRewardsForm'
import MintTokensForm from '../components/MintTokens'
import StakingForm from '../components/StakingForm'
import StakingInfo from '../components/StakingInfo'
import UnstakeTokensForm from '../components/UnstakeTokensForm'

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
      <StakingForm />
      <UnstakeTokensForm />
      <ClaimRewardsForm />
      <StakingInfo />
      
    </section>
  )
}