import { useState, useEffect } from "react";

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
            className="basic-step dropdown-border w-full flex flex-row  text-sm mb-2 rounded"
            onClick={(e) => addCredential(e, result)}
          >
            <div className="grid grid-cols-3 w-full order py-2">
              <div className="col-span-1 flex justify-start items-center flex-col">
                <p className="mb-1 font-bold">Name:</p>
                <p>
                  {
                    showcaseJSON.personas[selectedCharacter].credentials[result]
                      .name
                  }
                </p>
              </div>
              <div className="col-span-1 flex justify-start items-center flex-col">
                <p className="mb-1 font-bold">Issuer</p>
                <p>
                  {
                    showcaseJSON.personas[selectedCharacter].credentials[result]
                      .issuer_name
                  }
                </p>
              </div>
              <div className="col-span-1 flex justify-start items-center flex-col">
                <p className="mb-1 font-bold">Attributes:</p>
                <p>
                  {
                    showcaseJSON.personas[selectedCharacter].credentials[result]
                      .attributes.length
                  }
                </p>
              </div>
            </div>
          </button>
        ) : null
      )}
    </div>
  );
}

export { DisplaySearchResults };
