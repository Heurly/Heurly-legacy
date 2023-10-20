import React from "react";
import Image from "next/image";
import { Session } from "next-auth";
import authOptions from "@/utils/AuthOptions";

type Props = {
  userSession: Session | null;
};

export default function EditUser({ userSession }: Props) {
  const name = userSession?.user.name;

  return (
    <div className="h-40 flex flex-row">
      <Image
        className="rounded-full h-20 w-20"
        src={userSession?.user?.image ?? ""}
        alt="user icon"
        width={70}
        height={70}
      />
      <h1 className="text-white">{name}</h1>
    </div>
  );
}
