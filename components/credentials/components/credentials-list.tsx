"use client";

import { ShowcaseJSON } from "@/types";
import { useCredentials } from "@/hooks/use-credentials";
import { useShowcaseStore } from "@/hooks/use-showcase-store";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';

interface CredentialsListProps {
  selectedCharacter: number;
  showcaseJSON: ShowcaseJSON;
}

export const CredentialsList = ({
  selectedCharacter,
  showcaseJSON,
}: CredentialsListProps) => {
  const t = useTranslations('credentials')
  const {
    selectedCredential,
    startEditing,
    viewCredential
  } = useCredentials();
  const { removeCredential } = useShowcaseStore();
  const credentials = showcaseJSON.personas[selectedCharacter].credentials;

  return (
    <div className="space-y-3">
      {Object.entries(credentials).map(([credentialId, credential]) => (
        <div
          key={credentialId}
          onClick={() => viewCredential(credentialId)}
          className={cn(
            "p-4 rounded-lg border transition-all cursor-pointer",
            selectedCredential === credentialId
              ? "bg-primary/10 border-primary"
              : "hover:bg-accent hover:border-accent"
          )}
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{credential.name}</h4>
              <p className="text-sm text-muted-foreground truncate">
                {t('card_issuer_name_label', { issuerName: credential.issuer_name })}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {t('card_attributes_label', { count: credential.attributes.length })}
              </p>
            </div>
            <div className="flex gap-1 shrink-0" onClick={e => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => startEditing(credentialId)}
                className="hover:bg-primary/10"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCredential(credentialId)}
                className="hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {Object.keys(credentials).length === 0 && (
        <div className="text-center p-4 text-muted-foreground">
          No credentials added yet
        </div>
      )}
    </div>
  );
};
