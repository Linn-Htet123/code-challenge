import type { TokenPrice } from "../types";
import { DECIMAL_PLACES } from "../config/constants";

export const getTokenPrice = (
    prices: TokenPrice[],
    currency: string
): number => {
    const token = prices.find((p) => p.currency === currency);
    return token?.price || 0;
};

export const calculateExchangeRate = (
    fromPrice: number,
    toPrice: number
): number => {
    if (!fromPrice || !toPrice) return 0;
    return fromPrice / toPrice;
};

export const calculateToAmount = (
    fromAmount: number,
    rate: number
): number => {
    if (!fromAmount || !rate) return 0;
    return Number((fromAmount * rate).toFixed(DECIMAL_PLACES));
};

export const formatCurrency = (
    amount: number,
    currency: string = "USD"
): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
    }).format(amount);
};

export const calculateEstimatedFee = (amount: number): number => {
    const fee = amount * 0.001;
    return Math.max(fee, 0.5);
};
