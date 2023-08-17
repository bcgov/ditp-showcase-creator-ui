function ChooseStepType({ addNewStep }) {
  return (
    <>
      <div className="flex flex-col">
        <p>Scenario</p>
        <p className="text-4xl font-bold">Add a New Step</p>
        <hr />
      </div>

      <div className="py-5">
        <button
          className="basic-step flex flex-row justify-between items-center rounded p-5 my-3 w-full text-start bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover"
          onClick={(e) => addNewStep(e, "basic")}
        >
          <p className="text-xl font-bold w-1/4">Basic</p>
          <div className="w-1/4">
            {/* <ul className=" mx-5">
              <li>Title</li>
              <li>Description</li>
            </ul> */}
          </div>

          <p className="text-2xl font-bold text-end">Add Step →</p>
        </button>

        <button
          className="basic-step flex flex-row justify-between items-center rounded p-5 my-3 w-full text-start bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover"
          onClick={(e) => addNewStep(e, "proof")}
        >
          <p className="text-xl font-bold w-2/4">Connect & Verify</p>
          {/* <div className="w-1/4">
          <ul className=" mx-5">
              <li>Title</li>
              <li>Description</li>
              <li>Image</li>
              <li>Credential(s)</li>
            </ul></div> */}

          <p className="text-2xl font-bold text-end">Add Step →</p>
        </button>
      </div>
    </>
  );
}

export { ChooseStepType };
