import React, { useState } from 'react';
import { TokenBalance, Owner, TokenInfo, TransferTokensForm, BuyTokens } from '../components';
import ClaimRewardsForm from '../components/ClaimRewardsForm';
import MintTokensForm from '../components/MintTokens';
import StakingForm from '../components/StakingForm';
import StakingInfo from '../components/StakingInfo';
import StakingRewards from '../components/StakingRewards';
import UnstakeTokensForm from '../components/UnstakeTokensForm';
import About from '../components/About';
import pigCoinLogo from '/Figure_1.png'; // Importa la ruta de la imagen del logo del token

export default function Home() {
  const [tab, setTab] = useState('home');

  const handleTabChange = (tabName) => {
    setTab(tabName);
  };

  return (
    <div className="flex flex-col">
      <section className="flex flex-col place-items-center gap-4 py-20 px-20">
        <div className="flex items-center"> {/* Agrega un contenedor flex para el logo y el título */}
          <img src={pigCoinLogo} alt="PigCOIN Logo" className="w-40 h-40 mr-2" /> {/* Ajusta el tamaño del logo según tus necesidades */}
          <h1>PigCOIN ERC20 Token</h1> {/* Añade el título después del logo */}
        </div>
        <div className="flex gap-4">
          <button onClick={() => handleTabChange('home')}>Home</button>
          <button onClick={() => handleTabChange('about')}>About</button>
        </div>
        {tab === 'home' && (
          <div className="flex flex-wrap justify-center gap-4">
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
            <StakingRewards />
          </div>
        )}
        {tab === 'about' && <About />}
      </section>
    </div>
  );
}
