import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitSwap } from "../../services/api/swapApi";
import type { SwapRequest, SwapResponse } from "../../types";

export const useSwap = () => {
    const [txResult, setTxResult] = useState<SwapResponse | null>(null);

    const mutation = useMutation({
        mutationFn: (payload: SwapRequest) => submitSwap(payload),
        onSuccess: (data) => {
            setTxResult(data);
        },
    });

    return {
        swap: mutation.mutate,
        isLoading: mutation.isPending,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
        txResult,
        reset: () => {
            mutation.reset();
            setTxResult(null);
        },
    };
};
