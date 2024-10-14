// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract Eigen is ERC20 {
    using SafeERC20 for IERC20;

    mapping(address => bool) public rewarded;
    event RewardsClaimed(address indexed user, uint256 amount);

    constructor(uint256 initialSupply) ERC20("Eigen", "EG") {
        require(initialSupply > 0, "Initial supply must be greater than zero");
        _mint(msg.sender, initialSupply);
    }

    function claimRewards(uint256 rewardAmount) external {
        require(!rewarded[msg.sender], "Already claimed reward");
        require(rewardAmount > 0, "No rewards to claim");

        _mint(msg.sender, rewardAmount);
        rewarded[msg.sender] = true;

        emit RewardsClaimed(msg.sender, rewardAmount);
    }
}
