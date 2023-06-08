import React from "react";

function Credential({
  issuerName,
  credentialName,
  attributeCount,
  index,
  handleClick,
}) {
  return (
    <>
      <div data-cred-id={index} onClick={handleClick}>
        <div className="credential-card p-4">
          <div className="credential-card-heading">
            <div className="credential-card-issuer-name">
              <p className="text-slate-100 text-md truncate">{issuerName}</p>
            </div>
            <p className="text-slate-200 text-xl font-bold truncate">
              {credentialName}
            </p>
            <div className="credential-card-avatar my-4 flex items-center justify-center">
              <div className="credential-card-avatar-background">
                <img
                  className="h-auto max-w-full"
                  src="./images/lawyer-icon.svg"
                  alt=""
                />
              </div>
            </div>
            <div className="credential-card-credential-attributes mt-6">
              <p className="text-slate-100 text-sm ">
                Attributes:{attributeCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Credential };
