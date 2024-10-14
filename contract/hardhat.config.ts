import type { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const { NEXT_PRIVATE_ALCHEMY_PRIVATE_KEY, NEXT_PRIVATE_WAlLLET_PRIVATE_KEY } =
  process.env;

const config: HardhatUserConfig = {
  solidity: '0.8.20',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${NEXT_PRIVATE_ALCHEMY_PRIVATE_KEY ?? ''}`,
    },
  },
};

export default config;
