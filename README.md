# Eigen Reward Project 

## Overview
The Eigen Reward Project enables users to claim Eigen tokens based on existing Ethereum holdings. Users can claim 4 Eigen tokens per 1 ETH. 


## Project Structure
```
project-root
│
├── /contract                  # Smart contract directory
│   └── EigenToken.sol         # Smart contract for minting EIGEN tokens
│
└─── /App                      # Next.js application
    ├── /reward               # Next.js reward page
    └── /api                  # Next.js reward route

```

## Setup Instructions
### Run Hardhat Locally
1. **Run Hardhat**
   ```bash
   cd contract
   npm install
   npm run node
   ```
2. **Deploy Eigen Contract**: Run the following command to deploy the Eigen contract from the `contract` directory:
   ```bash
   npm run deploy 
   ```
3. **Test and Help**: Run the following command to test the Eigen contract:
   ```bash
   npx hardhat help
   npx hardhat test test/Eigen.test.ts  # Ensure the test file is located in the `test` directory.
   ```

### Set Up Wallet
1. **Set Up Network on Wallet**: Ensure your wallet (e.g., MetaMask) is set up to connect to the appropriate network.
    
     <img src="public/doc/img.png" alt="Description" width="200" height="400">

2. **Import Wallet**: Import from any of the following accounts outputted on the Hardhat server log.
    <img src="public/doc/img_1.png" alt="Description" width="400" height="400">

### Running the Next.js App
1. **Install Dependencies**: In the root directory 
   ```bash
   yarn 
   ```
2. **Set Wallet Environment Variable**: Use one of the wallet's private keys printed in the Hardhat console earlier:
   ```bash
   # In the env. file at the root level
   NEXT_PUBLIC_EIGEN_CONTRACT_ADDRESS=<contract address>
   ```

3. **Start the App**: 
   ```bash
   yarn dev 
   ```

### See Demo
![Demo](public/doc/Eigan-rewards-demo.gif)


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
