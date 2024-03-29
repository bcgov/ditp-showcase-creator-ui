import { useImmer } from "use-immer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./scenario-styles/scenario-styles.css";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const EditProofRequest = (
  showcaseJSON,
  proofRequest,
  credentialName,
  selectedCharacter,
  setShowcaseJSON,
  selectedScenario,
  selectedStep,
  setEditingCredentials,
  editingIndex
) => {
  const [localData, setLocalData] = useImmer(
    showcaseJSON.showcaseJSON.personas[showcaseJSON.selectedCharacter]
      .scenarios[showcaseJSON.selectedScenario].steps[showcaseJSON.selectedStep]
      .requestOptions.proofRequest
  );

  const OnAttributeChange = (e, type, index, newValue) => {
    e.preventDefault();
    if (type === "attributes") {
      setLocalData((json) => {
        json.attributes[showcaseJSON.credentialName].attributes[index] =
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

  const OnConditionValueChange = (e, index, newValue) => {
    e.preventDefault();
    let keysArray = Object.keys(localData.predicates);
    let key = keysArray[index];

    setLocalData((json) => {
      json.predicates[key].value = newValue;
    });
  };

  const OnConditionTypeChange = (e, type, index, newValue) => {
    e.preventDefault();
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
        json.attributes[showcaseJSON.credentialName].attributes.push(attribute);
      });
    } else if (type === "attributes" && newValue !== "none") {
      // Switching basic to predicate check
      let attribute =
        localData.attributes[showcaseJSON.credentialName].attributes[index];
      setLocalData((json) => {
        json.attributes[showcaseJSON.credentialName].attributes.splice(
          index,
          1
        );
      });

      setLocalData((json) => {
        json.predicates[Date.now()] = {
          name: attribute,
          type: newValue,
          value: "",
          restrictions: [showcaseJSON.credentialName],
        };
      });
    }
  };

  const AddAttribute = (e) => {
    e.preventDefault();
    setLocalData((json) => {
      if (json.attributes[showcaseJSON.credentialName]) {
        // If the credential is not blank/empty
        json.attributes[showcaseJSON.credentialName].attributes.push(
          showcaseJSON.showcaseJSON.personas[showcaseJSON.selectedCharacter]
            .credentials[showcaseJSON.credentialName].attributes[0].name
        );
      } else {
        json.attributes[showcaseJSON.credentialName] = {
          // if the credential IS blank/empty (adding the first attribute to this proof)
          attributes: [
            showcaseJSON.showcaseJSON.personas[showcaseJSON.selectedCharacter]
              .credentials[showcaseJSON.credentialName].attributes[0].name,
          ],
          restrictions: [
            showcaseJSON.showcaseJSON.personas[showcaseJSON.selectedCharacter]
              .credentials[showcaseJSON.credentialName].name,
          ],
        };
      }
    });
  };

  const RemoveAttribute = (e, type, index) => {
    e.preventDefault();

    if (type === "attributes")
      setLocalData((json) => {
        json.attributes[showcaseJSON.credentialName].attributes.splice(
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

  const SaveProofRequest = (e) => {
    e.preventDefault();

    // close the proof request edit window
    showcaseJSON.setEditingCredentials((prev) => {
      // let temp = prev.splice(showcaseJSON.editingIndex,1)
      // console.log(temp)
      // return temp
      return [];
    });

    showcaseJSON.setShowcaseJSON((json) => {
      json.personas[showcaseJSON.selectedCharacter].scenarios[
        showcaseJSON.selectedScenario
      ].steps[showcaseJSON.selectedStep].requestOptions.proofRequest =
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
        localData.attributes[showcaseJSON.credentialName] &&
        localData.attributes[showcaseJSON.credentialName].attributes
          ? localData.attributes[showcaseJSON.credentialName].attributes.map(
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
                      id={showcaseJSON.credentialName + "_attributes"}
                      name={showcaseJSON.credentialName + "_attributes"}
                      value={attribute}
                      onChange={(e) =>
                        OnAttributeChange(
                          e,
                          "attributes",
                          index,
                          e.target.value
                        )
                      }
                    >
                      {showcaseJSON
                        ? showcaseJSON.showcaseJSON.personas[
                            showcaseJSON.selectedCharacter
                          ].credentials[
                            showcaseJSON.credentialName
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
                      htmlFor={showcaseJSON.credentialName + "_attributeValue"}
                    >
                      Attribute Value
                    </label>
                    <input
                      disabled
                      className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                      type="text"
                      id={showcaseJSON.credentialName + "_attributeValue"}
                      name={showcaseJSON.credentialName + "_attributeValue"}
                      value={
                        showcaseJSON.showcaseJSON.personas[
                          showcaseJSON.selectedCharacter
                        ].credentials[showcaseJSON.credentialName].attributes[
                          showcaseJSON.showcaseJSON.personas[
                            showcaseJSON.selectedCharacter
                          ].credentials[showcaseJSON.credentialName].attributes
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
                      htmlFor={showcaseJSON.credentialName + "_conditionType"}
                    >
                      Condition
                    </label>
                    <br />
                    <select
                      className="col-span-2 truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                      id={showcaseJSON.credentialName + "_conditionType"}
                      name={showcaseJSON.credentialName + "_conditionType"}
                      value="none"
                      onChange={(e) =>
                        OnConditionTypeChange(
                          e,
                          "attributes",
                          index,
                          e.target.value
                        )
                      }
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
                      htmlFor={showcaseJSON.credentialName + "_attributeValue"}
                    >
                      Condition Value
                    </label>
                    <input
                      disabled
                      className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                      type="text"
                      id={showcaseJSON.credentialName + "_conditionValue"}
                      name={showcaseJSON.credentialName + "_conditionValue"}
                    />
                  </div>
                  <button
                    className=" flex items-center text-md trash-button justify-center mt-5"
                    onClick={(e) => RemoveAttribute(e, "attributes", index)}
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
                      htmlFor={showcaseJSON.credentialName + "_attributeValue"}
                    >
                      Condition Value
                    </label>
                    <input
                      className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                      disabled
                      type="text"
                      id={showcaseJSON.credentialName + "_conditionValue"}
                      name={showcaseJSON.credentialName + "_conditionValue"}
                    />
                  </div>
                  <button
                    className=" flex items-center text-md trash-button justify-center mt-5"
                    onClick={(e) => RemoveAttribute(e, "predicates", index)}
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
          value.restrictions[0] === showcaseJSON.credentialName ? (
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
                  id={showcaseJSON.credentialName + "_attributes"}
                  className="col-span-2 truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                  name={showcaseJSON.credentialName + "_attributes"}
                  value={value.name}
                  onChange={(e) =>
                    OnAttributeChange(e, "predicates", index, e.target.value)
                  }
                >
                  {showcaseJSON
                    ? showcaseJSON.showcaseJSON.personas[
                        showcaseJSON.selectedCharacter
                      ].credentials[showcaseJSON.credentialName].attributes.map(
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
                  htmlFor={showcaseJSON.credentialName + "_attributeValue"}
                >
                  Attribute Value
                </label>
                <input
                  disabled
                  type="text"
                  className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                  id={showcaseJSON.credentialName + "_attributeValue"}
                  name={showcaseJSON.credentialName + "_attributeValue"}
                  value={
                    showcaseJSON.showcaseJSON.personas[
                      showcaseJSON.selectedCharacter
                    ].credentials[showcaseJSON.credentialName].attributes[
                      showcaseJSON.showcaseJSON.personas[
                        showcaseJSON.selectedCharacter
                      ].credentials[showcaseJSON.credentialName].attributes
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
                  htmlFor={showcaseJSON.credentialName + "_conditionType"}
                >
                  Condition
                </label>
                <br />
                <select
                  className="col-span-2 truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                  id={showcaseJSON.credentialName + "_conditionType"}
                  name={showcaseJSON.credentialName + "_conditionType"}
                  value={value.type}
                  onChange={(e) =>
                    OnConditionTypeChange(
                      e,
                      "predicates",
                      index,
                      e.target.value
                    )
                  }
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
                  htmlFor={showcaseJSON.credentialName + "_attributeValue"}
                >
                  Condition Value
                </label>
                <input
                  type="text"
                  className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
                  id={showcaseJSON.credentialName + "_conditionValue"}
                  name={showcaseJSON.credentialName + "_conditionValue"}
                  value={value.value}
                  onChange={(e) =>
                    OnConditionValueChange(e, index, e.target.value)
                  }
                />
              </div>
              <div
                className="flex items-center text-md trash-button justify-center mt-5"
                onClick={(e) => RemoveAttribute(e, "predicates", index)}
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
          onClick={(e) => AddAttribute(e)}
        >
          <span>ADD ATTRIBUTE </span>
          <span className="text-md ml-2">
            <FontAwesomeIcon icon={faCirclePlus} />
          </span>
        </button>

        <button
          className="text-xs mt-4 mb-4 mx-4 add-attr-btn border hover:bg-light-btn-hover dark:hover:bg-dark-input font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={(e) => SaveProofRequest(e)}
        >
          SAVE
        </button>
      </div>
    </>
  );
};

export { EditProofRequest };
