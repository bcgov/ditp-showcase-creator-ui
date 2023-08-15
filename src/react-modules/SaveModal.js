import { useState } from "react";
import { SaveButton } from "./SaveButton";
import { saveAs } from "file-saver"; // for saving JSON
/**
 * This module allows saving of the project via a pop up window.
 *
 */
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
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Save Showcase</h3>
            </div>

            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="text-slate-800 text-lg leading-relaxed">
                Enter the name for this showcase below. <br />
              </p>
              <p className="italic text-slate-500">
                Today's date will be appended to the filename for versioning.
              </p>
              <p className="italic text-slate-500 mb-4">
                ex. MyShowcase_v3_(mm-dd-yyyy)
              </p>
              <input
                className="border p-1 w-full"
                type="text"
                placeholder="MyShowcase_v3"
                value={filename}
                onChange={(e) => {
                  setFilename(e.target.value.replace(/\s/g, ""));
                }}
              />
            </div>

            {/*footer*/}
            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              {/* SAVE BUTTON */}
              <button
                onClick={saveJSON}
                className="p-1 w-1/6 hover:bg-gray-200 dark:bg-zinc-200 dark:hover:bg-zinc-400 dark:hover:text-gray-100 m-2 border rounded shadow bg-white"
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
