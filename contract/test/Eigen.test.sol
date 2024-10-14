import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import chai, { expect } from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber, Contract, ContractFactory } from 'ethers'
import { ethers } from 'hardhat'

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

  beforeEach(async () => {
    wallets = await ethers.getSigners()
    wallet0 = wallets[0]
    wallet1 = wallets[1]
    wallet2 = wallets[2]
    const eigenFactory = await ethers.getContractFactory('Eigen', wallet0)
    eigen = await eigenFactory.deploy(BigNumber.from(1000), overrides) // Initial supply of 1000
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

  describe('#claimRewards', () => {
    it("should allow a user to claim rewards", async function () {
        const rewardAmount = ethers.utils.parseUnits("1", 18);

        await expect(eigen.connect(wallet2).claimRewards(rewardAmount)) // Pass a reward amount
        .to.emit(eigen, 'RewardsClaimed')
        .withArgs(wallet2.address, rewardAmount)

      // Check balances after claiming
      expect(await eigen.balanceOf(wallet2.address)).to.eq(rewardAmount)
      expect(await eigen.rewarded(wallet2.address)).to.be.true
    })

    it('should revert if rewards have already been claimed', async () => {
      const rewardAmount = ethers.utils.parseUnits("1", 18);
      const wallet2Claim = await eigen.connect(wallet2).claimRewards(rewardAmount)

      await expect(eigen.connect(wallet2).claimRewards(rewardAmount)).to.be.revertedWith('Already claimed reward')
    })

    it('should revert if rewards is zero', async () => {
        const rewardAmount = BigNumber.from(0);

        await expect(eigen.connect(wallet2).claimRewards(rewardAmount)).to.be.revertedWith('No rewards to claim')
      })
  })
});
