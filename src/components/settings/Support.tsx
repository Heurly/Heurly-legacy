import Button from "../Button";

const Support: React.FunctionComponent = async () => {
  return (
    <>
      <div>
        <text className="text-white">Faire une remarque</text>
        <div>
          <form>
            <label>
              <input type="text" />
            </label>
          </form>
        </div>

        <Button className="bg-white">Envoyer</Button>
      </div>
    </>
  );
};

export default Support;
