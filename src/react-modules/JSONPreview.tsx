import { useState } from "react";
import { ShowcaseJSON } from "../types";

export const JSONPreview = ({ showcaseJSON }: { showcaseJSON: ShowcaseJSON }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="my-4 text-light-text dark:text-dark-text">
      <button
        className="bg-gray-300 dark:bg-gray-700 p-2 rounded-md w-full text-left"
        onClick={toggleAccordion}
      >
        Show JSON Preview
      </button>
      {isOpen && (
        <div className="border p-4 m-2 rounded-md dark:border-gray-600">
          <pre className="p-10 m-5 border text-xs rounded dark:text-neutral-200 whitespace-pre-wrap break-words">
            {JSON.stringify(showcaseJSON, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};