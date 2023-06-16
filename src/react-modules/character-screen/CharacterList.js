import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function CharacterList({showcaseJSON, setEditMode, selectedCharacter, setSelectedCharacter}){

    const handleClick = (e) => {
        setSelectedCharacter(e.currentTarget.value);
        setEditMode(false);
      };

    return(
        <div className="grid grid-cols-3">
          {showcaseJSON.personas.map((person, index) => (
            <button value={index} key={index} onClick={handleClick}>
              <div>
                <div
                  className={`character-circle flex items-center justify-center p-3 m-3  ${
                    selectedCharacter == index ? "selected-item" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="p-2">
                  <p className="text-center">{person.name}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
    )
}

export {CharacterList}