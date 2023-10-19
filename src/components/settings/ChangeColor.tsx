import Button from "../Button";

const ChangeColor: React.FunctionComponent = async () => {
  return (
    <>
      <div>
        <text className="text-white">Changer de couleur de thème</text>
        <div>
          <Button
            className="rounded-full bg-white "
            children={undefined}
          ></Button>
          <Button
            className="rounded-full bg-black "
            children={undefined}
          ></Button>
          <Button
            className="rounded-full bg-red-700 "
            children={undefined}
          ></Button>
          <Button
            className="rounded-full bg-yellow-100"
            children={undefined}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default ChangeColor;
