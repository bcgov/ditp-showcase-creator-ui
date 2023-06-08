import { useState, useEffect } from "react";
import './../FileUpload.css'

function FileUploadFull({
  text,
  personaIndex,
  element,
  handleJSONUpdate,
  showcaseJSON,
}) {

  const [value, setValue] = useState("");
  const [preview, setPreview] = useState();

    // https://stackoverflow.com/questions/36580196/reactjs-base64-file-upload
    
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  useEffect(() => {
    setValue(showcaseJSON.personas[personaIndex][element]);
  }, [personaIndex]);

  const handleChange = async (newValue) => {
    const objectUrl = URL.createObjectURL(newValue)
    setPreview(objectUrl);
    const base64 = await convertBase64(newValue)
    setValue(base64);
    handleJSONUpdate(personaIndex, element, base64);
    
  };

  return (
    <div class="flex p-1 items-center flex-col justify-center w-full">
      <p className="text-neutral-500 p-1 w-full text-start dark:text-neutral-200">{text}</p>
      <label
        for="dropzone-file"
        class="p-3 flex border-2 flex-col items-center justify-center w-full rounded cursor-pointer dark:hover:bg-zinc-800 upload_outside hover:bg-zinc-100 dark:hover:bg-zinc-600"
      >
        
        <div class="flex flex-col items-center justify-center border rounded-lg border-zinc-300 upload_center border-dashed p-2">
        { preview == null ? null : <img className="p-3" src={`${preview}`} /> }
          <p class=" text-center mb-2 text-xs text-zinc-500 dark:text-zinc-400 lowercase">
            <span class="font-bold text-zinc-300 dark:text-zinc-200">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">
            (SVG, PNG, JPEG, JPG)
          </p>
        </div>

        {/* HANDLE FILE UPLOAD */}
        <input 
        id="dropzone-file" 
        type="file" 
        class="hidden"
        onChange={(e) => handleChange(e.target.files[0])}
        />


      </label>
    </div>
  );
}

function FileUploadBar({ text }) {
  return (
    <>
      <label
        class="block mb-1 text-sm font-medium text-neutral-500 dark:text-neutral-200"
        for="default_size"
      >
        {text}
      </label>
      <input
        class="block w-full mb-5 text-sm text-zinc-900 border border-zinc-300 rounded cursor-pointer bg-zinc-50 dark:text-zinc-400 focus:outline-none dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400"
        id="default_size"
        type="file"
      />
    </>
  );
}

export { FileUploadFull, FileUploadBar };
