import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { OnboardingStep } from "@/types";
import { useTranslation } from "react-i18next";

function LocalFileUpload({
  text,
  element,
  handleLocalUpdate,
  localJSON,
}: {
  text: string;
  element: keyof OnboardingStep;
  handleLocalUpdate: (key: keyof OnboardingStep, value: string) => void;
  localJSON: OnboardingStep;
}) {
  const { t } = useTranslation()
  const [preview, setPreview] = useState<OnboardingStep[typeof element] | null>(localJSON[element]);

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
    let objectUrl = null;
    if (newValue) {
      objectUrl = URL.createObjectURL(newValue);
      setPreview(objectUrl);

      const base64 = await convertBase64(newValue);
      handleLocalUpdate(element as keyof OnboardingStep, base64 as string);
    } else {
      setPreview(null);
      handleLocalUpdate(element as keyof OnboardingStep, "");
    }
  };

  return (
    <div className="flex items-center flex-col justify-center w-full">
      <p className="w-full text-start text-white font-bold mb-2">{text}</p>

      {preview == null ? null : (
        <div className="relative w-full">
          <button
            className="bg-red-500 rounded p-1 m-2 absolute text-black right-0 top-0 text-sm hover:bg-red-400"
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
              <img
                alt="preview"
                className="right-auto top-auto p-3 w-3/4"
                src={`${preview}`}
              />
          )}

          <p className=" text-center text-xs text-zinc-500 dark:text-zinc-400 lowercase">
            <span className="font-bold text-zinc-300 dark:text-zinc-200">
              {t('file_upload_click_to_upload_label')}
            </span>{" "}
            {t('file_upload_drag_to_upload_label')}
          </p>
        </div>

        {/* HANDLE FILE UPLOAD */}
        <input
          id={`${element}`}
          type="file"
          className="hidden"
          onChange={(e) => handleChange(e.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  );
}

export { LocalFileUpload };
