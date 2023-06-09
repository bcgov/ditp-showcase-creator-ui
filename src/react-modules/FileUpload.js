// import { PhotoIcon } from "@heroicons/react/20/solid";

function FileUploadFull({ text }) {
  return (
    <>
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500"
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
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-zinc-500 dark:text-zinc-400">{text}</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div>

      {/* <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                            <spa className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Upload a file</spa>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>

                </div>
            </div> */}
    </>
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
