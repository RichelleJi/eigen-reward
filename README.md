# Eigan Reward Project 

## Overview
The Eigan Reward Project enables users to claim Eigan tokens based on existing Ethereum holdings, the user can claim 4 Eigan tokens per 1 Eth. 


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
### Run hardhat locally
1. **Run hardhat**
      ```bash
   cd contract
   npm install
   npm run node
   ```
2. **Deploy Eigen Contract**: Run the following command to deploy the Eigen contract:
   ```bash
   npm run deploy 
   ```
3. **Test and Help**: Run the following command to deploy the Eigen contract:
   ```bash
   npx hardhat help
   npx hardhat test test/Eigen.test.ts
   ``` 

   
### Set up Wallet
1. **Set Up Network on Wallet**: Ensure your wallet (e.g., MetaMask) is set up to connect to the appropriate network.
    
     <img src="img.png" alt="Description" width="200" height="400">

2. **Import Wallet**: Import from any of the following accounts outputted on Hardhat server log.
    <img src="img_1.png" alt="Description" width="400" height="400">

### Running the NextJs app
1.**Install Dependencies**: in root directory 
```bash
yarn 
```
2.**Set wallet env variable**: use one of wallets' private keys printed in the hardhat console earlier
   ```bash
   //in the env. file on root level
   NEXT_PUBLIC_EIGEN_CONTRACT_ADDRESS=<private key>
   ```

2.**Start the app**: 
   ```bash
   yarn dev 
   ```

### see demo

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.