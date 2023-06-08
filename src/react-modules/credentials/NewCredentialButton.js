import React from "react";
import { DEFAULT_JSON } from "./../../DEFAULT_JSON";

function NewCredentialButton({ setShowcaseJSON }) {
  const data = {
    name: "Person Card",
    version: "1.9",
    icon: "/public/student/icon-student.svg",
    attributes: [
      {
        name: "student_first_name",
        value: "Ryan",
      },
      {
        name: "student_last_name",
        value: "Boado",
      },
      {
        name: "expiry_date",
        value: "2023",
      },
    ],
  };
  const handleClick = () => {
    setShowcaseJSON((json) => {
      json.personas[0].onboarding[4].credentials.push(data);
    });
  };
  return (
    <button className="border rounded bg-white p-1 m-2" onClick={handleClick}>
      Create a Credential (+)
    </button>
  );
}

export { NewCredentialButton };
