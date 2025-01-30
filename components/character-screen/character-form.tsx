"use client";

import { CharacterEdit } from "./character-edit";
import { CharacterInfo } from "./character-info";
import { useShowcaseStore } from "@/hooks/use-showcase-store";

export const CharacterForm = () => {
  const { editMode } = useShowcaseStore();

  return (
    <div className="w-3/5 two-column-col  bg-light-bg-secondary dark:bg-dark-bg-secondary  p-3 rounded-md right-col ">
      {editMode ? <CharacterEdit /> : <CharacterInfo />}
    </div>
  );
};
