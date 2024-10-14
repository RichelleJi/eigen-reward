import chai, { expect } from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber, Contract, ContractFactory, BigNumberish} from 'ethers'
import { ethers } from 'hardhat'
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

chai.use(solidity)

const overrides = {
  gasLimit: 9999999,
}

describe('Eigen tests', () => {
  let eigen: Contract
  let wallet0: SignerWithAddress
  let wallet1: SignerWithAddress
  let wallet2: SignerWithAddress
  let wallets: SignerWithAddress[]
  let rewardAmount: BigNumber

  beforeEach(async () => {
    wallets = await ethers.getSigners()
    wallet0 = wallets[0]
    wallet1 = wallets[1]
    wallet2 = wallets[2]
    const eigenFactory = await ethers.getContractFactory('Eigen', wallet0)
    eigen = await eigenFactory.deploy(BigNumber.from(1000), overrides) // Initial supply of 1000
    rewardAmount = ethers.utils.parseUnits("1", 18);
  })

  describe('#constructor', () => {
    it('should set the initial supply correctly', async () => {
      expect(await eigen.totalSupply()).to.eq(BigNumber.from(1000))
      expect(await eigen.balanceOf(wallet0.address)).to.eq(BigNumber.from(1000))
    })

    it('should revert if initial supply is zero', async () => {
      const eigenFactory = await ethers.getContractFactory('Eigen', wallet1)
      await expect(eigenFactory.deploy(BigNumber.from(0), overrides)).to.be.revertedWith('Initial supply must be greater than zero')
    })
  })

  describe('#claimReward', () => {
    it("should allow a user to claim rewards", async function () {
      await expect(eigen.connect(wallet0).claimReward(rewardAmount, wallet1.address))
      .to.emit(eigen, 'RewardsClaimed')
      .withArgs(wallet1.address, rewardAmount)

      expect(await eigen.balanceOf(wallet1.address)).to.eq(rewardAmount)
      expect(await eigen.rewarded(wallet1.address)).to.be.true
    })

    it('should revert if rewards have already been claimed', async () => {
        await eigen.connect(wallet0).claimReward(rewardAmount,  wallet0.address);

        await expect(eigen.connect(wallet0).claimReward(rewardAmount, wallet0.address)).to.be.revertedWith('Already claimed reward')
    })

    it('should revert if rewards is zero', async () => {
        const rewardAmount = BigNumber.from(0);
        const rewardAddress = wallet0.address;

        await expect(eigen.connect(wallet0).claimReward(rewardAmount, rewardAddress)).to.be.revertedWith('No rewards to claim')
    })

    it('should not allow a user to claim rewards if they are not the owner', async () => {
      await expect(eigen.connect(wallet1).claimReward(rewardAmount, wallet1.address)).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('should allow multiple users to claim rewards independently', async () => {
      await eigen.connect(wallet0).claimReward(rewardAmount, wallet1.address);
      await eigen.connect(wallet0).claimReward(rewardAmount, wallet2.address);

      expect(await eigen.balanceOf(wallet1.address)).to.eq(rewardAmount);
      expect(await eigen.balanceOf(wallet2.address)).to.eq(rewardAmount);
    });
  });
});
