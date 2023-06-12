

function CharacterInfo({setShowcaseJSON, showcaseJSON, setSelectedCharacter, selectedCharacter, setEditMode}){

    const handleRemoveCharacter = (e, i) => {
        if (showcaseJSON.personas.length == 1) return;
        // Prevent out of bounds selected character
        if (
          (selectedCharacter == i ||
            showcaseJSON.personas.length - 1 == selectedCharacter) &&
          selectedCharacter != 0
        ) {
          setSelectedCharacter(selectedCharacter - 1);
        }
        setShowcaseJSON((json) => {
          json["personas"].splice(i, 1);
        });
      };

    return(

        // Regular mode / non-editable
        <>
        <div className="flex">
          <div>
            <p>Character</p>
            <p className="text-2xl font-bold">Your Selected Character</p>
          </div>
    
          <div className="ml-auto">
                <button
                  className="p-1  w-20 m-1 button-dark hover:bg-neutral-600"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
            {
              // Conditionally render the remove button. There must always be one character.
              showcaseJSON.personas.length > 1 ? (
                <button
                  className="p-1 w-20 m-1 button-dark hover:bg-neutral-600"
                  onClick={(event) =>
                    handleRemoveCharacter(event, selectedCharacter)
                  }
                >
                  Delete
                </button>
              ) : null
            }
          </div>
        </div>
    
        <div className="highlight-text p-3 m-3 rounded">
          <p>
            <span className="font-bold">Name:</span>{" "}
            {showcaseJSON["personas"][selectedCharacter].name}
          </p>
          <p>
            <span className="font-bold">Role:</span>{" "}
            {showcaseJSON["personas"][selectedCharacter].type}
          </p>
          <p className="font-bold mt-6">Description:</p>
          <p>{showcaseJSON["personas"][selectedCharacter].description}</p>
        </div>
    
        <div className="grid grid-cols-3">
          <div className="p-2 m-2">
            <p>Body Image</p>
            <div className="highlight-text p-6 m-1">
              IMAGE HERE
            </div>
          </div>
          
          <div className="p-2 m-2">
            <p>Avatar Image</p>
            <div className="highlight-text p-6 m-1">
              IMAGE HERE
            </div>
          </div>
          
          <div className="p-2 m-2">
            <p>Celebration Image</p>
            <div className="highlight-text p-6 m-1">
              IMAGE HERE
            </div>
          </div>
        </div>
      </>
    )
}

export {CharacterInfo};
