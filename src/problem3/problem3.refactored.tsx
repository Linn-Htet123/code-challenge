import React, { useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // fix 9 — added missing blockchain field to interface
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {} // fix 10 — replaced useless BoxProps extension with proper HTML div props

// fix 5 — moved getPriority outside the component so it is not recreated every render
// fix 8 — blockchain typed as string instead of any
function getPriority(blockchain: string): number {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;

  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances = useMemo<FormattedWalletBalance[]>(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain); // fix 1 — using balancePriority instead of undefined lhsPriority
        return balancePriority > -99 && balance.amount > 0; // fix 2 — changed <= 0 to > 0
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        // fix 3 — ensure comparator returns value when equal
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        return 0;
      })
      .map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      }));
  }, [balances]); // fix 6 — removed prices from dependency array

  const rows = formattedBalances.map((balance: FormattedWalletBalance) => {
    // fix 4 — rows now uses formattedBalances instead of sortedBalances
    const usdValue = prices[balance.currency] * balance.amount;

    return (
      <WalletRow
        key={balance.currency} // fix 7 — removed index key, using stable key
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return (
    <div {...rest}>
      {rows}
      {children} {/* fix 11 — render children instead of discarding them */}
    </div>
  );
};

export default WalletPage;
