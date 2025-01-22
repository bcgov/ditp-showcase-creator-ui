import { DarkModeToggle } from "./DarkModeToggle";
import { SaveButton } from "./SaveButton";
import { SaveModal } from "./SaveModal";
import { JSONUploadButton } from "./JSONUpload";
import { useState } from "react";
import { NavBarButton } from "./NavBarButton";
import { ShowcaseJSON } from "../types";

export const NavBar = ({
  darkMode,
  setDarkMode,
  showcaseJSON,
  setShowcaseJSON,
  changePage,
  currentPage,
}: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  showcaseJSON: ShowcaseJSON;
  setShowcaseJSON: React.Dispatch<React.SetStateAction<ShowcaseJSON>>;
  changePage: (page: string) => void;
  currentPage: string;
}) => {
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

      <div className="flex justify-between px-8 dark:text-dark-text">
        <div className="flex justify-center items-center">
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <div className="flex flex-row justify-center gap-6 px-8 shadow-md button-dark bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-b-lg">
          <NavBarButton
            title={"Character"}
            src={require("../assets/NavBar/character.svg").default}
            page="character"
            changePage={changePage}
            currentPage={currentPage}
          />
          <NavBarButton
            title={"Credentials"}
            src={require("../assets/NavBar/credentials.svg").default}
            page="credential"
            changePage={changePage}
            currentPage={currentPage}
          />
          <NavBarButton
            title={"Onboarding"}
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

        <div className="flex flex-col gap-4 w-145  justify-center items-center py-2">
          {showModal ? (
            <SaveModal
              setShowModal={setShowModal}
              showcaseJSON={showcaseJSON}
            />
          ) : null}

          <div className="flex w-145  justify-center items-center py-2 ">
            <JSONUploadButton setShowcaseJSON={setShowcaseJSON} />
            <a
              href="/"
              className="mx-4 inline-flex items-center gap-x-1.5 rounded-md border bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              RESET
            </a>
          </div>

          <SaveButton setShowModal={setShowModal} />
        </div>
      </div>
    </>
  );
}
