/**
 * This module opens up the save modal.
 */
function SaveButton({setShowModal}) {
  return (
    <button className="p-1 w-1/6 hover:bg-gray-200 dark:bg-zinc-200 dark:hover:bg-zinc-400 dark:hover:text-gray-100 m-2 border rounded shadow bg-white"
        onClick={() => setShowModal(true)}>Save</button>
  );
}

export { SaveButton };
