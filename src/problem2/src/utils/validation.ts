import { z } from "zod";
import { MIN_SWAP_AMOUNT, MAX_SWAP_AMOUNT } from "../config/constants";

export const swapFormSchema = z
    .object({
        fromToken: z.string().min(1, "Please select a token to swap from"),
        toToken: z.string().min(1, "Please select a token to swap to"),
        fromAmount: z.number().positive("Amount must be greater than zero")
            .min(MIN_SWAP_AMOUNT, `Minimum amount is ${MIN_SWAP_AMOUNT}`)
            .max(MAX_SWAP_AMOUNT, `Maximum amount is ${MAX_SWAP_AMOUNT}`),
    })
    .refine((data) => data.fromToken !== data.toToken, {
        message: "Cannot swap identical tokens",
        path: ["toToken"],
    });

export type SwapFormValues = z.infer<typeof swapFormSchema>;
