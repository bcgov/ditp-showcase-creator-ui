'use client'

import { useMounted } from "@/hooks/use-mounted";
import { Sun, Moon } from "lucide-react";
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
          <Sun className="w-6 h-6"/>
        ) : (
          <Moon className="w-6 h-6"/>
        )}
      </div>
    </button>
  );
}
