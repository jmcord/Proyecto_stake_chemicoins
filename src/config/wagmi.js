import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import { avalancheFuji, sepolia } from 'wagmi/chains'
import { bscTestnet } from 'wagmi/chains'


export const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: import.meta.env.VITE_ALCHEMY_ID, // or infuraId
    walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,

    // Required
    appName: "Chemicoins Stake",
    chains: [bscTestnet,sepolia,avalancheFuji]
  }),
);

