'use client';

import { useEffect, useState } from "react";
import { useShowcaseStore } from "@/hooks/use-showcase-store";
import { useTranslations } from 'next-intl';

export const JSONPreview = () => {
  const t = useTranslations()
  const { showcaseJSON } = useShowcaseStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log("JSONPreview received new data:", showcaseJSON);
  }, [showcaseJSON]);

  return (
    <div className="my-4 text-light-text dark:text-dark-text">
      <button
        className="bg-gray-300 dark:bg-gray-700 p-2 rounded-md w-full text-left"
        onClick={toggleAccordion}
      >
        {t('action.show_json_preview_label')}
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
