import Button from "../Button";

const DeleteAccount: React.FunctionComponent = async () => {
  return (
    <>
      <div>
        <text className="text-white">Supprimer mon compte</text>
        <div>
          <Button className="rounded-full bg-red-800 text-white">
            Supprimer
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
