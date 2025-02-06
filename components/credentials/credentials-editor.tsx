"use client";

import { CredentialsForm } from "./credentials-form";
import { NoSelection } from "./no-selection";
import { useCredentials } from "@/hooks/use-credentials";

export const CredentialsEditor = () => {
  const { mode } = useCredentials();

  if (!mode) {
    return (
      <div className="">
        <NoSelection text={"You have no credential selected."} />
      </div>
    );
  }

  return <CredentialsForm />;
};
