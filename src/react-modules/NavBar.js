import { DarkModeToggle } from "./DarkModeToggle";
import {SaveButton} from "./SaveButton"

function NavBar({ darkMode, setDarkMode, showcaseJSON}) {
  return (
    <div className="grid grid-cols-3">
      <div />
      <h1 className="text-4xl text-center p-10 dark:text-white">
        Showcase Creator UI
      </h1>
      <div className="flex justify-center items-center">
        {" "}
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <SaveButton showcaseJSON={showcaseJSON} />
      </div>
    </div>
  );
}

export { NavBar };
