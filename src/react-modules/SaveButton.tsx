export const SaveButton = ({
  setShowModal,
}: {
  setShowModal: (showModal: boolean) => void;
}) => {
  return (
    <button
      className="mx-4 inline-flex items-center border  gap-x-1.5 hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover rounded-md  px-5 py-1.5 text-sm font-semibold shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
      onClick={() => setShowModal(true)}
    >
      SAVE PROCESS
    </button>
  );
};
