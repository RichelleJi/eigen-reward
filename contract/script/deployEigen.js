const { ethers } = require('hardhat');

async function main() {
  const initialSupply = ethers.utils.parseEther('2'); // Set the initial supply (1 million tokens with 18 decimals)

  const Eigen = await ethers.getContractFactory('Eigen');
  const eigen = await Eigen.deploy(initialSupply);

  await eigen.deployed();
  console.log(`Eigen deployed at ${eigen.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
