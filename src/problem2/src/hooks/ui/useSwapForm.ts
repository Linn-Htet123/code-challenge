import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { swapFormSchema, type SwapFormValues } from "../../utils/validation";
import { useTokenPrices } from "../api/useTokenPrices";
import { useSwap } from "../api/useSwap";
import { DEFAULT_FROM_TOKEN, DEFAULT_TO_TOKEN } from "../../config/constants";
import { getTokenPrice, calculateExchangeRate, calculateToAmount } from "../../utils/swap";

export const useSwapForm = () => {
    const { data: prices, isLoading: pricesLoading } = useTokenPrices();
    const { swap, isLoading: swapLoading, txResult, reset: resetSwap } = useSwap();

    const form = useForm<SwapFormValues>({
        resolver: zodResolver(swapFormSchema),
        defaultValues: {
            fromToken: DEFAULT_FROM_TOKEN,
            toToken: DEFAULT_TO_TOKEN,
            fromAmount: 1,
        },
        mode: "onChange",
    });

    const { setValue, handleSubmit, control, watch } = form;

    const fromToken = watch("fromToken");
    const toToken = watch("toToken");
    const fromAmount = watch("fromAmount") || 0;

    const fromPrice = prices ? getTokenPrice(prices, fromToken) : 0;
    const toPrice = prices ? getTokenPrice(prices, toToken) : 0;
    const exchangeRate = calculateExchangeRate(fromPrice, toPrice);

    const expectedToAmount = calculateToAmount(fromAmount, exchangeRate);
    const usdValue = Number((fromAmount * fromPrice).toFixed(2));

    useEffect(() => {
        if (fromToken === toToken) {
            form.trigger("toToken");
        } else {
            form.clearErrors("toToken");
        }
    }, [fromToken, toToken, form]);

    const onSwapDirection = () => {
        const currentFromToken = fromToken;
        const currentToToken = toToken;

        setValue("fromToken", currentToToken);
        setValue("toToken", currentFromToken);

        setTimeout(() => form.trigger(), 50);
    };

    const onSubmit = (data: SwapFormValues) => {
        const finalToAmount = calculateToAmount(data.fromAmount, exchangeRate);

        swap({
            fromToken: data.fromToken,
            toToken: data.toToken,
            fromAmount: data.fromAmount,
            toAmount: finalToAmount,
        });
    };

    return {
        form,
        control,
        handleSubmit: handleSubmit(onSubmit),
        onSwapDirection,
        prices: prices || [],
        pricesLoading,
        swapLoading,
        txResult,
        resetSwap,
        fromPrice,
        toPrice,
        exchangeRate,
        expectedToAmount,
        usdValue,
    };
};
