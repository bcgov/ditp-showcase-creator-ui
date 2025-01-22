import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export const DarkModeToggle = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode: boolean) => !prevDarkMode);
  };

  return (
    <button onClick={toggleDarkMode} className="w-12">
      <div className="rounded-full p-1 transition-all border-2 w-16 bg-light-bg dark:bg-dark-bg">
        {darkMode ? (
          <SunIcon className="h-6 w-6 text-yellow-300  ml-8" />
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-700" />
        )}
      </div>
    </button>
  );
}
