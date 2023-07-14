import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const ScenarioPage = ({
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
    const { name, value, selectedIndex } = e.target;

    if (name === "name") {
      const optionId = e.target.options[selectedIndex].value;
      const attributeName = formData[0].attributes[optionId]?.name || "";

      setProofRequestData((prevData) => {
        const newData = [...prevData];
        newData[index] = {
          ...newData[index],
          name: attributeName,
          value: formData[0].attributes[optionId]?.value || "",
        };
        return newData;
      });
    } else {
      setProofRequestData((prevData) => {
        const newData = [...prevData];
        newData[index][name] = value;
        return newData;
      });
    }
  };

  const addProofRequest = () => {
    setCurrentProofSelected((prevVal) => parseInt(prevVal) + 1);
    setProofRequestData([
      ...proofRequestData,
      { name: "", type: "", value: "" },
    ]);
  };

  useEffect(() => {
    console.log("your proofRequestData is: ", proofRequestData);
    console.log("formdata is: ", formData);
    console.log("your currentProofSelected index is: ", currentProofSelected);
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
                    value={formData[0].attributes[0].name}
                    onChange={(e) => handleChange(index)(e)}
                  >
                    <option value="">No selection</option>
                    {formData[0].attributes.map((optionAttr, optionIndex) => (
                      <option
                        id={optionIndex}
                        key={optionIndex}
                        value={optionIndex}
                      >
                        {optionAttr.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="text-xs" htmlFor={`attr-value-${index}`}>
                    Attribute Value
                  </label>
                  <input
                    type="text"
                    name={`attr-value`}
                    id={`attr-value`}
                    placeholder=""
                    value={proofRequestData[index].value || ""}
                    className="col-span-3"
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
                <div className="col-span-1">
                  <label className="text-xs" htmlFor={`value`}>
                    Condition Value
                  </label>
                  <input
                    type="text"
                    name={`value`}
                    id={`value`}
                    // placeholder=""
                    value={proofRequestData[index].value || ""}
                    className="col-span-3"
                    onChange={(e) => handleChange(index)(e)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};
