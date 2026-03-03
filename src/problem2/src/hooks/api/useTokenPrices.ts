import { useQuery } from "@tanstack/react-query";
import { fetchTokenPrices } from "../services/api/pricesApi";
import type { TokenPrice } from "../types";

const PRICES_QUERY_KEY = ["tokenPrices"] as const;

// Only keep the latest price per currency (API returns duplicates)
const dedupeByLatest = (prices: TokenPrice[]): TokenPrice[] => {
    const map = new Map<string, TokenPrice>();
    for (const item of prices) {
        const existing = map.get(item.currency);
        if (!existing || new Date(item.date) > new Date(existing.date)) {
            map.set(item.currency, item);
        }
    }
    return Array.from(map.values());
};

export const useTokenPrices = () => {
    return useQuery({
        queryKey: PRICES_QUERY_KEY,
        queryFn: fetchTokenPrices,
        select: dedupeByLatest,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
