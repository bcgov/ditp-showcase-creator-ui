import { useImmer } from "use-immer";
import { LocalFileUpload } from "./LocalFileUpload";
import { ElementPath, Scenario } from "../../types";
import { ShowcaseJSON } from "../../types";
import { ScenarioStepState } from "../../types";
import { updateProperty } from "../../lib/json-helper";
import { useEffect } from "react";

interface ScenarioEditProps {
  selectedScenario: number;
  saveScenario: (newScenario: Scenario) => void;
  showcaseJSON: ShowcaseJSON;
  selectedCharacter: number;
  setState: (state: ScenarioStepState) => void;
}

export const ScenarioEdit = ({
  selectedScenario,
  saveScenario,
  showcaseJSON,
  selectedCharacter,
  setState,
}: ScenarioEditProps) => {
  const [localData, setLocalData] = useImmer<Scenario>(
    showcaseJSON.personas[selectedCharacter].scenarios[selectedScenario]
  );

  useEffect(() => {
    setLocalData(showcaseJSON.personas[selectedCharacter].scenarios[selectedScenario]);
  }, [selectedScenario, showcaseJSON.personas, selectedCharacter, setLocalData]);

  const handleChange = (path: ElementPath, value: string) => {
    setLocalData(draft => {
      updateProperty(draft, path, value);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveScenario(localData);
  };

  return (
    <div className="flex flex-col">
      <p>Scenario</p>
      <p className="text-4xl font-bold">Edit Scenario</p>
      <hr />

      <form onSubmit={handleSubmit}>
        {/* Overview Section */}
        <p className="text-2xl font-bold mt-6">Overview</p>
        <div className="my-6">
          <label className="text-sm font-bold">Scenario Name</label>
          <br />
          <input
            className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
            type="text"
            placeholder="Scenario Name"
            value={localData.name}
            onChange={(e) => handleChange("name", e.target.value)}
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
            onChange={(e) => handleChange(["overview", "title"], e.target.value)}
          />
        </div>

        <div className="my-6">
          <label className="text-sm font-bold">Page Description</label>
          <textarea
            className="dark:text-dark-text border dark:border-dark-border dark:bg-dark-input p-2 w-full rounded resize-none mt-3"
            rows={8}
            placeholder="Page Description"
            value={localData.overview.text}
            onChange={(e) => handleChange(["overview", "text"], e.target.value)}
          />
        </div>

        <div className="my-6">
          <LocalFileUpload
            text="Image"
            element={["overview", "image"]}
            handleLocalUpdate={handleChange}
            localJSON={localData.overview}
          />
        </div>

        <hr />

        {/* Summary Section */}
        <div className="my-5">
          <p className="text-2xl font-bold mt-6">Summary</p>
          <div className="my-6">
            <label className="text-md font-bold">Page Title</label>
            <br />
            <input
              className="dark:text-dark-text dark:bg-dark-input mt-2"
              type="text"
              placeholder="Page Title"
              value={localData.summary.title}
              onChange={(e) => handleChange(["summary", "title"], e.target.value)}
            />
          </div>
        </div>

        <div className="my-6">
          <label className="text-sm font-bold">Page Description</label>
          <textarea
            className="dark:text-dark-text border dark:border-dark-border dark:bg-dark-input p-2 w-full rounded resize-none mt-3"
            rows={8}
            placeholder="Page Description"
            value={localData.summary.text}
            onChange={(e) => handleChange(["summary", "text"], e.target.value)}
          />
        </div>

        <LocalFileUpload
          text="Image"
          element={["summary", "image"]}
          handleLocalUpdate={handleChange}
          localJSON={localData.summary}
        />

        {/* Action Buttons */}
        <div className="flex flex-cols mt-10 justify-end space-x-4 items-baseline">
          <button
            type="button"
            onClick={() => setState("none-selected")}
            className="w-20 hover:underline uppercase"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="p-1 w-20 bg-light-bg-secondary hover:bg-light-btn-hover border dark:bg-dark-bg-secondary dark:hover:bg-dark-btn-hover rounded"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};