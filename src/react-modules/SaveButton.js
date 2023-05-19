import { saveAs } from "file-saver"; // for saving JSON

function SaveButton({ showcaseJSON }) {
  function saveJSON() {
    var blob = new Blob([JSON.stringify(showcaseJSON.personas)], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "scenario.json");
  }

  return (
    <>
      <button onClick={saveJSON} className="p-1 w-1/6 hover:bg-gray-200 dark:bg-zinc-200 dark:hover:bg-zinc-400 dark:hover:text-gray-100 m-2 border rounded shadow bg-white">
        Save
      </button>
    </>
  );
}

export { SaveButton };
