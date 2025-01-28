'use client'

import { useMounted } from "@/hooks/use-mounted";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

export const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useMounted();

  if (!isMounted) return null;
  
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleDarkMode} className="w-12">
      <div className="rounded-full p-1 transition-all border-2 w-16 bg-light-bg dark:bg-dark-bg">
        {theme === "dark" ? (
          <SunIcon className="h-6 w-6 text-yellow-300  ml-8" />
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-700" />
        )}
      </div>
    </button>
  );
}
