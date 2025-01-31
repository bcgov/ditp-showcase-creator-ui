import { DarkModeToggle } from "./dark-mode-toggle";
import { SaveButton } from "./save-button";
import { JSONUploadButton } from "./json-uploader";
import { NavBarButton } from "./navbar-button";
import Link from "next/link";
import { LanguageSelector } from "./language-selector";
import intlInit from "@/app/i18n";

type Props = {
    locale: string
}

export const NavBar = async (props: Props) => {
  const { t } = await intlInit({ locale: props.locale })
  return (
    <div className="flex justify-between px-8 dark:text-dark-text">
      <div className="flex justify-center items-center">
        <DarkModeToggle />
      </div>
      <div className="flex justify-center items-center">
        <LanguageSelector />
      </div>
      <div className="flex flex-row justify-center gap-6 px-8 shadow-md button-dark bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-b-lg">
        <NavBarButton
          title={t('navigation.character_label')}
          src={"/assets/NavBar/character.svg"}
          page="/"
        />
        <NavBarButton
          title={t('navigation.credentials_label')}
          src={"/assets/NavBar/credentials.svg"}
          page="/credentials"
        />
        <NavBarButton
          title={t('navigation.onboarding_label')}
          src={"/assets/NavBar/setup.svg"}
          page="/onboarding"
        />
        <NavBarButton
          title={t('navigation.scenario_label')}
          src={"/assets/NavBar/scenario.svg"}
          page="/scenarios"
        />
      </div>

      <div className="flex flex-col gap-4 w-145 justify-center items-center py-2">
        <div className="flex w-145 justify-center items-center py-2 ">
          <JSONUploadButton />
          <Link
            href="/"
            className="mx-4 inline-flex items-center gap-x-1.5 rounded-md border bg-light-bg dark:bg-dark-b dark:hover:bg-dark-btn-hover px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
          >
            {t('action.reset_label')}
          </Link>
        </div>

        <SaveButton />
      </div>
    </div>
  );
};
