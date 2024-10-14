import { useState, useEffect } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { formatUnits, type Hex } from 'viem';
import { useCheckEligibilityForReward } from '../_hooks/useCheckEligibilityForReward';

interface RewardResponse {
  eigenRewards: number;
}

const ERROR_MESSAGES = {
  fetchError: 'Failed to fetch rewards. Please try again.',
  walletNotConnected: 'Please connect your wallet to claim rewards.',
  notEligible: 'You need at least 1 ETH to be eligible for the reward.',
};

const RewardTransaction = () => {
  const { isConnected, address } = useAccount();
  const [eigenRewards, setEigenRewards] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isEligible } = useCheckEligibilityForReward(address);
  const chainId = useChainId();

  useEffect(() => {
    setEigenRewards(null);
    setError(null);
  }, [address]);

  const claimReward = async (
    rewardAddress: string,
  ): Promise<RewardResponse> => {
    const response = await fetch('/api/rewards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rewardAddress, chainId }),
    });

    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.error || ERROR_MESSAGES.fetchError);
    }

    return response.json();
  };

  const handleClaimReward = async () => {
    try {
      const data = await claimReward(address as Hex);
      setEigenRewards(data.eigenRewards);
      setError(null);
    } catch (err) {
      setError(err.message);
      setEigenRewards(null);
    }
  };

  return (
    <div>
      <h2 className="mb-5 w-fit font-semibold text-2xl text-white">Reward</h2>
      {isConnected ? (
        <div>
          {isEligible ? (
            <>
              <button
                className="me-2 mb-2 rounded-full bg-gray-800 px-5 py-2.5 font-medium text-sm text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-gray-700 dark:hover:bg-gray-700"
                onClick={handleClaimReward}
              >
                claim
              </button>
              {error && <p className="text-red-500">{error}</p>}
              {eigenRewards && (
                <p className="text-green-500">
                  You got {formatUnits(eigenRewards, 18)}EG!
                </p>
              )}
            </>
          ) : (
            <p className="text-red-500">{ERROR_MESSAGES.notEligible}</p>
          )}
        </div>
      ) : (
        <p>{ERROR_MESSAGES.walletNotConnected}</p>
      )}
    </div>
  );
};

export default RewardTransaction;
