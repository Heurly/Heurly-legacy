import { useSession, signOut } from "next-auth/react";
import React from "react";
import Image from "next/image";
import { Session, getServerSession } from "next-auth";
import authOptions from "@/utils/AuthOptions";

const EditUser: React.FunctionComponent = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const name = session?.user.name;
  return (
    <>
      <div className="h-40">
        <Image
          className="rounded-2xl"
          src={session?.user?.image ?? ""}
          alt="user icon"
          width={70}
          height={70}
        />
        <h1 className="text-white">{name}</h1>
      </div>
      {/* <div className="-pt-2 -pb-2">
        <hr className=" border-gray-600 "/>
      </div> */}
    </>
  );
};

export default EditUser;
