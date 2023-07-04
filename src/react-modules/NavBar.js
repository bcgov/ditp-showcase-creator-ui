import { DarkModeToggle } from "./DarkModeToggle";
import { SaveButton } from "./SaveButton";
import { SaveModal } from "./SaveModal";
import { JSONUploadButton } from './JSONUpload'
import { useState } from "react";
import { NavBarButton } from "./NavBarButton";


function NavBar({ darkMode, setDarkMode, showcaseJSON, setShowcaseJSON, changePage, currentPage }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* 
      //OLD MENU. WAITING APPROVE TO REMOVE
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
      </div> */}


      <div className="flex justify-between px-8 ">

      <div className="flex justify-center items-center"><DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} /></div>

        <div className="flex flex-row justify-center gap-6 px-8 shadow-md button-dark rounded-b-lg">
         
          <NavBarButton
            title={"Character"}
            src={require("../assets/NavBar/character.svg").default}
            page="character"
            changePage={changePage}
            currentPage={currentPage}
          />
          <NavBarButton
            title={"Credential"}
            src={require("../assets/NavBar/credentials.svg").default}
            page="credential"
            changePage={changePage}
            currentPage={currentPage}
          />
          <NavBarButton
            title={"Set Up"}
            src={require("../assets/NavBar/setup.svg").default}
            page="setup"
            changePage={changePage}
            currentPage={currentPage}
          />
          <NavBarButton
            title={"Scenario"}
            src={require("../assets/NavBar/scenario.svg").default}
            page="scenario"
            changePage={changePage}
            currentPage={currentPage}
          />
        </div>


        <div className="flex flex-col gap-4 w-145  justify-center items-center py-4">


{showModal ? (
            <SaveModal setShowModal={setShowModal} showcaseJSON={showcaseJSON} />
          ) : null}
          <JSONUploadButton setShowcaseJSON={setShowcaseJSON} />
          <SaveButton setShowModal={setShowModal} />

        </div>


      </div>

    </>
  );
}

export { NavBar };
