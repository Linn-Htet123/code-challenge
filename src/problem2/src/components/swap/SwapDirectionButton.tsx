import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

interface SwapDirectionButtonProps {
  onClick: () => void;
  className?: string;
}

export function SwapDirectionButton({
  onClick,
  className = "",
}: SwapDirectionButtonProps) {
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    onClick();
    setTimeout(() => setIsSwapping(false), 600);
  };

  return (
    <div className={`flex justify-center -my-4 relative z-10 ${className}`}>
      <button
        type="button"
        onClick={handleSwap}
        aria-label="Swap directions"
        className={`w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 border-4 border-gray-50 dark:border-gray-900 rounded-full shadow-md hover:scale-105 transition-transform cursor-pointer
          ${isSwapping ? "animate-swap-bounce" : ""}
        `}
      >
        <ArrowUpDown className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
      </button>
    </div>
  );
}
