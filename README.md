# Eigan Reward Project 

## Overview
The Eigan Reward Project enables the users to claim Eigan tokens based on existing Ethereum holdings, the user can claim 4 Eigan tokens per 1 Eth. 


```
project-root
│
├── /contracts # Smart contracts directory
│ └── EigenToken.sol # Smart contract for minting EIGEN tokens
│
├── /App # NextJs application
│
├── Dockerfile # Dockerfile for deployment
```

## Setup Instructions

1. **Set Up Network on Wallet**: Ensure your wallet (e.g., MetaMask) is set up to connect to the appropriate network.
2. **Deploy Eigen Contract**: Run the following command to deploy the Eigen contract:
   ```bash
   npx hardhat run scripts/deployEigen.js --network localhost
   ```
3. **Record Contract Address**: After deployment, record the contract address in the `.env` file for future reference.
4. **Import Wallet**: Import your wallet using any of the following accounts in Hardhat.

## Running the Application Locally

1. **Clone the Repository**: 
   ```bash
   npx hardhat run scripts/deployEigen.js --network localhost
   ```
3. **Record Contract Address**: create `.env` file in root directory and record the contract address: 
    ```bash
    NEXT_PUBLIC_EIGEN_CONTRACT_ADDRESS=<output above>
    ``` 
3. **Test and Help**: 
   ```bash
   npx hardhat help
   npx hardhat test test/Eigen.test.ts
   ``` 
   
   
### Set up Wallet
1. **Set Up Network on Wallet**: Ensure your wallet (e.g., MetaMask) is set up to connect to the appropriate network.
    ![img.png](img.png)
2. **Import Wallet**: Import from any of the following accounts outputted on Hardhat server log.
    ![img_1.png](img_1.png)

### Running the NextJs app  
1. **Save a private key**: in the .env file from one of the addresses in the hardhat server output: 
```bash
NEXT_PRIVATE_WAlLLET_PRIVATE_KEY=<output above>
``` 
1.**Install Dependencies**: 
```bash
yarn 
```

2.**Start the app**: 
   ```bash
   yarn dev 
   ```




## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.