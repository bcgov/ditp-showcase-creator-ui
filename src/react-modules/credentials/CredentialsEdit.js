import { CredentialAttributesList } from "./components/CredentialAttributesList";

function CredentialsEdit({
  selectedCredential,
  tempData,
  setTempData,
  addAttribute,
  handleChange,
  removeAttribute,
}) {
  return (
    <>
      {/* Header section */}
      <div className="flex justify-between">
        <div>
          <p className="text-slate-100 text-sm">Credentials</p>
          <h3 className="text-4xl font-bold text-slate-50">
            Edit a Credential
          </h3>
        </div>
      </div>
      <hr className="mb-6"></hr>

      {/* Credential Name input field */}
      <div className="my-6">
        <label className="text-md font-bold" htmlFor="name">
          Credential Name
        </label>
        <input
          type="text"
          id="cred_name"
          name="cred_name"
          placeholder="Credential Name"
          value={
            tempData[selectedCredential]
              ? tempData[selectedCredential].name
              : ""
          }
          onChange={(e) => handleChange(e, ["name"])}
          className="mt-3 dark:bg-dark-input  border dark:border-dark-border"
        />
      </div>

      {/* Issuer Name input field */}
      <div className="my-6">
        <label className="text-md font-bold" htmlFor="issuer_name">
          Issuer Name
        </label>
        <input
          type="text"
          id="issuer_name"
          name="issuer_name"
          placeholder="Issuer Name"
          value={
            tempData[selectedCredential]
              ? tempData[selectedCredential].issuer_name
              : ""
          }
          onChange={(e) => handleChange(e, ["issuer_name"])}
          className="mt-3 dark:bg-dark-input  border dark:border-dark-border"
        />
      </div>

      {/* Section to add attributes using CredentialAttributesList */}
      <div className="my-6">
        <label className="text-md font-bold"> Add Attributes</label>
        {/* Use CredentialAttributesList component to manage attributes */}
        <CredentialAttributesList
          tempData={tempData}
          selectedCredential={selectedCredential}
          handleChange={handleChange}
          addAttribute={addAttribute}
          removeAttribute={removeAttribute}
        />
      </div>
    </>
  );
}

export { CredentialsEdit };
