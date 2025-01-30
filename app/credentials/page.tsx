import { CredentialsDisplay } from "@/components/credentials/credentials-display";
import { CredentialsEditor } from "@/components/credentials/credentials-editor";

export default function Credentials() {
  return (
     <div className="flex flex-col min-h-screen mt-20 ">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex gap-12 h-full">
          <div className="w-2/5 rounded left-col text-light-text dark:text-dark-text">
            <div className="flex justify-between">
              <div>
                <h3 className="text-4xl font-bold text-foreground">
                  Add your Credentials
                </h3>
                <p className="text-foreground mt-3">
                  Fill in the details on the right to create a credential for
                  this showcase.
                </p>
              </div>
            </div>
            <CredentialsDisplay />
          </div>
          <div className="w-3/5  p-6 rounded-md right-col bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text ">
            <CredentialsEditor />
          </div>
        </div>
      </div>
    </div>
  );
}

