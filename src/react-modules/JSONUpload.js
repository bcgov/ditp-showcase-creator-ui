import { useState, useRef } from "react";
import { ErrorModal } from './ErrorModal'

function JSONUploadButton({ setShowcaseJSON }) {

    // Error handling
    const [showModal, setShowModal] = useState(false);


  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const fileContent = reader.result;
        console.log(fileContent);
        try{
            setShowcaseJSON(JSON.parse(`{"personas": ${fileContent}}`));
        }catch(e){
            console.log("JSON is not formatted properly!")
            setShowModal(true);
        }
        
      };

      fileInputRef.current.value = "";
    } else {
      console.log("Invalid file format. Please select a JSON file.");
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
    <div>
      <input
        type="file"
        accept=".json"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
      <button 
      className="p-1 hover:bg-gray-200 dark:bg-zinc-200 dark:hover:bg-zinc-400 dark:hover:text-gray-100 m-2 border rounded shadow bg-white"
      onClick={handleClick}>Load</button>
    </div>

    {
    showModal ? <ErrorModal 
    errorText={"Uploaded file was invalid. \n Please try again, or open the file in a text editor to check for well-formed JSON."} 
    setShowModal={setShowModal}/> : null
    }
    
    </>
  );
}

export { JSONUploadButton };
