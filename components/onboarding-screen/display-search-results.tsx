import { ShowcaseJSON } from "@/types";

interface DisplaySearchResultsProps {
  selectedCharacter: number;
  showcaseJSON: ShowcaseJSON;
  searchResults: string[];
  addCredential: (credentialId: string) => void;
}

export const DisplaySearchResults = ({
  selectedCharacter,
  showcaseJSON,
  searchResults,
  addCredential,
}: DisplaySearchResultsProps) => {
  const MAX_SEARCH_CREDENTIALS = 8;
  const visibleResults = searchResults.slice(0, MAX_SEARCH_CREDENTIALS);

  return (
    <div className="mb-6">
      {visibleResults.map((result) => {
        const credential = showcaseJSON.personas[selectedCharacter].credentials[result];

        if (!credential) return null;

        return (
          <button
            key={result}
            className="basic-step dropdown-border w-full flex flex-row text-sm mb-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              addCredential(result);
            }}
          >
            <div className="grid grid-cols-3 w-full py-2 bg-light-bg hover:bg-light-btn-hover dark:bg-dark-bg dark:hover:bg-dark-btn-hover text-light-text dark:text-dark-text">
              <div className="col-span-1">
                <p className="mb-1 font-bold">Name:</p>
                <p>{credential.name}</p>
              </div>

              <div className="col-span-1">
                <p className="mb-1 font-bold">Issuer:</p>
                <p>{credential.issuer_name}</p>
              </div>

              <div className="col-span-1">
                <p className="mb-1 font-bold">Attributes:</p>
                <p>{credential.attributes.length}</p>
              </div>
            </div>
          </button>
        );
      })}

      {searchResults.length > MAX_SEARCH_CREDENTIALS && (
        <p className="text-sm text-muted-foreground mt-2">
          Showing {MAX_SEARCH_CREDENTIALS} of {searchResults.length} results.
          Please refine your search to see more specific results.
        </p>
      )}
    </div>
  );
};
