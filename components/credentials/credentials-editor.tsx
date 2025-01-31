"use client";

import { CredentialsForm } from "./credentials-form";
import { NoSelection } from "./no-selection";
import { useCredentials } from "@/hooks/use-credentials";
import { useTranslation } from "react-i18next";

export const CredentialsEditor = () => {
  const { t } = useTranslation()
  const { mode } = useCredentials();

  if (!mode) {
    return (
      <div className="">
        <NoSelection text={t('credentials.no_credential_selected_message')} />
      </div>
    );
  }

  return <CredentialsForm />;
};
