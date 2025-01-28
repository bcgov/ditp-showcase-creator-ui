import "./onboarding-styles/onboarding-style.css";

export const CreateNewStep = ({
  addNewStep,
}: {
  addNewStep: (isBasic: boolean) => void;
}) => {
  return (
    <>
      <div className="flex flex-col ">
        <p>Onboarding</p>
        <p className="text-4xl font-bold">Create a New Step</p>
        <hr />
      </div>

      <div className="py-5 ">
        <button
          className="basic-step flex flex-row justify-between items-center rounded p-5 my-3 w-full text-start bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover"
          onClick={(e) => addNewStep(false)}
        >
          <p className="text-xl font-bold w-1/4">Basic</p>
          <div className="w-1/4">
            <ul className=" mx-5">
              <li>Title</li>
              <li>Description</li>
              <li>Image</li>
            </ul>
          </div>

          <p className="text-2xl font-bold text-end">Add Step →</p>
        </button>

        <button
          className="basic-step flex flex-row justify-between items-center rounded p-5 my-3 w-full text-start bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover"
          onClick={(e) => addNewStep(true)}
        >
          <p className="text-xl font-bold w-1/4">Issue Credential</p>
          <div className="w-1/4">
            <ul className=" mx-5">
              <li>Title</li>
              <li>Description</li>
              <li>Image</li>
              <li>Credential(s)</li>
            </ul>
          </div>

          <p className="text-2xl font-bold text-end">Add Step →</p>
        </button>
      </div>
    </>
  );
}
