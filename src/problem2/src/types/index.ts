export interface TokenPrice {
    currency: string;
    date: string;
    price: number;
}

export interface SwapRequest {
    fromToken: string;
    toToken: string;
    fromAmount: number;
    toAmount: number;
}

export interface SwapResponse {
    success: boolean;
    txHash: string;
    fromToken: string;
    toToken: string;
    fromAmount: number;
    toAmount: number;
    timestamp: string;
}
