import {
  createWalletClient,
  http,
  publicActions,
  type WalletClient,
} from 'viem';
import { localhost, sepolia } from 'wagmi/chains';
import { privateKeyToAccount, type Account } from 'viem/accounts';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });
/**
 * Creates a wallet client based on the provided chain ID.
 * @param chainId - The ID of the blockchain network (e.g., localhost, Sepolia).
 * @returns A configured WalletClient instance.
 * @throws Error if the private key is invalid or if the chainId is unsupported.
 */
function createViemClient(chainId: number): WalletClient {
  const privateKey: `0x${string}` = `0x${process.env.NEXT_PRIVATE_WAlLLET_PRIVATE_KEY}`;
  const account: Account = privateKeyToAccount(privateKey);

  switch (chainId) {
    case localhost.id:
      return createWalletClient({
        account,
        chain: localhost,
        transport: http('http://127.0.0.1:8545'),
      }).extend(publicActions);
    case sepolia.id:
      const alchemyKey = process.env.NEXT_PRIVATE_ALCHEMY_PRIVATE_KEY;
      return createWalletClient({
        account,
        chain: sepolia,
        transport: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}`),
      }).extend(publicActions);
    default:
      throw new Error(
        `Unsupported chainId: ${chainId}. Supported chain IDs are: ${localhost.id}, ${sepolia.id}.`,
      );
  }
}

export default createViemClient;
