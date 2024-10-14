import { clsx } from 'clsx';
import useOnchainCoffeeMemos from '../_hooks/useOnchainCoffeeMemos';
import FormBuyCoffee from './FormBuyCoffee';
import Memos from './Memos';
import RewardTransaction from './RewardTransaction'; // Import the RewardTransaction component
import { useAccount, useBalance } from 'wagmi';

export default function RewardPage() {
  const { memos, refetchMemos } = useOnchainCoffeeMemos();
  const { address, isConnected } = useAccount();
  const { data: balanceData, isLoading: isLoadingBalance } = useBalance({
    address: address,
    watch: true, // Automatically update the balance when it changes
  });

  return (
    <div
      className={clsx([
        'grid grid-cols-1 items-stretch justify-start',
        'md:grid-cols-2CoffeeMd md:gap-9 lg:grid-cols-2CoffeeLg',
      ])}
    >
      <section
        className={clsx([
          'rounded-lg border border-boat-color-palette-line border-solid',
          'bg-boat-color-palette-backgroundalternate p-10',
        ])}
      >
        <h2 className="mb-5 w-fit font-semibold text-2xl text-white">
          Messages from supporters
        </h2>

        {memos?.length > 0 && <Memos memos={memos} />}
      </section>
      <aside>
        <div
          className={clsx([
            'mt-10 rounded-lg border border-boat-color-palette-line border-solid',
            'bg-boat-color-palette-backgroundalternate p-10 md:mt-0',
          ])}
        >
          <FormBuyCoffee refetchMemos={refetchMemos} />
        </div>
      </aside>
      <aside>
        <div
          className={clsx([
            'mt-10 rounded-lg border border-boat-color-palette-line border-solid',
            'bg-boat-color-palette-backgroundalternate p-10 md:mt-0',
          ])}
        >
          <RewardTransaction />
        </div>
      </aside>
      <section
        className={clsx([
          'mt-10 rounded-lg border border-boat-color-palette-line border-solid',
          'bg-boat-color-palette-backgroundalternate p-10 md:mt-0',
        ])}
      >
        <h2 className="mb-5 w-fit font-semibold text-2xl text-white">
          Your Ethereum Balance
        </h2>
        {isLoadingBalance ? (
          <p>Loading balance...</p>
        ) : (
          <p>Your balance: {balanceData?.formatted} ETH</p>
        )}
      </section>
    </div>
  );
}
