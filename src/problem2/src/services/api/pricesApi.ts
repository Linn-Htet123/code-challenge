import type { TokenPrice } from "../../types";
import axiosInstance from "../shared/axiosInstance";
import env from "../../config/env";

export const fetchTokenPrices = async (): Promise<TokenPrice[]> => {
    const path = new URL(env.PRICES_API_URL).pathname;
    const { data } = await axiosInstance.get<TokenPrice[]>(path);
    return data;
};
