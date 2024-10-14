const fs = require('fs');
const { ethers } = require('hardhat');

async function main() {
  const initialSupply = ethers.utils.parseEther('2');
  const Eigen = await ethers.getContractFactory('Eigen');
  const eigen = await Eigen.deploy(initialSupply);

  await eigen.deployed();
  console.log(`Eigen deployed at ${eigen.address}`);

  const envFilePath = '../.env.local';
  const addressLine = `NEXT_PUBLIC_EIGEN_CONTRACT_ADDRESS=${eigen.address}\n`;
  

  if (fs.existsSync(envFilePath)) {
    let envFileContent = fs.readFileSync(envFilePath, 'utf8');
    if (envFileContent.includes('NEXT_PUBLIC_EIGEN_CONTRACT_ADDRESS=')) {
      envFileContent = envFileContent.replace(
        /NEXT_PUBLIC_EIGEN_CONTRACT_ADDRESS=.*/g,
        addressLine,
      );
    } else {
      envFileContent += addressLine;
    }
    fs.writeFileSync(envFilePath, envFileContent);
  } else {
    fs.writeFileSync(envFilePath, addressLine);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
