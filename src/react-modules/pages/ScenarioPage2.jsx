import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { current } from "immer";

export const ScenarioPage2 = ({
  tempData,
  setTempData,
  formData,
  setFormData,
  selectedCredential,
  setSelectedCredential,
}) => {
  const [proofRequestData, setProofRequestData] = useState([]);

  const [currentProofSelected, setCurrentProofSelected] = useState(0);

  const handleChange = (index) => (e) => {
    const { name, value } = e.target;
    const newData = [...proofRequestData];

    // const { name, value, selectedIndex } = e.target;
    // const optionId = e.target.options[selectedIndex].id;
    // if (name === "name") {
    //   setCurrentProofSelected(parseInt(optionId));
    // }
    newData[index][name] = value;
    setProofRequestData(newData);
  };

  const addProofRequest = () => {
    setProofRequestData([
      ...proofRequestData,
      { name: "", type: "", value: "" },
    ]);
  };

  const removeProofRequest = (index) => {
    const newData = [...proofRequestData];
    newData.splice(index, 1);
    setProofRequestData(newData);
  };

  useEffect(() => {
    console.log("your currentProofSelected index is: ", currentProofSelected);
    console.log("your formData is: ", formData);
  }, [proofRequestData, formData, currentProofSelected]);

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
                    value={
                      formData[0].attributes.find(
                        (attr) => attr.name === proofRequestData[index].name
                      )?.value || ""
                    }
                    // value={formData[0].attributes[index].value}
                    className="col-span-3"
                    onChange={handleChange(index)}
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
                  >
                    <option value="None">None</option>
                    <option value=">">{">"}</option>
                    <option value=">=">{">="}</option>
                    <option value="<">{"<"}</option>
                    <option value="<=">{"<="}</option>
                  </select>
                </div>
                {/* <div className="col-span-1">
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
                  />
                </div> */}
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
