import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import env from "../../config/env";
import type { TokenPrice } from "../../types";

interface TokenSelectDropdownProps {
  value: string;
  onChange: (token: string) => void;
  options: TokenPrice[];
}

export function TokenSelectDropdown({
  value,
  onChange,
  options,
}: TokenSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((o) =>
    o.currency.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectToken = (currency: string) => {
    onChange(currency);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer"
      >
        <img
          src={`${env.TOKEN_ICONS_BASE_URL}/${value}.svg`}
          alt={value}
          className="w-6 h-6 rounded-full"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <span className="font-semibold text-lg">{value}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-[100] top-full mt-2 right-0 w-64 max-h-72 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl animate-fade-in custom-scrollbar">
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-2 border-b border-gray-100 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search token..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-indigo-500 rounded-lg outline-none text-sm transition-colors"
                autoFocus
              />
            </div>
          </div>

          <div className="p-1">
            {filteredOptions.length === 0 ? (
              <p className="p-4 text-center text-sm text-gray-500">
                No tokens found
              </p>
            ) : (
              filteredOptions.map((token) => (
                <button
                  key={token.currency}
                  type="button"
                  onClick={() => selectToken(token.currency)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                    value === token.currency
                      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`${env.TOKEN_ICONS_BASE_URL}/${token.currency}.svg`}
                      alt={token.currency}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <span className="font-medium">{token.currency}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
