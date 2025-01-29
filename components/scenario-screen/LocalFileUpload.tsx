/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ElementPath, OnboardingStep, ScenarioOverview } from "@/types";
import { getPropertyValue } from "@/lib/json-helper";
import { useTranslation } from "react-i18next"

interface LocalFileUploadProps {
  text: string;
  element: ElementPath;
  handleLocalUpdate: (element: ElementPath, value: string) => void;
  localJSON: OnboardingStep | ScenarioOverview;
}

export const LocalFileUpload = ({
  text,
  element,
  handleLocalUpdate,
  localJSON,
}: LocalFileUploadProps) => {
  const { t } = useTranslation()
  const [preview, setPreview] = useState(() =>
    getPropertyValue(localJSON, element)
  );

  // To-Do: Impliment a feature to show the preview directly from the JSON data

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (newValue: File | null) => {
    if (newValue == null) return;
    let objectUrl = undefined;
    if (newValue) {
      objectUrl = URL.createObjectURL(newValue);
      setPreview(objectUrl);

      const base64 = await convertBase64(newValue);
      handleLocalUpdate(element, base64 as string);
    } else {
      setPreview(undefined);
      handleLocalUpdate(element, "");
    }
  };

  return (
    <div className="flex items-center flex-col justify-center w-full">
      <p className="w-full text-start text-white font-bold mb-2">{text}</p>

        {preview === undefined ? null : (
        <div className="relative w-full">
          <button
            className="bg-red-500 p-1 m-2 absolute text-black right-0 top-0 text-sm hover:bg-red-400"
            onClick={(e) => handleChange(null)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}

      <label
        htmlFor={`${element}`}
        className="p-3 flex flex-col items-center justify-center w-full h-full bg-light-bg dark:bg-dark-input dark:hover:bg-dark-input-hover rounded-lg cursor-pointer border dark:border-dark-border hover:bg-light-bg"
      >
        <div className="flex flex-col items-center h-full justify-center border rounded-lg border-dashed dark:border-dark-border p-2">
          {!preview ? null : (
            <>
              <img
                className="right-auto top-auto p-3 w-3/4"
                src={`${preview}`}
              />
            </>
          )}

          <p className=" text-center text-xs text-zinc-500 dark:text-zinc-400 lowercase">
            <span className="font-bold text-zinc-300 dark:text-zinc-200">
              {t('file_upload.click_to_upload_label')}
            </span>{" "}
            {t('file_upload.drag_to_upload_label')}
          </p>
        </div>

        {/* HANDLE FILE UPLOAD */}
        <input
          id={`${element}`}
          type="file"
          className="hidden"
          onChange={(e) => handleChange(e.target.files?.[0] || null)}
        />
      </label>
    </div>
  );
};
