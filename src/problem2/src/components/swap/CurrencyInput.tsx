import { forwardRef } from "react";
import { formatCurrency } from "../../utils/swap";
import { getAmountFontSizeClass } from "../../utils/ui";

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  usdValue?: number;
  error?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ label, usdValue, error, className = "", readOnly, ...props }, ref) => {
    const fontSizeClass = getAmountFontSizeClass(
      String(props.value ?? "").length,
    );

    return (
      <div className={`flex flex-col w-full min-w-0 ${className}`}>
        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          {label}
        </label>

        <input
          {...props}
          ref={ref}
          readOnly={readOnly}
          className={`w-full bg-transparent font-semibold outline-none placeholder-gray-300 dark:placeholder-gray-600 truncate transition-all duration-150 ${fontSizeClass} ${
            error ? "text-red-500" : "text-gray-900 dark:text-white"
          } ${readOnly ? "opacity-75" : ""}`}
        />

        <div className="mt-2 space-y-1">
          <div className="h-5">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {usdValue !== undefined ? formatCurrency(usdValue) : ""}
            </span>
          </div>
          <div className="min-h-4.5">
            {error && (
              <span className="text-xs font-medium text-red-500 animate-fade-in">
                {error}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },
);

CurrencyInput.displayName = "CurrencyInput";
