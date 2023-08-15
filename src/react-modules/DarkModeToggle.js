import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function DarkModeToggle({ darkMode, setDarkMode }) {
  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }

  return (
    <>
      <div className="">
        <button onClick={toggleDarkMode} className="w-12">
          <div
            className={` rounded-full p-1 transition-all ${
              darkMode ? "bg-dark-bg" : "bg-light-bg"
            }`}
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-yellow-300  ml-4" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-700" />
            )}
          </div>
        </button>
      </div>
    </>
  );
}

export { DarkModeToggle };
