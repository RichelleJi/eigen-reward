'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { sepolia, localhost } from 'wagmi/chains';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

const config = createConfig({
  chains: [sepolia, localhost],
  transports: {
    [sepolia.id]: http(),
    [localhost.id]: http('http://127.0.0.1:8545'),
  },
});

function OnchainProviders({ children }: Props) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
