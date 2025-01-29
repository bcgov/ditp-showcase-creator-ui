import { useImmer } from "use-immer";
import { LocalFileUpload } from "./LocalFileUpload";
import { ShowcaseJSON, ScenarioStepState, ElementPath, Scenario } from "@/types";
import { updateProperty } from "@/lib/json-helper";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation()
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
      <p>{t('scenario.edit_header_subtitle')}</p>
      <p className="text-4xl font-bold">{t('scenario.edit_header_title')}</p>
      <hr />

      <form onSubmit={handleSubmit}>
        {/* Overview Section */}
        <p className="text-2xl font-bold mt-6">{t('scenario.edit_overview_label')}</p>
        <div className="my-6">
          <label className="text-sm font-bold">{t('scenario.edit_name_label')}</label>
          <br />
          <input
            className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
            type="text"
            placeholder={t('scenario.edit_name_placeholder')}
            value={localData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="my-6">
          <label className="text-sm font-bold">{t('scenario.edit_page_title_label')}</label>
          <br />
          <input
            className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
            type="text"
            placeholder={t('scenario.edit_page_title_placeholder')}
            value={localData.overview.title}
            onChange={(e) => handleChange(["overview", "title"], e.target.value)}
          />
        </div>

        <div className="my-6">
          <label className="text-sm font-bold">{t('scenario.edit_page_description_label')}</label>
          <textarea
            className="dark:text-dark-text border dark:border-dark-border dark:bg-dark-input p-2 w-full rounded resize-none mt-3"
            rows={8}
            placeholder={t('scenario.edit_page_description_placeholder')}
            value={localData.overview.text}
            onChange={(e) => handleChange(["overview", "text"], e.target.value)}
          />
        </div>

        <div className="my-6">
          <LocalFileUpload
            text={t('scenario.edit_image_label')}
            element={["overview", "image"]}
            handleLocalUpdate={handleChange}
            localJSON={localData.overview}
          />
        </div>

        <hr />

        {/* Summary Section */}
        <div className="my-5">
          <p className="text-2xl font-bold mt-6">{t('scenario.edit_summary_label')}</p>
          <div className="my-6">
            <label className="text-md font-bold">{t('scenario.edit_page_title_label')}</label>
            <br />
            <input
              className="dark:text-dark-text dark:bg-dark-input mt-2"
              type="text"
              placeholder={t('scenario.edit_page_title_placeholder')}
              value={localData.summary.title}
              onChange={(e) => handleChange(["summary", "title"], e.target.value)}
            />
          </div>
        </div>

        <div className="my-6">
          <label className="text-sm font-bold">{t('scenario.edit_page_description_label')}</label>
          <textarea
            className="dark:text-dark-text border dark:border-dark-border dark:bg-dark-input p-2 w-full rounded resize-none mt-3"
            rows={8}
            placeholder={t('scenario.edit_page_description_placeholder')}
            value={localData.summary.text}
            onChange={(e) => handleChange(["summary", "text"], e.target.value)}
          />
        </div>

        <LocalFileUpload
          text={t('scenario.edit_image_label')}
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
            {t('action.cancel_label')}
          </button>

          <button
            type="submit"
            className="p-1 w-20 bg-light-bg-secondary hover:bg-light-btn-hover border dark:bg-dark-bg-secondary dark:hover:bg-dark-btn-hover rounded"
          >
            {t('action.save_label')}
          </button>
        </div>
      </form>
    </div>
  );
};
