import { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NoSelection } from "../credentials/no-selection";
import { EditProofRequest } from "./edit-proof-request";
import {
  ProofRequest,
  ProofRequestAttributes,
  ProofRequestPredicates,
  ShowcaseJSON,
} from "@/types";
import { cn } from "@/lib/utils";

interface DisplayStepCredentialsProps {
  selectedCharacter: number;
  showcaseJSON: ShowcaseJSON;
  localData: {
    requestOptions?: {
      proofRequest?: ProofRequest;
    };
  };
  selectedStep: number | null;
  selectedScenario: number | null;
  removeCredential: (credential: string) => void;
}

export const DisplayStepCredentials = ({
  selectedCharacter,
  showcaseJSON,
  localData,
  selectedStep,
  selectedScenario,
  removeCredential,
}: DisplayStepCredentialsProps) => {
  const [editingCredentials, setEditingCredentials] = useState<number[]>([]);

  const getAllCredentials = (
    attributes: { [key: string]: ProofRequestAttributes } = {},
    predicates: { [key: string]: ProofRequestPredicates } = {}
  ): string[] => {
    const credentials = new Set<string>();

    Object.values(attributes).forEach((value) => {
      if (value.restrictions?.[0]) {
        credentials.add(value.restrictions[0]);
      }
    });

    Object.values(predicates).forEach((value) => {
      if (value.restrictions[0]) {
        credentials.add(value.restrictions[0]);
      }
    });

    return Array.from(credentials);
  };

  const credentials = getAllCredentials(
    localData.requestOptions?.proofRequest?.attributes,
    localData.requestOptions?.proofRequest?.predicates
  );

  if (credentials.length === 0) {
    return (
      <div className="m-5 p-5 w-full h-60">
        <NoSelection text="No Credentials Added" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-md font-bold">Credential(s) Added:</p>

      {credentials.map((credential, index) => {
        const credentialData =
          showcaseJSON.personas[selectedCharacter].credentials[credential];
        if (!credentialData) return null;

        const isEditing = editingCredentials.includes(index);

        return (
          <div key={credential} className="flex flex-col">
            <div className="w-full">
              {/* Credential Header */}
              <div
                className={cn(
                  "px-4 py-3 rounded-t-lg flex items-center justify-between",
                  "bg-light-input dark:bg-dark-input"
                )}
              >
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {credentialData.issuer_name}
                  </p>
                  <p className="font-semibold">{credentialData.name}</p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    removeCredential(credential);
                  }}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Proof Request Section */}
              <div
                className={cn(
                  "p-3 rounded-b-lg",
                  "bg-light-bg dark:bg-dark-bg"
                )}
              >
                {isEditing &&
                localData.requestOptions?.proofRequest &&
                selectedStep !== null &&
                selectedScenario !== null ? (
                  <EditProofRequest
                    showcaseJSON={showcaseJSON}
                    proofRequest={localData.requestOptions.proofRequest}
                    credentialName={credential}
                    selectedCharacter={selectedCharacter}
                    selectedScenario={selectedScenario}
                    selectedStep={selectedStep}
                    setEditingCredentials={setEditingCredentials}
                    editingCredentials={editingCredentials}
                    editingIndex={index}
                  />
                ) : (
                  <Button
                    variant="ghost"
                    className="text-xs font-semibold hover:bg-transparent hover:underline p-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditingCredentials([...editingCredentials, index]);
                    }}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit Proof Request
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
