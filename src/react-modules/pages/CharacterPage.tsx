import { ShowcaseJSON, Persona } from '../../types';
import {CharacterScreen} from '../character-screen/CharacterScreen'

export const CharacterPage = ({
  showcaseJSON,
  setShowcaseJSON,
  selectedCharacter,
  setSelectedCharacter,
  handleJSONUpdate,
}: {
  showcaseJSON: ShowcaseJSON;
  setShowcaseJSON: (updater: (draft: ShowcaseJSON) => void) => void;
  selectedCharacter: number;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<number>>
  handleJSONUpdate: (
    personaIndex: number,
    element: (keyof Persona)[],
    value: string | null
  ) => void;
}) => {
  return (
    <>
      <div>
      <CharacterScreen showcaseJSON={showcaseJSON} setShowcaseJSON={setShowcaseJSON} selectedCharacter={selectedCharacter} setSelectedCharacter={setSelectedCharacter} handleJSONUpdate={handleJSONUpdate}/>
    </div>
    </>
  )
}
