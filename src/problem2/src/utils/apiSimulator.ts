/**
 * Simulates a delayed API response with optional random failure.
 *
 * @param data - The resolved data to return on success
 * @param delayMs - How long to wait before resolving/rejecting (ms)
 * @param failureRate - Probability of failure between 0 and 1 (default: 0.1)
 * @param errorMessage - Custom error message on failure
 */
export const simulateApiCall = <T>(
    data: T,
    delayMs: number,
    failureRate = 0.1,
    errorMessage = "Something went wrong. Please try again."
): Promise<T> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < failureRate) {
                reject(new Error(errorMessage));
            } else {
                resolve(data);
            }
        }, delayMs);
    });
};

/**
 * Simple delay utility — resolves after the given number of ms.
 */
export const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generates a mock transaction hash.
 */
export const generateTxHash = (): string => {
    return `0x${Array.from({ length: 16 }, () =>
        Math.floor(Math.random() * 16).toString(16)
    ).join("")}`;
};
