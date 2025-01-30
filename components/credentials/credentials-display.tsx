"use client";

import { CredentialsList } from "./components/credentials-list";
import { useShowcaseStore } from "@/hooks/use-showcase-store";
import { useCredentials } from "@/hooks/use-credentials";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const CredentialsDisplay = () => {
  const { t } = useTranslation()
  const { showcaseJSON, selectedCharacter } = useShowcaseStore();
  const {
    isCreating,
    startCreating,
  } = useCredentials();

  return (
    <div className="mt-8">
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-bold">{t('credentials.credentials_added_label', { credentialCount: Object.entries(showcaseJSON.personas[selectedCharacter].credentials).length })}</h3>
        <div>
          {!isCreating && (
            <Button
              onClick={startCreating}
              variant="outline"
              className="flex items-center gap-2"
              data-button-id="create-button-credentials"
            >
              <span>{t('credentials.add_credential_label')}</span>
              <Plus className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <CredentialsList
        selectedCharacter={selectedCharacter}
        showcaseJSON={showcaseJSON}
      />
    </div>
  );
};
