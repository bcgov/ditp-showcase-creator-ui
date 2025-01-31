'use client'

import { useMounted } from "@/hooks/use-mounted";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Skeleton } from "./ui/skeleton";

export const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useMounted();
  
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!isMounted) return <Skeleton className="border-2 w-16 h-9 bg-transparent rounded-full"/>;

  return (
    <button onClick={toggleDarkMode}>
      <div className="rounded-full p-1 transition-all border-2 w-16 bg-light-bg dark:bg-dark-bg">
        {theme === "dark" ? (
          <Sun className="w-6 h-6 text-yellow-300 ml-6"/>
        ) : (
          <Moon className="w-6 h-6"/>
        )}
      </div>
    </button>
  );
}