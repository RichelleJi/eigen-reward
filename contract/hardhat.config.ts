import type { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';

const config: HardhatUserConfig = {
  solidity: '0.8.20',
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};

export default config;
