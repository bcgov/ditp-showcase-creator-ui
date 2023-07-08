import React, { useState, useEffect } from "react";
import "./styles/credentials.css";
import { CredentialsForm } from "./CredentialsForm";
import { CredentialsEdit } from "./CredentialsEdit";
import { CredentialsList } from "./components/CredentialsList";
import { NoSelection } from "./NoSelection";

function CredentialsScreen2({
  selectedCharacter,
  setSelectedIndex,
  selectedIndex,
  tempData,
  setTempData,
  formData,
  setFormData,
  selectedCredential,
  setSelectedCredential,
  testJSON,
  setTestJSON,
}) {
  // useEffect(() => {
  //   console.log(testJSON);
  // }, [testJSON]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (index) => (e) => {
    const { name, value } = e.target;
    const newData = [...tempData];

    console.log("newData ", newData);
    console.log("value ", value);
    console.log("index ", index);
    console.log("name ", name);
    // newData["credentials"][0][name] = value;
    // setFormData(newData);
  };

  // const handleCreateButtonClick = (e) => {
  //   setTestJSON((prevData) => {
  //     return {
  //       ...prevData,
  //       credentials: [
  //         ...prevData.credentials,
  //         {
  //           cred_name: "",
  //           issuer_name: "",
  //           icon: "",
  //           attributes: [],
  //         },
  //       ],
  //     };
  //   });
  // };

  // const handleCreateButtonClick = (e) => {
  //   setFormData((prevData) => {
  //     return {
  //       ...prevData,
  //       credentials: [
  //         ...prevData.credentials,
  //         {
  //           cred_name: "",
  //           issuer_name: "",
  //           icon: "",
  //           attributes: [],
  //         },
  //       ],
  //     };
  //   });
  // };

  // const handleCreateButtonClick = (e) => {
  //   setFormData((prevData) => {
  //     const newCredentials = [...prevData.credentials];

  //     const newCredObj = {
  //       cred_name: "",
  //       issuer_name: "",
  //       icon: "",
  //       attributes: [],
  //     };

  //     const wrappedCred = { cred_name: newCredObj };

  //     newCredentials.push(wrappedCred);

  //     return {
  //       ...prevData,
  //       credentials: newCredentials,
  //     };
  //   });
  // };

  const handleCreateButtonClick = (e) => {
    setTempData((prevData) => {
      const newCredentials = [...prevData.credentials];

      const newCredObj = {
        cred_name: "",
        issuer_name: "",
        icon: "",
        attributes: [],
      };

      const wrappedCred = { cred_name: newCredObj };

      newCredentials.push(wrappedCred);

      return {
        ...prevData,
        credentials: newCredentials,
      };
    });
  };

  // const handleCreateButtonClick = (e) => {
  //   setTestJSON((prevData) => {
  //     prevData, prevData.push(...prevData.credentials, { cred_name: "" });
  //   });
  // };

  return (
    <>
      <button
        data-button-id="create-button-credentials"
        // disabled={createButtonClicked}
        onClick={(e) => handleCreateButtonClick(e)}
        className="px-3 py-1 mx-1 rounded bg-slate-400 hover:bg-slate-500 text-slate-100"
      >
        ADD
      </button>
      <input
        type="text"
        id="cred_name"
        name="cred_name"
        placeholder="Credential Name"
        value={formData["credentials"]}
        onChange={handleChange()}
      />
    </>
  );
}

export { CredentialsScreen2 };
