interface SwapRateInfoProps {
  fromToken: string;
  toToken: string;
  exchangeRate: number;
  fromAmount: number;
}

export function SwapRateInfo({
  fromToken,
  toToken,
  exchangeRate,
}: SwapRateInfoProps) {
  const hasRate = exchangeRate > 0;
  if (!hasRate) {
    return <div className="h-[120px] mt-2 hidden" aria-hidden="true" />;
  }

  return (
    <div className="flex flex-col gap-2 mt-2 px-1 text-sm text-gray-500 dark:text-gray-400">
      <div className="flex justify-between items-center py-1">
        <span>Exchange Rate</span>
        <span className="font-medium text-gray-700 dark:text-gray-300">
          1 {fromToken} = {exchangeRate.toFixed(6)} {toToken}
        </span>
      </div>
    </div>
  );
}
