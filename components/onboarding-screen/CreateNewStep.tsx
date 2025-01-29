import "./onboarding-styles/onboarding-style.css";
import { useTranslation } from "react-i18next";

export const CreateNewStep = ({
  addNewStep,
}: {
  addNewStep: (isBasic: boolean) => void;
}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-col ">
        <p>{t('onboarding.create_header_subtitle')}</p>
        <p className="text-4xl font-bold">{t('onboarding.create_header_title')}</p>
        <hr />
      </div>

      <div className="py-5 ">
        <button
          className="basic-step flex flex-row justify-between items-center rounded p-5 my-3 w-full text-start bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover"
          onClick={(e) => addNewStep(false)}
        >
          <p className="text-xl font-bold w-1/4">{t('onboarding.create_basic_step_label')}</p>
          <div className="w-1/4">
            <ul className=" mx-5">
              <li>{t('onboarding.create_title_label')}</li>
              <li>{t('onboarding.create_description_label')}</li>
              <li>{t('onboarding.create_image_label')}</li>
            </ul>
          </div>

          <p className="text-2xl font-bold text-end">{t('onboarding.create_add_step_label')}</p>
        </button>

        <button
          className="basic-step flex flex-row justify-between items-center rounded p-5 my-3 w-full text-start bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover"
          onClick={(e) => addNewStep(true)}
        >
          <p className="text-xl font-bold w-1/4">{t('onboarding.create_issue_step_label')}</p>
          <div className="w-1/4">
            <ul className=" mx-5">
              <li>{t('onboarding.create_title_label')}</li>
              <li>{t('onboarding.create_description_label')}</li>
              <li>{t('onboarding.create_image_label')}</li>
              <li>{t('onboarding.create_credentials_label')}</li>
            </ul>
          </div>

          <p className="text-2xl font-bold text-end">{t('onboarding.create_add_step_label')}</p>
        </button>
      </div>
    </>
  );
}
