import {DEFAULT_JSON} from './../../DEFAULT_JSON';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "./character-styles/character-screen.css";

function NewCharacterButton({ showcaseJSON, setShowcaseJSON, setSelectedCharacter}) {
  const handleClick = () => {

    setShowcaseJSON((json) => {
        json["personas"].push(DEFAULT_JSON)
      });
      // Enabling this line has side-effects!
      // If a character is being edited, it will auto-switch to the new character without saving changes!
      // setSelectedCharacter(showcaseJSON.personas.length)
  };

  return (
      <button className="button-light p-2 hover:bg-neutral-600" onClick={handleClick}>
        Create <FontAwesomeIcon icon={faCirclePlus}/>
      </button>
  );
}

export { NewCharacterButton };
