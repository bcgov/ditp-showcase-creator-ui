import "./onboarding-styles/onboarding-style.css";

function CreateNewStep({ addNewStep }) {
  return (
    <>
      <div className="flex flex-col p-5 ">
        <p>Onboarding</p>
        <p className="text-4xl font-bold">Create a New Step</p>
        <hr />
      </div>

      <button className="basic-step rounded p-5 my-3 w-full text-start" onClick={(e) => addNewStep(false)}>
        <p className="text-2xl font-bold">Basic Step</p>
        <div className="my-3">
          <p>You'll be asked to fill out the following:</p>
          <ul className="list-disc mx-5">
            <li>Title</li>
            <li>Description</li>
            <li>Image</li>
          </ul>
        </div>
        <p className="text-2xl font-bold w-full text-end">Add Step →</p>
      </button>


      <button className="basic-step rounded p-5 my-3 w-full text-start" onClick={(e) => addNewStep(true)}>
        <p className="text-2xl font-bold">Issue Credential Step</p>
        <div className="my-3">
          <p>You'll be asked to fill out the following:</p>
          <ul className="list-disc mx-5">
            <li>Title</li>
            <li>Description</li>
            <li>Image</li>
            <li>Selected Credential(s)</li>
          </ul>
        </div>
        <p className="text-2xl font-bold w-full text-end">Add Step →</p>
      </button>
    </>
  );
}

export { CreateNewStep };
