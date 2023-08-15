// import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";

/**
 * This module opens up the save modal.
 */
function SaveButton({ setShowModal }) {
  return (
    <button
      className="mx-4 inline-flex items-center border  gap-x-1.5 hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover rounded-md  px-5 py-1.5 text-sm font-semibold shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
      onClick={() => setShowModal(true)}
    >
      {/* <ArrowDownTrayIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" /> */}
      SAVE PROCESS
    </button>
  );
}

export { SaveButton };
