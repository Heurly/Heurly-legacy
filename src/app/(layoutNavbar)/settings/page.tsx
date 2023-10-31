import ChangeColor from "@/components/settings/ChangeColor";
import DeleteAccount from "@/components/settings/DeleteAccount";
import EditUser from "@/components/settings/EditUser";
import Support from "@/components/settings/Support";
import authOptions from "@/utils/AuthOptions";
import { Session, getServerSession } from "next-auth";

const Settings: React.FunctionComponent = async () => {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <div className="w-full h-full mt-2 md:mt-16 pl-10 pr-10 md:pl-44 md:pr-44 place-content-center">
      <EditUser userSession={session} />
      <ChangeColor />
      <Support userSession={session} />
      <DeleteAccount />
    </div>
  );
};

export default Settings;
