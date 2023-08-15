import React, { useState } from "react";
import { SaveButton } from "./SaveButton";
import { saveAs } from "file-saver"; // for saving JSON

export function SaveModal({ setShowModal, showcaseJSON }) {
  const [filename, setFilename] = useState("");

  function handleFilenameChange(e) {
    setFilename(e.target.value);
  }

  function saveJSON() {
    let cDate = new Date();
    var blob = new Blob([JSON.stringify(showcaseJSON.personas)], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(
      blob,
      `${filename}_(${cDate.getMonth()}-${cDate.getDate()}-${cDate.getYear()}).json`
    );

    setShowModal(false);
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm bg-opacity-70 bg-black">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 dark:border-gray-600 rounded-t">
              <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                Save Showcase
              </h3>
            </div>

            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                Enter the name for this showcase below. <br />
              </p>
              <p className="italic text-gray-500 dark:text-gray-400">
                Today's date will be appended to the filename for versioning.
              </p>
              <p className="italic text-gray-500 dark:text-gray-400 mb-4">
                ex. MyShowcase_v3_(mm-dd-yyyy)
              </p>
              <input
                className="border p-1 w-full text-dark-text dark:text-light-text"
                type="text"
                placeholder="MyShowcase_v3"
                value={filename}
                onChange={(e) => {
                  setFilename(e.target.value.replace(/\s/g, ""));
                }}
              />
            </div>

            {/*footer*/}
            <div className="flex items-center justify-center p-6 border-t border-solid border-gray-300 dark:border-gray-600 rounded-b">
              <button
                className="text-red-500 background-transparent hover:underline uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              {/* SAVE BUTTON */}
              <button
                onClick={saveJSON}
                className="p-1 w-20 bg-light-bg-secondary hover:bg-light-btn-hover dark:hover:bg-dark-input border dark:bg-dark-bg-secondary dark:hover:bg-dark-btn-hover rounded "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
