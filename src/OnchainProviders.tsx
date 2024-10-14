'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, localhost } from 'wagmi/chains';
import '@coinbase/onchainkit/styles.css';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

const config = createConfig({
  chains: [mainnet, sepolia, localhost],
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
    [localhost.id]: http('http://127.0.0.1:8545'),
  },
});

function OnchainProviders({ children }: Props) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/*<OnchainKitProvider chain={localhost}>*/}
        <RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
        {/*</OnchainKitProvider>*/}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
