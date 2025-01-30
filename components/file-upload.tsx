import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { convertBase64 } from "@/lib/utils";

export const FileUploadFull = ({
  text,
  element,
  handleJSONUpdate,
}: {
  text: string;
  element: 'headshot_image' | 'body_image';
  handleJSONUpdate: (imageType: 'headshot_image' | 'body_image', imageData: string) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = async (newValue: File | null) => {
    if (newValue) {
      try {
        const base64 = await convertBase64(newValue);
        if (typeof base64 === 'string') {
          setPreview(base64);
          handleJSONUpdate(element, base64);
        }
      } catch (error) {
        console.error('Error converting file:', error);
      }
    } else {
      setPreview(null);
      handleJSONUpdate(element, "");
    }
  };

  return (
    <div className="flex items-center flex-col justify-center">
      <p className="text-md w-full text-start font-bold text-foreground mb-3">
        {text}
      </p>

      {preview == null ? null : (
        <div className="relative w-full">
          <button
            className="bg-red-500 rounded p-1 m-2 absolute text-black right-0 top-0 text-sm hover:bg-red-400"
            onClick={(e) => {
              e.preventDefault();
              handleChange(null);
            }}
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
              <Image
                alt="preview"
                className="right-auto top-auto p-3 w-3/4"
                src={preview}
                width={300}
                height={300}
                style={{ width: '75%', height: 'auto' }}
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