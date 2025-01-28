import { DEFAULT_JSON } from "@/lib/fixtures";
import { ShowcaseJSON } from "@/types";

import { Persona } from "@/types";
import { useState, useEffect } from "react";
import { useImmer } from "use-immer";

export function updateJSONWithImmer(
  setShowcaseJSON: (fn: (draft: ShowcaseJSON) => void) => void,
  index: number,
  path: (keyof Persona)[],
  newValue: string | null
): void {
  setShowcaseJSON((draft) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = draft.personas[index];
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = newValue;
  });
}

export const useShowcase = () => {
  const [showcaseJSON, setShowcaseJSON] = useImmer<ShowcaseJSON>({
    personas: [DEFAULT_JSON],
  });

  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [currentPage, setCurrentPage] = useState("character");
  const [editMode, setEditMode] = useState(false);

  function handleJSONUpdate(
    index: number,
    element: (keyof Persona)[],
    newValue: string | null
  ) {
    updateJSONWithImmer(setShowcaseJSON, index, element, newValue);
  }

  useEffect(() => {
    console.log("showcaseJSON updated:", showcaseJSON);
  }, [showcaseJSON]);

  return {
    showcaseJSON,
    setShowcaseJSON,
    selectedCharacter,
    setSelectedCharacter,
    currentPage,
    setCurrentPage,
    handleJSONUpdate,
    editMode,
    setEditMode,
  };
}