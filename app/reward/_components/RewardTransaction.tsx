import { useState } from 'react';
import { useAccount } from 'wagmi';

const RewardTransaction = () => {
  const { isConnected, address } = useAccount();
  const [eigenRewards, setEigenRewards] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculateRewards = async () => {
    //todo: caldulate rewards ahead of time here
    try {
      const response = await fetch('/api/rewards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error);
      }

      const data = await response.json();
      setEigenRewards(data.eigenRewards);
      setError(null);
    } catch (err) {
      setError(err.message);
      setEigenRewards(null);
    }
  };

  return (
    <div>
      <h2>Calculate EIGEN Rewards</h2>
      {isConnected ? (
        <div>
          <button onClick={handleCalculateRewards}>Calculate Rewards</button>
          {error && <p style={{color: 'red'}}>{error}</p>}
          {eigenRewards !== null && (
            <p>Your EIGEN rewards: {eigenRewards}</p>
          )}
        </div>
      ) : (
        <p>Please connect your wallet to calculate rewards.</p>
      )}
    </div>
  );
};

export default RewardTransaction;