import type { SwapResponse } from "../../types";

interface SwapSuccessMessageProps {
  txResult: SwapResponse;
  resetSwap: () => void;
}

export function SwapSuccessMessage({
  txResult,
  resetSwap,
}: SwapSuccessMessageProps) {
  return (
    <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-bg-modal/80 border border-gray-100 dark:border-white/10 backdrop-blur-xl shadow-2xl animate-fade-up text-center space-y-6">
      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-10 h-10 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Swap Successful!
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Successfully swapped {txResult.fromAmount} {txResult.fromToken} for{" "}
        {txResult.toAmount} {txResult.toToken}.
      </p>
      <button
        onClick={resetSwap}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all mt-4 cursor-pointer"
      >
        Swap Again
      </button>
    </div>
  );
}
