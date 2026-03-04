import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/ui/useTheme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="cursor-pointer p-2 mr-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors bg-transparent border-gray-300 dark:border-gray-700"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      ) : (
        <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  );
}
