import {useState, useEffect} from 'react'

function DisplaySearchResults({
  selectedCharacter,
  showcaseJSON,
  localJSON,
  searchResults,
  addCredential,
}) {
  const MAX_SEARCH_CREDENTIALS = 8;
    

  return (
    <div>
      {searchResults.map((result, index) =>
        // If there are more than MAX_SEARCH_CREDENTIALS credentials showing, force the user to search.
        index < MAX_SEARCH_CREDENTIALS ? (
          <button
            key={`${result}_${index}`}
            className="basic-step dropdown-border w-5/6 flex flex-row items-center justify-around text-center"
            onClick={(e) => addCredential(e, result)}
          >
            <div className="w-1/2">
              <p  className="">
                {
                  showcaseJSON.personas[selectedCharacter].credentials[result]
                    .issuer_name
                }
              </p>
              <p className="font-bold">
                {
                  showcaseJSON.personas[selectedCharacter].credentials[result]
                    .name
                }
              </p>
            </div>
            <div className="w-1/2">
              <p>
                Atributes:{" "}
                {
                  showcaseJSON.personas[selectedCharacter].credentials[result]
                    .attributes.length
                }
              </p>
            </div>
          </button>
        ) : null
      )}
    </div>
  );
}

export { DisplaySearchResults };
