import { DarkModeToggle } from "./DarkModeToggle";
import { SaveButton } from "./SaveButton";
import { SaveModal } from "./SaveModal";
import { JSONUploadButton } from './JSONUpload'
import { useState } from "react";
import { NavBarButton } from "./NavBarButton";
import { ArrowDownTrayIcon, BookmarkSquareIcon } from '@heroicons/react/20/solid'


function NavBar({ darkMode, setDarkMode, showcaseJSON, setShowcaseJSON }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
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


      <div className="flex justify-between bg-gray-300 px-8">

        <div className="flex flex-row justify-center gap-3 p-0 h-93 bg-green-800 shadow-md rounded-b-lg">
          
            <NavBarButton
            
            title={"Character"}
             />
          
          
            <NavBarButton 
            title={"Credential"}
            />
          
          

            <NavBarButton
            title={"Set Up"} />
          
          
            <NavBarButton
            title={"Scenario"} />
          

        </div>


        <div className="flex flex-col gap-4 w-145  justify-content-center bg-indigo-400 py-2">
        <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
          >
            <ArrowDownTrayIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            DOWNLOAD
          </button>
      
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
          >
            <BookmarkSquareIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            SAVE
          </button>
          

        </div>


      </div>

    </>
  );
}

export { NavBar };
