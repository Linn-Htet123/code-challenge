import { SWAP_SUBMIT_DELAY_MS } from "../../config/constants";
import type { SwapRequest, SwapResponse } from "../../types";
import { simulateApiCall, generateTxHash } from "../../utils/apiSimulator";

export const submitSwap = async (payload: SwapRequest): Promise<SwapResponse> => {
    const response: SwapResponse = {
        success: true,
        txHash: generateTxHash(),
        fromToken: payload.fromToken,
        toToken: payload.toToken,
        fromAmount: payload.fromAmount,
        toAmount: payload.toAmount,
        timestamp: new Date().toISOString(),
    };

    return simulateApiCall(response, SWAP_SUBMIT_DELAY_MS, 0.1, "Swap failed. Please try again.");
};
