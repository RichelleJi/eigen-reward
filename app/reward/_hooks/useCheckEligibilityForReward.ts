import { useState, useEffect } from 'react';
import { useBalance } from 'wagmi';

const ONE_ETHER_IN_WEI = BigInt(10 ** 18);

export const useCheckEligibilityForReward = (address?: string) => {
  const { data: ethBalance } = useBalance({
    address: address,
    watch: true,
  });

  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ethBalance) {
      setIsEligible(null);
      setError(null);
      return;
    }

    if (ethBalance.value < ONE_ETHER_IN_WEI) {
      setIsEligible(false);
      setError('You need at least 1 ETH to be eligible for the reward.');
    } else {
      setIsEligible(true);
      setError(null);
    }
  }, [ethBalance]);

  return { isEligible, error };
};
