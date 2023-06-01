import { produce } from "immer";
import {DEFAULT_JSON} from './../../DEFAULT_JSON'
function NewCharacterButton({ showcaseJSON, setShowcaseJSON, setSelectedCharacter}) {
  const handleClick = () => {

    setShowcaseJSON((json) => {
        json["personas"].push(DEFAULT_JSON)
      });
      //setSelectedCharacter(showcaseJSON.personas.length)
  };

  return (
    <button className="border rounded bg-white p-1 m-2" onClick={handleClick}>
      Create a Character (+)
    </button>
  );
}

export { NewCharacterButton };
