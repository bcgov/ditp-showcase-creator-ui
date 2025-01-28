import { useImmer } from "use-immer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./scenario-styles/scenario-styles.css";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { ProofRequest, ShowcaseJSON } from "../../types";

export const EditProofRequest = ({
  showcaseJSON,
  proofRequest,
  credentialName,
  selectedCharacter,
  setShowcaseJSON,
  selectedScenario,
  selectedStep,
  setEditingCredentials,
  editingCredentials,
  editingIndex
}: {
  showcaseJSON: ShowcaseJSON;
  proofRequest: ProofRequest;
  credentialName: string;
  selectedCharacter: number;
  setShowcaseJSON: (updater: (draft: ShowcaseJSON) => void) => void;
  selectedScenario: number;
  selectedStep: number;
  setEditingCredentials: (editingCredentials: number[]) => void;
  editingCredentials: number[];
  editingIndex: number;
}) => {

  const [localData, setLocalData] = useImmer<ProofRequest>(proofRequest);

  const onAttributeChange = (type: string, index: number, newValue: string) => {
    if (type === "attributes") {
      setLocalData((json) => {
        json.attributes[credentialName].attributes[index] =
          newValue;
      });
    } else if (type === "predicates") {
      let keysArray = Object.keys(localData.predicates);
      let key = keysArray[index];
      setLocalData((json) => {
        json.predicates[key].name = newValue;
      });
    }
  };

  const onConditionValueChange = (index: number, newValue: string) => {
    let keysArray = Object.keys(localData.predicates);
    let key = keysArray[index];

    setLocalData((json) => {
      json.predicates[key].value = Number(newValue);
    });
  };

  const onConditionTypeChange = (type: string, index: number, newValue: string) => {
    if (type === "predicates" && newValue !== "none") {
      // Switching predicate to predicate check
      let keysArray = Object.keys(localData.predicates);
      let key = keysArray[index];
      setLocalData((json) => {
        json.predicates[key].type = newValue;
      });
    } else if (type === "predicates" && newValue === "none") {
      // Switching predicate to basic check
      let keysArray = Object.keys(localData.predicates);
      let key = keysArray[index];

      let attribute = localData.predicates[key].name;
      setLocalData((json) => {
        delete json.predicates[key];
      });

      setLocalData((json) => {
        json.attributes[credentialName].attributes.push(attribute);
      });
    } else if (type === "attributes" && newValue !== "none") {
      // Switching basic to predicate check
      let attribute =
        localData.attributes[credentialName].attributes[index];
      setLocalData((json) => {
        json.attributes[credentialName].attributes.splice(
          index,
          1
        );
      });

      setLocalData((json) => {
        json.predicates[Date.now()] = {
          name: attribute,
          type: newValue,
          value: 0,
          restrictions: [credentialName],
        };
      });
    }
  };

  const addAttribute = () => {
    setLocalData((json) => {
      if (json.attributes[credentialName]) {
        // If the credential is not blank/empty
        json.attributes[credentialName].attributes.push(
          showcaseJSON.personas[selectedCharacter]
            .credentials[credentialName].attributes[0].name
        );
      } else {
        json.attributes[credentialName] = {
          // if the credential IS blank/empty (adding the first attribute to this proof)
          attributes: [
            showcaseJSON.personas[selectedCharacter]
              .credentials[credentialName].attributes[0].name,
          ],
          restrictions: [
            showcaseJSON.personas[selectedCharacter]
              .credentials[credentialName].name,
          ],
        };
      }
    });
  };

  const removeAttribute = (type: string, index: number) => {
    if (type === "attributes")
      setLocalData((json) => {
        json.attributes[credentialName].attributes.splice(
          index,
          1
        );
      });
    else if (type === "predicates") {
      let keysArray = Object.keys(localData.predicates);
      let key = keysArray[index];
      setLocalData((json) => {
        delete json.predicates[key];
      });
    }
  };

  const saveProofRequest = () => {
    setEditingCredentials([...editingCredentials, editingIndex]);

    setShowcaseJSON((json) => {
        json.personas[selectedCharacter].scenarios[
          selectedScenario
        ].steps[selectedStep].requestOptions.proofRequest =
          localData;
    });
  };

  return (
    <>
      {/* MAP FOR ALL ATTRIBUTES */}
      {
        // SETTING ATTRIBUTE
        localData &&
        localData.attributes &&
        localData.attributes[credentialName] &&
        localData.attributes[credentialName].attributes
          ? localData.attributes[credentialName].attributes.map(
              (attribute, index) => (
                <div
                  className="flex flex-row gap-2 my-4 mx-4"
                  key={index + "_" + attribute + "_" + Date.now()}
                >
                  <div className="">
                    <label
                      className="text-sm font-bold"
                      htmlFor={credentialName + "_attributes"}
                    >
                      Attribute
                    </label>
                    <br />
                    <select
                      className="col-span-2 truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                      id={credentialName + "_attributes"}
                      name={credentialName + "_attributes"}
                      value={attribute}
                      onChange={(e) =>{
                        e.preventDefault()
                        onAttributeChange(
                          "attributes",
                          index,
                          e.target.value
                        )
                      }}
                    >
                      {showcaseJSON
                        ? showcaseJSON.personas[
                            selectedCharacter
                          ].credentials[
                            credentialName
                          ].attributes.map((attribute) => (
                            <option
                              key={attribute.name + "_" + Date.now()}
                              value={attribute.name}
                            >
                              {attribute.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>

                  {/* DISPLAY ATTRIBUTE VALUE */}

                  <div className="">
                    <label
                      className="text-sm font-bold"
                      htmlFor={credentialName + "_attributeValue"}
                    >
                      Attribute Value
                    </label>
                    <input
                      disabled
                      className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                      type="text"
                      id={credentialName + "_attributeValue"}
                      name={credentialName + "_attributeValue"}
                      value={
                        showcaseJSON.personas[
                          selectedCharacter
                        ].credentials[credentialName].attributes[
                          showcaseJSON.personas[
                            selectedCharacter
                          ].credentials[credentialName].attributes
                            .map((e) => e.name)
                            .indexOf(attribute)
                        ].value
                      }
                    />
                  </div>

                  {/* SELECT CONDITION TYPE */}
                  <div className="">
                    <label
                      className="text-sm font-bold"
                      htmlFor={credentialName + "_conditionType"}
                    >
                      Condition
                    </label>
                    <br />
                    <select
                      className="col-span-2 truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                      id={credentialName + "_conditionType"}
                      name={credentialName + "_conditionType"}
                      value="none"
                      onChange={(e) =>{
                        e.preventDefault()
                        onConditionTypeChange(
                          "attributes",
                          index,
                          e.target.value
                        )
                      }}
                    >
                      <option value="none">None</option>
                      <option value=">=">{`>=`}</option>
                      <option value="<=">{`<=`}</option>
                      <option value="=">{`=`}</option>
                    </select>
                  </div>
                  {/* SELECT CONDITION VALUE*/}
                  <div className="">
                    <label
                      className="text-sm font-bold"
                      htmlFor={credentialName + "_attributeValue"}
                    >
                      Condition Value
                    </label>
                    <input
                      disabled
                      className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                      type="text"
                      id={credentialName + "_conditionValue"}
                      name={credentialName + "_conditionValue"}
                    />
                  </div>
                  <button
                    className=" flex items-center text-md trash-button justify-center mt-5"
                    onClick={(e) => {
                      e.preventDefault()
                      removeAttribute("attributes", index)
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )
            )
          : null
      }

      {/* <div className="">
                    <label
                      className="text-sm font-bold"
                      htmlFor={credentialName + "_attributeValue"}
                    >
                      Condition Value
                    </label>
                    <input
                      className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                      disabled
                      type="text"
                      id={credentialName + "_conditionValue"}
                      name={credentialName + "_conditionValue"}
                    />
                  </div>
                  <button
                    className=" flex items-center text-md trash-button justify-center mt-5"
                    onClick={(e) => removeAttribute(e, "predicates", index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />{" "}
                  </button>
                </div>
              )
            )
          : null
      } */}

      {/* MAP FOR ALL PREDICATES */}
      {
        // SETTING ATTRIBUTE
        Object.entries(localData.predicates).map(([key, value], index) =>
          value.restrictions[0] === credentialName ? (
            <div className="flex flex-row gap-2 my-4 mx-4" key={key}>
              <div className="">
                <label
                  className="text-sm"
                  htmlFor={credentialName + "_attributes"}
                >
                  Attribute
                </label>
                <br />
                <select
                  id={credentialName + "_attributes"}
                  className="col-span-2 truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                  name={credentialName + "_attributes"}
                  value={value.name}
                  onChange={(e) =>{
                    e.preventDefault()
                    onAttributeChange("predicates", index, e.target.value)
                  }}
                >
                  {showcaseJSON
                    ? showcaseJSON.personas[
                        selectedCharacter
                      ].credentials[credentialName].attributes.map(
                        (attribute) => (
                          <option
                            key={attribute.name + "_" + Date.now()}
                            value={attribute.name}
                          >
                            {attribute.name}
                          </option>
                        )
                      )
                    : null}
                </select>
              </div>

              {/* DISPLAY ATTRIBUTE VALUE */}

              <div className="">
                <label
                  className="text-sm"
                  htmlFor={credentialName + "_attributeValue"}
                >
                  Attribute Value
                </label>
                <input
                  disabled
                  type="text"
                  className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                  id={credentialName + "_attributeValue"}
                  name={credentialName + "_attributeValue"}
                  value={
                    showcaseJSON.personas[
                      selectedCharacter
                    ].credentials[credentialName].attributes[
                      showcaseJSON.personas[
                        selectedCharacter
                      ].credentials[credentialName].attributes
                        .map((e) => e.name)
                        .indexOf(value.name)
                    ].value
                  }
                />
              </div>

              {/* SELECT CONDITION TYPE */}

              <div className="">
                <label
                  className="text-sm"
                  htmlFor={credentialName + "_conditionType"}
                >
                  Condition
                </label>
                <br />
                <select
                  className="col-span-2 truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                  id={credentialName + "_conditionType"}
                  name={credentialName + "_conditionType"}
                  value={value.type}
                  onChange={(e) =>{
                    e.preventDefault()
                    onConditionTypeChange(
                      "predicates",
                      index,
                      e.target.value
                    )
                  }}
                >
                  <option value="none">None</option>
                  <option value=">=">{`>=`}</option>
                  <option value="<=">{`<=`}</option>
                  <option value="=">{`=`}</option>
                </select>
              </div>

              {/* SELECT CONDITION VALUE*/}

              <div className="">
                <label
                  className="text-sm"
                  htmlFor={credentialName + "_attributeValue"}
                >
                  Condition Value
                </label>
                <input
                  type="text"
                  className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                  id={credentialName + "_conditionValue"}
                  name={credentialName + "_conditionValue"}
                  value={value.value}
                  onChange={(e) =>{
                    e.preventDefault()
                    onConditionValueChange(index, e.target.value)
                  }}
                />
              </div>
              <div
                className="flex items-center text-md trash-button justify-center mt-5"
                onClick={(e) => {
                  e.preventDefault()
                  removeAttribute("predicates", index)
                }}
              >
                <FontAwesomeIcon icon={faTrash} /> {/* Display trash icon */}
              </div>
            </div>
          ) : null
        )
      }
      <div className="w-full text-center my-4">
        <button
          className="text-xs add-attr-btn border hover:bg-light-btn-hover dark:hover:bg-dark-input font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={(e) => {
            e.preventDefault()
            addAttribute()
          }}
        >
          <span>ADD ATTRIBUTE </span>
          <span className="text-md ml-2">
            <FontAwesomeIcon icon={faCirclePlus} />
          </span>
        </button>

        <button
          className="text-xs mt-4 mb-4 mx-4 add-attr-btn border hover:bg-light-btn-hover dark:hover:bg-dark-input font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={(e) => {
            e.preventDefault()
            saveProofRequest()
          }}
        >
          SAVE
        </button>
      </div>
    </>
  );
};
