import { useEffect } from "react";
import { useImmer } from "use-immer";
import { LocalFileUpload } from "./LocalFileUpload";

function ScenarioEdit({
  selectedScenario,
  saveScenario,
  showcaseJSON,
  selectedCharacter,
  setState,
}) {
  const [localData, setLocalData] = useImmer(
    showcaseJSON.personas[selectedCharacter].scenarios[selectedScenario]
  );

  const changeScenario = (newValue, element, secondElement) => {
    if (!secondElement) {
      setLocalData((json) => {
        json[element] = newValue;
      });
    } else {
      setLocalData((json) => {
        json[element][secondElement] = newValue;
      });
    }
  };

  const handleLocalUpdate = (element, newValue) => {
    setLocalData((json) => {
      json[element[0]][element[1]] = newValue;
    });
  };

  return (
    <div className="flex flex-col">
      <p>Scenario</p>
      <p className="text-4xl font-bold">Edit Scenario</p>
      <hr />

      <form onSubmit={null}>
        {/* TITLE */}
        <p className=" text-2xl font-bold mt-6">Overview</p>
        <div className="my-6">
          <label className="text-sm font-bold">Scenario Name</label>
          <br />
          <input
            className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
            type="text"
            placeholder="Scenario Name"
            value={localData.name}
            onChange={(e) => changeScenario(e.target.value, "name")}
          />
        </div>

        <div className="my-6">
          <label className="text-sm font-bold">Page Title</label>
          <br />
          <input
            className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
            type="text"
            placeholder="Page Title"
            value={localData.overview.title}
            onChange={(e) =>
              changeScenario(e.target.value, "overview", "title")
            }
          />
        </div>

        <div className="my-6">
          <label className="text-sm font-bold">{"Page Description"}</label>
          <textarea
            className="dark:text-dark-text border dark:border-dark-border dark:bg-dark-input p-2 w-full rounded resize-none mt-3"
            rows="8"
            placeholder="Page Description"
            type="text"
            value={localData.overview.text}
            onChange={(e) => changeScenario(e.target.value, "overview", "text")}
          />
        </div>

        <div className="my-6">
          <LocalFileUpload
            text={"Image"}
            element={["overview", "image"]}
            handleLocalUpdate={handleLocalUpdate}
            localJSON={localData.overview}
          />
        </div>

        <hr />

        <div className="my-5">
          <p className="text-2xl font-bold mt-6">Summary</p>

          <div className="my-6">
            <label className="text-md font-bold">
              <span className="">Page Title</span>
            </label>
            <br />
            <input
              className="dark:text-dark-text dark:bg-dark-input mt-2"
              type="text"
              placeholder="Page Title"
              value={localData.summary.title}
              onChange={(e) =>
                changeScenario(e.target.value, "summary", "title")
              }
            />
          </div>
        </div>

        <div className="my-6">
          <label className="text-sm font-bold">{"Page Description"}</label>
          <textarea
            className="dark:text-dark-text border dark:border-dark-border dark:bg-dark-input p-2 w-full rounded resize-none mt-3"
            rows="8"
            placeholder="Page Description"
            type="text"
            value={localData.summary.text}
            onChange={(e) => changeScenario(e.target.value, "summary", "text")}
          />
        </div>

        <LocalFileUpload
          text={"Image"}
          element={["summary", "image"]}
          handleLocalUpdate={handleLocalUpdate}
          localJSON={localData.overview}
        />

        <div className="flex flex-cols mt-10 justify-end space-x-4 items-baseline">
          <button
            onClick={(e) => {
              e.preventDefault();
              setState("none-selected");
            }}
            className=" w-20 hover:underline uppercase"
          >
            Cancel
          </button>

          <input
            type="submit"
            value="SAVE"
            onClick={(e) => saveScenario(e, localData)}
            className="p-1  w-20 bg-light-bg-secondary hover:bg-light-btn-hover dark:hover:bg-dark-input border dark:bg-dark-bg-secondary dark:hover:bg-dark-btn-hover rounded "
          />
        </div>
      </form>
    </div>
  );
}

export { ScenarioEdit };
