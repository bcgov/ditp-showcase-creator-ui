import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function CharacterList({showcaseJSON, setEditMode, selectedCharacter, setSelectedCharacter}){

    const handleClick = (e) => {
        setSelectedCharacter(e.currentTarget.value);
        setEditMode(false);
      };

    return(
        <div className="grid grid-cols-1">
          {showcaseJSON.personas.map((person, index) => (
            <button value={index} key={index} onClick={handleClick}>
              <div>
                <div
                  className={`character-circle flex items-center justify-center p-2 m-3  ${
                    selectedCharacter == index ? "selected-item" : ""
                  }`}
                >
                  {
                    showcaseJSON.personas[selectedCharacter].headshot_image 
                    ? <img className="" width="70px" src={showcaseJSON.personas[selectedCharacter].headshot_image}/>
                    : <FontAwesomeIcon icon={faUser} />
                  }
                  
                </div>
                <div className="p-2">
                  <p className="text-center font-bold text-xl">{person.name}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
    )
}

export {CharacterList}