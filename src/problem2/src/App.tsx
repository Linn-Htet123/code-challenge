import { ThemeToggle } from "./components/ui/theme-toggle";
import { SwapForm } from "./components/swap/SwapForm";

export default function App() {
  return (
    <div className="relative min-h-screen bg-gray-50 text-black dark:bg-[#06060f] dark:text-white transition-colors duration-300 flex flex-col font-sans overflow-hidden">
      <header className="w-full flex justify-end items-center p-6 relative z-50">
        <ThemeToggle />
      </header>

      <main className="grow flex items-center justify-center p-4 relative z-10">
        <SwapForm />
      </main>
    </div>
  );
}
