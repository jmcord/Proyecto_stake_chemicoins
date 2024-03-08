import React, { useState } from 'react';
import { TokenBalance, Owner, TokenInfo, TransferTokensForm, BuyTokens } from '../components';
import ClaimRewardsForm from '../components/ClaimRewardsForm';
import MintTokensForm from '../components/MintTokens';
import StakingForm from '../components/StakingForm';
import StakingInfo from '../components/StakingInfo';
import UnstakeTokensForm from '../components/UnstakeTokensForm';
import About from '../components/About'; // Import the About component

export default function Home() {
  const [tab, setTab] = useState('home'); // State to manage the active tab

  const handleTabChange = (tabName) => {
    setTab(tabName);
  };

  return (
    <section className="flex flex-col place-items-center gap-4 py-20 px-20">
      <h1>Blockmaker ERC20 Token</h1>
      {/* Tab navigation */}
      <div className="flex gap-4">
        <button onClick={() => handleTabChange('home')}>Home</button>
        <button onClick={() => handleTabChange('about')}>About</button>
      </div>
      {/* Content based on active tab */}
      {tab === 'home' && (
        <>
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
        </>
      )}
      {tab === 'about' && <About />}
    </section>
  );
}
