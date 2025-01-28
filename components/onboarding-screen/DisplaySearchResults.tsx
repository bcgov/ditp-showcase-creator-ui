import { ShowcaseJSON } from "../../types";

export function DisplaySearchResults<T>({
  selectedCharacter,
  showcaseJSON,
  searchResults,
  addCredential,
}: {
  selectedCharacter: number;
  showcaseJSON: ShowcaseJSON;
  searchResults: string[];
  addCredential: (credential: T) => void;
}) {
  const MAX_SEARCH_CREDENTIALS = 8;

  return (
    <div className="mb-6">
      {searchResults.map((result, index) =>
        // If there are more than MAX_SEARCH_CREDENTIALS credentials showing, force the user to search.
        index < MAX_SEARCH_CREDENTIALS ? (
          <button
            key={`${result}_${index}`}
            className="basic-step dropdown-border w-full flex flex-row  text-sm mb-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              addCredential(result as T)
            }}
          >
            <div className="grid grid-cols-3 w-full py-2 bg-light-bg hover:bg-light-btn-hover dark:bg-dark-bg dark:hover:bg-dark-btn-hover text-light-text dark:text-dark-text">
              <div className="col-span-1">
                <p className="mb-1 font-bold">Name:</p>
                <p>
                  {
                    showcaseJSON.personas[selectedCharacter].credentials[result]
                      .name
                  }
                </p>
              </div>
              <div className="col-span-1">
                <p className="mb-1 font-bold">Issuer:</p>
                <p>
                  {
                    showcaseJSON.personas[selectedCharacter].credentials[result]
                      .issuer_name
                  }
                </p>
              </div>
              <div className="col-span-1">
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
