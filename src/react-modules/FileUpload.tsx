import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./../FileUpload.css";
import { Persona } from "../types";

export const FileUploadFull = ({
  text,
  personaIndex,
  element,
  handleJSONUpdate,
}: {
  text: string;
  personaIndex: number;
  element: (keyof Persona)[];
  handleJSONUpdate: (
    personaIndex: number,
    element: (keyof Persona)[],
    value: string | null
  ) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  // To-Do: Impliment a feature to show the preview directly from the JSON data
  // useEffect(() => {
  //   setPreview(showcaseJSON.personas[personaIndex])
  // },[element])

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
      handleJSONUpdate(personaIndex, element, base64 as string);
    } else {
      setPreview(null);
      handleJSONUpdate(personaIndex, element, null);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center">
      <p className="text-md w-full text-start font-bold text-white mb-3">
        {text}
      </p>

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
          {preview == null ? null : (
            <>
              <img
                alt="preview"
                className="right-auto top-auto p-3 w-3/4"
                src={`${preview}`}
              />
            </>
          )}

          <p className=" text-center text-xs lowercase">
            <span className="font-bold ">Click to upload</span> or drag and drop
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