'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useShowcaseStore } from "@/hooks/use-showcase-store";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const CharacterList = () => {
  const { showcaseJSON, selectedCharacter, setEditMode, setSelectedCharacter } = useShowcaseStore();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCharacter(Number(e.currentTarget.value));
    setEditMode(false);
  };

  return (
    <div className="grid grid-cols-1">
      {showcaseJSON.personas.map((person, index) => (
        <button value={index} key={index} onClick={handleClick}>
          <div className="flex flex-col items-center justify-center">
            <div
              className={cn(`character-circle p-3 m-3 flex items-center justify-center`, 
                selectedCharacter === index && "border-2 border-yellow-500"
              )}
            >
              {showcaseJSON.personas[selectedCharacter].headshot_image ? (
                <Image
                  alt="headshot"
                  width={70}
                  height={70}
                  className="object-cover"
                  src={showcaseJSON.personas[selectedCharacter].headshot_image}
                />
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )}
            </div>
            <div className="p-2">
              <p className="text-center font-bold text-xl">{person.name}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
