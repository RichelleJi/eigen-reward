import { useEffect } from 'react';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import eigenABI from '../../contracts/eigenAbi';
import { formatUnits } from 'viem';

export default function BalanceDisplay() {
  const { address, isConnected } = useAccount();
  const {
    data: ethBalance,
    isLoading: isLoadingEthBalance,
    error: ethBalanceError,
  } = useBalance({
    address: address,
    watch: true,
  });
  const {
    data: egBalance,
    isLoading: isLoadingEgBalance,
    error: egBalanceError,
  } = useReadContract({
    abi: eigenABI,
    address: process.env.NEXT_PUBLIC_EIGEN_CONTRACT_ADDRES as `0x${string}`,
    functionName: 'balanceOf',
    args: [address],
    query: {
      refetchInterval: 10000,
    },
  });

  useEffect(() => {
    if (ethBalanceError) {
      console.error('Error fetching balance:', ethBalanceError);
    }
    if (egBalanceError) {
      console.error('Error fetching eigen balance:', egBalanceError);
    }
  });

  return (
    <div>
      <div>
        <h2 className="mb-5 w-fit font-semibold text-2xl text-white">
          Your Balance
        </h2>
        {isLoadingEthBalance ? (
          <p>Loading balance...</p>
        ) : (
          <p>
            {' '}
            ETH:{' '}
            {ethBalance
              ? formatUnits(ethBalance.value, 18)
              : 'No balance data available'}
          </p>
        )}
      </div>
      <div>
        {isLoadingEgBalance ? (
          <p>Loading eigen balance...</p>
        ) : (
          <p>
            {' '}
            EG:{' '}
            {egBalance
              ? formatUnits(egBalance, 18)
              : 'No eigen balance data available'}
          </p>
        )}
      </div>
    </div>
  );
}
