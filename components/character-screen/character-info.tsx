import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useShowcaseStore } from "@/hooks/use-showcase-store";
import { Button } from '@/components/ui/button';
import { useTranslation } from "react-i18next";

export const CharacterInfo = () => {
  const { t } = useTranslation()
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
          <p className="text-foreground text-sm">{t('character_info_header_subtitle')}</p>
          <h3 className="text-2xl font-bold text-foreground">
            {t('character_info_header_title')}
          </h3>
        </div>

        <div className="ml-auto">
          <Button variant="outline" onClick={() => setEditMode(true)}>
            {t('action_edit_camel_label')}
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
                {t('action_delete_camel_label')}
              </button>
            ) : null
          }
        </div>
      </div>

      <div className="p-3 m-3 bg-light-bg dark:bg-dark-bg rounded">
        <p>
          <span className="font-bold">{t('character_info_name_label')}</span>{" "}
          {showcaseJSON["personas"][selectedCharacter].name}
        </p>
        <p>
          <span className="font-bold">{t('character_info_role_label')}</span>{" "}
          {showcaseJSON["personas"][selectedCharacter].type}
        </p>
        <p className="font-bold mt-6">{t('character_info_description_label')}</p>
        <p>{showcaseJSON["personas"][selectedCharacter].description}</p>
      </div>

      <div className="grid grid-cols-2">
        <div className="p-2 m-2">
          <p>{t('character_info_headshot_image_label')}</p>
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
          <p>{t('character_info_full_body_image_label')}</p>
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
