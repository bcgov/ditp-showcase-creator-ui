import { useState, useEffect } from "react";

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
    const base64 = await convertBase64(newValue)
    setValue(base64);
    handleJSONUpdate(personaIndex, element, base64);
  };

  return (
    <div class="flex p-1 items-center flex-col justify-center w-full">
      <p className="text-neutral-500 dark:text-neutral-200">{text}</p>
      <label
        for="dropzone-file"
        class="p-3 flex flex-col items-center justify-center w-full h-48 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-600"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            class="w-10 h-10 mb-3 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p class="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">
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
