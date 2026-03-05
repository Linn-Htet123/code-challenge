import { Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useSwapForm } from "../../hooks/ui/useSwapForm";
import { MAX_SWAP_AMOUNT } from "../../config/constants";
import { CurrencyInput } from "./CurrencyInput";
import { TokenSelectDropdown } from "./TokenSelectDropdown";
import { SwapDirectionButton } from "./SwapDirectionButton";
import { SwapRateInfo } from "./SwapRateInfo";
import { SwapSuccessMessage } from "./SwapSuccessMessage";

export function SwapForm() {
  const {
    form,
    control,
    handleSubmit,
    onSwapDirection,
    prices,
    pricesLoading,
    swapLoading,
    txResult,
    resetSwap,
    exchangeRate,
    expectedToAmount,
    usdValue,
  } = useSwapForm();

  if (pricesLoading) {
    return (
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl animate-pulse flex justify-center items-center h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (txResult) {
    return <SwapSuccessMessage txResult={txResult} resetSwap={resetSwap} />;
  }

  return (
    <div className="w-full max-w-md bg-white/5 dark:bg-bg-modal/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-[2rem] p-4 shadow-2xl relative overflow-hidden animate-fade-up">
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <form onSubmit={handleSubmit} className="relative z-10 space-y-1">
        <div className="bg-gray-50/50 dark:bg-white/[0.03] hover:dark:bg-white/[0.05] border border-gray-100 dark:border-transparent rounded-2xl p-4 transition-colors">
          <div className="flex justify-between items-start gap-4 mb-2">
            <Controller
              name="fromAmount"
              control={control}
              render={({ field }) => (
                <CurrencyInput
                  {...field}
                  value={field.value || ""}
                  label="You pay"
                  type="number"
                  placeholder="0.00"
                  usdValue={usdValue}
                  error={form.formState.errors.fromAmount?.message}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") {
                      field.onChange(0);
                      return;
                    }
                    const parsed = parseFloat(val);
                    if (!isNaN(parsed) && parsed > MAX_SWAP_AMOUNT) return;
                    field.onChange(parsed);
                  }}
                />
              )}
            />
            <Controller
              name="fromToken"
              control={control}
              render={({ field }) => (
                <TokenSelectDropdown
                  value={field.value}
                  onChange={field.onChange}
                  options={prices}
                />
              )}
            />
          </div>
        </div>

        <SwapDirectionButton onClick={onSwapDirection} />

        <div className="bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 rounded-2xl p-4 transition-colors mt-2">
          <div className="flex justify-between items-start gap-4 mb-2">
            <CurrencyInput
              label="You receive"
              type="number"
              placeholder="0.00"
              readOnly
              value={expectedToAmount || ""}
              error={form.formState.errors.toToken?.message}
            />
            <Controller
              name="toToken"
              control={control}
              render={({ field }) => (
                <TokenSelectDropdown
                  value={field.value}
                  onChange={field.onChange}
                  options={prices}
                />
              )}
            />
          </div>
        </div>

        <div className="px-2 py-4 min-h-[60px] flex flex-col justify-end">
          <hr className="border-gray-100 dark:border-white/10 mx-2 my-4" />

          <div className="transition-all duration-300 ease-in-out">
            <SwapRateInfo
              fromToken={form.watch("fromToken")}
              toToken={form.watch("toToken")}
              exchangeRate={exchangeRate}
              fromAmount={form.watch("fromAmount")}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={swapLoading || !form.formState.isValid}
          className="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-indigo-500/25 flex justify-center items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {swapLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Swapping...
            </>
          ) : (
            "Swap"
          )}
        </button>
      </form>
    </div>
  );
}
