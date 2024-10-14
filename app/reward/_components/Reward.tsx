import { clsx } from 'clsx';
import RewardTransaction from './RewardTransaction';
import BalanceDisplay from './BalanceDisplay';

export default function RewardPage() {
  return (
    <div
      className={clsx([
        'grid grid-cols-1 items-stretch justify-start',
        'md:grid-cols-2CoffeeMd md:gap-9 lg:grid-cols-2CoffeeLg',
      ])}
    >
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
        <BalanceDisplay />
      </section>
    </div>
  );
}
