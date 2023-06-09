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
              <div className="flex flex-col items-center justify-center">
                <div

                  className={`character-circle p-3 m-3 flex items-center justify-center  ${

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