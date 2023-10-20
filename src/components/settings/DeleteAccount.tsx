import Button from "../Button";

const DeleteAccount: React.FunctionComponent = async () => {
  return (
    <>
      <div className="mb-2">
        <text className="text-white font-semibold">Supprimer mon compte</text>
      </div>
      <div>
        <button
          type="button"
          className="rounded-md bg-red-800 px-2.5 py-1.5 text-sm text-white font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-600"
        >
          Supprimer
        </button>
      </div>
    </>
  );
};

export default DeleteAccount;
