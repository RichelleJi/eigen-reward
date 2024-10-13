// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Eigen is ERC20 {
    mapping(address => bool) rewarded

    constructor(uint256 initialSupply) ERC20("Eigen", "EG") {
        _mint(msg.sender, initialSupply);
    }


    function reward(uint256 amount) external {
        require(!claimed[msg.sender], "Already claimed air drop");
        claimed[msg.sender] = true;
        _mint(msg.sender, rewardAmount);
    }
}


//
//
//// SPDX-License-Identifier: MIT
//pragma solidity ^0.8.0;
//
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
//
//interface IEigenToken {
//    function mint(address to, uint256 amount) external;
//}
//
//contract EigenRewardClaim is Ownable, ReentrancyGuard {
//    IEigenToken public eigenToken;
//
//    // Mapping to track whether a wallet has claimed rewards
//    mapping(address => bool) public hasClaimed;
//
//    // Event emitted when a user claims their rewards
//    event RewardsClaimed(address indexed user, uint256 amount);
//
//    // Constructor to set the EIGEN token contract
//    constructor(address _eigenTokenAddress) {
//        eigenToken = IEigenToken(_eigenTokenAddress);
//    }
//
//    // Claim rewards function: The frontend/backend passes the precomputed reward amount for the user
//    function claimRewards(uint256 precomputedRewards) external nonReentrant {
//        require(!hasClaimed[msg.sender], "Already claimed rewards");
//        require(precomputedRewards > 0, "No rewards to claim");
//
//        // Mint the precomputed EIGEN tokens to the user
//        eigenToken.mint(msg.sender, precomputedRewards);
//
//        // Mark the user as having claimed their rewards
//        hasClaimed[msg.sender] = true;
//
//        // Emit an event for the claim
//        emit RewardsClaimed(msg.sender, precomputedRewards);
//    }
//
//    // Admin function to reset claim status (for testing or future updates)
//    function resetClaim(address user) external onlyOwner {
//        hasClaimed[user] = false;
//    }
//
//    // Admin function to update the EIGEN token contract address
//    function setEigenTokenAddress(address _eigenTokenAddress) external onlyOwner {
//        eigenToken = IEigenToken(_eigenTokenAddress);
//    }
//}
