import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { current } from "immer";

// Notes:
// if attributeName === "" append it under "predicates"
// else append it under "properties"

export const ScenarioPage2 = ({
  tempData,
  setTempData,
  formData,
  setFormData,
  selectedCredential,
  setSelectedCredential,
}) => {
  const [proofRequestData, setProofRequestData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [currentProofSelected, setCurrentProofSelected] = useState(0);

  // ** for debugging **
  useEffect(() => {
    console.log("your currentProofSelected index is: ", currentProofSelected);
    console.log("your formData is: ", formData);
    console.log("your proofRequestData is: ", proofRequestData);
  }, [proofRequestData, formData, currentProofSelected]);

  // FUNCTION: Handle all input changes
  const handleChange = (index) => (e) => {
    const { name, value } = e.target; // Get the name and value from the event target
    const newData = [...proofRequestData]; // Create a copy of the current proofRequestData

    // Disable / enable inputs if an attribute name is selected or not.
    if (name === "name" && value !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
      if (name === "name") {
        newData[index].value = ""; // Clear out the condition value
      } else if (name === "type") {
        newData[index].type = ""; // Clear out the condition value
      }
    }

    // To do:
    // seperate "predicates" from "properties"
    if (value.toString() === "") {
      console.log("YOU CHOSE NOT SELECTED!!!!");
      const properties = { [name]: value };
      console.log("Properties:", properties);
    }

    newData[index][name] = value; // Update function scoped object newData with new values
    setProofRequestData(newData); // Update proofRequestData object
  };

  // FUNCTION: Add an empty proof request object
  const addProofRequest = () => {
    setProofRequestData([
      ...proofRequestData,
      { name: "", type: "", value: "" },
    ]);
  };

  // FUNCTION: Remove a proof request
  const removeProofRequest = (index) => {
    const newData = [...proofRequestData];
    newData.splice(index, 1);
    setProofRequestData(newData);
  };

  if (!formData || formData.length === 0) {
    return <h1>YOU HAVE NO DATA IN HERE GO BACK</h1>; // Don't render the component if formData is undefined or empty
  } else {
    return (
      <>
        <div>
          <button className="border" onClick={addProofRequest}>
            Add Proof
          </button>

          <div className="border" style={{ width: "900px" }}>
            {proofRequestData.map((attr, index) => (
              <div className="grid grid-cols-8 gap-2" key={index}>
                <div className="col-span-2">
                  <label className="text-xs" htmlFor={`name-${index}`}>
                    Attribute Name
                  </label>
                  <select
                    name={`name`}
                    id={`name`}
                    className="col-span-2 truncate"
                    value={attr.name}
                    onChange={(e) => handleChange(index)(e)}
                  >
                    <option value="">No selection</option>
                    {formData[0].attributes.map((optionAttr, optionIndex) => (
                      <option
                        id={optionIndex}
                        key={optionIndex}
                        value={optionAttr.name}
                      >
                        {optionAttr.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="text-xs" htmlFor={`value-${index}`}>
                    Attribute Value
                  </label>
                  <input
                    type="text"
                    name={`value`}
                    id={`value-${index}`}
                    placeholder="Attribute Value"
                    value={
                      formData[0].attributes.find(
                        (attr) => attr.name === proofRequestData[index].name
                      )?.value || ""
                    }
                    // value={formData[0].attributes[index].value}
                    className="col-span-3 truncate"
                    onChange={handleChange(index)}
                    // disabled={attr.name === "" ? "disabled" : ""}
                    disabled={true}
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-xs" htmlFor={`type-${index}`}>
                    Condition
                  </label>
                  <select
                    name={`type`}
                    id={`type`}
                    className="col-span-1 truncate"
                    value={attr.condition}
                    onChange={(e) => handleChange(index)(e)}
                    disabled={attr.name === "" ? "disabled" : ""}
                  >
                    <option value="None">None</option>
                    <option value=">">{">"}</option>
                    <option value=">=">{">="}</option>
                    <option value="<">{"<"}</option>
                    <option value="<=">{"<="}</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs" htmlFor={`value`}>
                    Condition Value
                  </label>
                  <input
                    type="text"
                    name={`value`}
                    id={`value`}
                    placeholder="Condition Value"
                    value={proofRequestData[index].value || ""}
                    className="col-span-3"
                    onChange={(e) => handleChange(index)(e)}
                    disabled={attr.name === "" ? "disabled" : ""}
                  />
                </div>
                <div className="col-span-1">
                  <button onClick={() => removeProofRequest(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};
