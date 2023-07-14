import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Credential({
  issuerName,
  credentialName,
  attributeCount,
  index,
  handleClick,
  selectedCredential,
  handleCredentialRemoval,
}) {
  return (
    <>
      <div className="credential-container flex flex-row">
        <div
          className="w-full"
          data-cred-id={index}
          onClick={(e) => handleClick(index)}
        >
          <div
            className={`credential rounded  ${
              selectedCredential === index ? "selected-cred" : ""
            }`}
          >
            <div className=" grid grid-cols-3">
              <div className="col-span-2">
                <div className="credential-issuer-name">
                  <p>{issuerName}</p>
                </div>
                <div className="credential-credential-name">
                  <p>{credentialName}</p>
                </div>
              </div>
              <div className="flex justify-center items-center align-center">
                <p className="credential-attributes">
                  {" "}
                  Attributes: {attributeCount}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="remove flex items-center justify-center  w-1/5 ">
          <p
            className="text-xl"
            onClick={(e) => handleCredentialRemoval(selectedCredential)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </p>
        </div>
      </div>
    </>
  );
}

export { Credential };

// <div className="credential-container flex flex-row">
//   <div
//     className="w-full"
//     data-cred-id={index}
//     onClick={(e) => handleClick(index)}
//   >
//     <div
//       className={`credential rounded col-span-6 grid grid-cols-4 ${
//         selectedCredential === index ? "selected-cred" : ""
//       }`}
//     >
//       <div className="cred-image"></div>
//       <div className="cred-info col-span-2">
//         <p className="cred-issuer-name">{issuerName}</p>
//         <p className="cred-credential-name">{credentialName}</p>
//       </div>
//       <div className=" cred-attributes">
//         <p className="">Attributes: {attributeCount}</p>
//       </div>
//     </div>
//   </div>
//   <div className="cred-actions px-5">
//     <p onClick={(e) => handleCredentialRemoval(selectedCredential)}>
//       <FontAwesomeIcon icon={faTrash} />
//     </p>
//   </div>
// </div>;
