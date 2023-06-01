import { DarkModeToggle } from "./DarkModeToggle";
import { SaveButton } from "./SaveButton";
import { SaveModal } from "./SaveModal";
import {JSONUploadButton} from './JSONUpload'
import { useState } from "react";

function NavBar({ darkMode, setDarkMode, showcaseJSON, setShowcaseJSON }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="grid grid-cols-3">
      <div className="flex justify-center items-center"><DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} /></div>
      <h1 className="text-4xl text-center p-10 dark:text-white">
        Showcase Creator UI
      </h1>
      <div className="flex justify-center items-center">
        
        {showModal ? (
          <SaveModal setShowModal={setShowModal} showcaseJSON={showcaseJSON} />
        ) : null}
        <JSONUploadButton setShowcaseJSON={setShowcaseJSON} />
        <SaveButton setShowModal={setShowModal} />
      </div>
    </div>
  );
}

export { NavBar };
