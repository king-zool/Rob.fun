import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'Rob.fun',
  projectId: 'robfun-phase2-mvp',
  chains: [sepolia, mainnet],
  ssr: false,
});

// Testnet configuration for development
export const TESTNET_CHAIN_ID = sepolia.id;
export const TESTNET_RPC_URL = 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY';

// Contract addresses (will be set after deployment)
export const CONTRACT_ADDRESSES = {
  tokenFactory: process.env.VITE_TOKEN_FACTORY_ADDRESS || '',
  bondingCurve: process.env.VITE_BONDING_CURVE_ADDRESS || '',
};
