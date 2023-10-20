import ChangeColor from "@/components/settings/ChangeColor";
import DeleteAccount from "@/components/settings/DeleteAccount";
import EditUser from "@/components/settings/EditUser";
import Support from "@/components/settings/Support";
import authOptions from "@/utils/AuthOptions";
import { Session, getServerSession } from "next-auth";

const Settings: React.FunctionComponent = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const name = session?.user.name;

  return (
    <>
      <div className="w-full h-full mt-16 pl-44 pr-44 place-content-center">
        <EditUser />
        <ChangeColor />
        <Support />
        <DeleteAccount />
      </div>
    </>
  );
};

export default Settings;
