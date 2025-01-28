import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useShowcaseStore } from "@/hooks/use-showcase-store";
import { Button } from '@/components/ui/button';

export const CharacterInfo = () => {
  const {
    showcaseJSON,
    selectedCharacter,
    setEditMode,
    removeCharacter
  } = useShowcaseStore();

  const handleRemoveCharacter = (
    i: number
  ) => {
    if (showcaseJSON.personas.length === 1) return;
    removeCharacter(i);
  };

  return (
    <>
      <div className="flex ">
        <div className="m-3">
          <p className="text-foreground text-sm">Character</p>
          <h3 className="text-2xl font-bold text-foreground">
            Your Selected Character
          </h3>
        </div>

        <div className="ml-auto">
          <Button variant="outline" onClick={() => setEditMode(true)}>
            Edit
          </Button>
          {
            // Conditionally render the remove button. There must always be one character.
            showcaseJSON.personas.length > 1 ? (
              <button
                className="p-1 w-20 m-1 button-dark hover:bg-neutral-600"
                onClick={(event) => {
                  event.preventDefault()
                 handleRemoveCharacter(selectedCharacter)
                }}
              >
                Delete
              </button>
            ) : null
          }
        </div>
      </div>

      <div className="p-3 m-3 bg-light-bg dark:bg-dark-bg rounded">
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

      <div className="grid grid-cols-2">
        <div className="p-2 m-2">
          <p>Headshot Image</p>
          <div className=" p-6 m-1 flex justify-center items-center bg-light-bg dark:bg-dark-bg ">
            {!showcaseJSON.personas[selectedCharacter].headshot_image ? (
              <FontAwesomeIcon icon={faUser} />
            ) : (
              <Image
                width={100}
                height={100}
                alt="headshot"
                src={`${showcaseJSON.personas[selectedCharacter].headshot_image}`}
              />
            )}
          </div>
        </div>

        <div className="p-2 m-2">
          <p>Full-Body Image</p>
          <div className="p-6 m-1 flex justify-center items-center bg-light-bg dark:bg-dark-bg">
            {!showcaseJSON.personas[selectedCharacter].body_image ? (
              <FontAwesomeIcon icon={faUser} />
            ) : (
              <Image
                width={100}
                height={100}
                alt="body"
                src={`${showcaseJSON.personas[selectedCharacter].body_image}`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
