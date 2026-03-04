/**
 * Returns a Tailwind font-size class that shrinks as the value string gets longer,
 * preventing numeric input text from overflowing its container.
 */
export function getAmountFontSizeClass(valueLen: number): string {
    if (valueLen <= 7) return "text-4xl";
    if (valueLen <= 10) return "text-3xl";
    if (valueLen <= 13) return "text-2xl";
    return "text-xl";
}
