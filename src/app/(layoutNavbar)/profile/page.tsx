import React from "react";
import { getServerSession, Session } from "next-auth";
import authOptions from "@/utils/AuthOptions";
import ModuleSelector from "@/components/profile/ModuleSelector";
import ModuleList from "@/components/profile/ModuleList";
import Image from "next/image";
import EditIcon from "@/components/profile/EditIcon";

const Profile: React.FunctionComponent = async () => {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <>
      {session != null ? (
        <div>
          <div>
            <h1 className="text-white font-bold text-4xl mb-6">
              Editer mon profil
            </h1>
          </div>
          <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-600">
            <div className="flex align-middle items-center mb-3">
              <Image
                className="rounded-3xl mr-4"
                width={50}
                height={50}
                src={session.user.image ?? ""}
                alt="profile"
              />
              <h2 className="text-white font-bold text-2xl">
                Profil de {session.user.name}
              </h2>
            </div>
            <ModuleList session={session} />
          </div>
          <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-600 mt-6">
            <div className="flex align-middle items-center mb-3 text-white">
              <EditIcon />
              <h2 className="font-bold text-2xl ml-4">Ajouter un module</h2>
            </div>
            <ModuleSelector session={session} />
          </div>
        </div>
      ) : (
        <div>Vous n'êtes pas connecté.</div>
      )}
    </>
  );
};

export default Profile;
