import React, { createContext, useContext } from 'react';
import { useAccount, useBalance, useChainId } from 'wagmi';

interface WalletContextType {
  address: string | undefined;
  isConnected: boolean;
  balance: bigint | undefined;
  chainId: number | undefined;
  isWrongNetwork: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balanceData } = useBalance({
    address,
  });

  const isWrongNetwork = chainId !== 11155111; // Sepolia testnet

  const value: WalletContextType = {
    address,
    isConnected,
    balance: balanceData?.value,
    chainId,
    isWrongNetwork,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}
