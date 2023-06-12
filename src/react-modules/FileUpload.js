import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./../FileUpload.css";

function FileUploadFull({
  text,
  personaIndex,
  element,
  handleJSONUpdate,
  showcaseJSON,
}) {
  const [preview, setPreview] = useState();

  const convertBase64 = (file) => {
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

  const handleChange = async (newValue) => {
    let objectUrl = null;
    if (newValue) {
      objectUrl = URL.createObjectURL(newValue);
      setPreview(objectUrl);
      const base64 = await convertBase64(newValue);
      handleJSONUpdate(personaIndex, element, base64);
    } else {
      setPreview(null);
      handleJSONUpdate(personaIndex, element, null);
    }
  };

  return (
    <div className="flex p-1 items-center flex-col justify-center w-full">
      <p className="font-bold pb-1 w-full text-start text-white">{text}</p>

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
        className="p-3 flex border-2 flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer dark:hover:bg-zinc-800 upload_outside hover:bg-zinc-100 dark:hover:bg-zinc-600"
      >
        <div className="flex flex-col items-center h-full justify-center border rounded-lg upload_center border-dashed p-2">
          {preview == null ? null : (
            <>
              <img
                className="right-auto top-auto p-3 w-3/4"
                src={`${preview}`}
              />
            </>
          )}

          <p className=" text-center text-xs text-zinc-500 dark:text-zinc-400 lowercase">
            <span className="font-bold text-zinc-300 dark:text-zinc-200">
              Click to upload
            </span>{" "}
            or drag and drop
          </p>
        </div>

        {/* HANDLE FILE UPLOAD */}
        <input
          id={`${element}`}
          type="file"
          className="hidden"
          onChange={(e) => handleChange(e.target.files[0])}
        />
      </label>
    </div>
  );
}

function FileUploadBar({
  text,
  personaIndex,
  element,
  handleJSONUpdate,
  showcaseJSON,
}) {
  const [value, setValue] = useState();
  const [showDelete, setShowDelete] = useState(false);

  const convertBase64 = (file) => {
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

  const handleChange = async (newValue) => {
    let objectUrl = null;
    if (newValue) {
      setShowDelete(true);
      const base64 = await convertBase64(newValue);
      handleJSONUpdate(personaIndex, element, base64);
    } else {
      setShowDelete(false);
      document.getElementById(`form_${element}`).reset();
      handleJSONUpdate(personaIndex, element, null);
    }
  };

  return (
    <div className="flex flex-col">
      <form id={`form_${element}`}>
      <label
        className="font-bold w-full text-start text-white border-dashed"
        htmlFor={`${element}`}
      >
        {text}
      </label>
      <div>
        <input
          className="border border-dashed dark:hover:bg-zinc-800 rounded-lg upload_center p-1 text-sm cursor-pointer dark:text-zinc-400"
          id={`${element}`}
          type="file"
          onChange={(e) => handleChange(e.target.files[0])}
        />
        {!showDelete ? null : (
          <button
            className="bg-red-500 rounded p-1 m-2 text-black text-sm hover:bg-red-400"
            onClick={(e) => handleChange(null)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      </form>
    </div>
  );
}

export {  FileUploadFull, FileUploadBar  };
