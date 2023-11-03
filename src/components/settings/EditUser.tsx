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
    <div className="mb-4 md:mb-10 flex flex-row align-middle">
      <Image
        className="rounded-full h-10 w-10 md:h-20 md:w-20 aspect-square "
        src={userSession?.user?.image ?? ""}
        alt="user icon"
        width={70}
        height={70}
      />
      <text className="bg-gray-200 text-neutral-950 dark:bg-neutral-950 dark:text-white text-xl md:text-3xl flex flex-col justify-center ml-4 md:ml-10">
        {name}
      </text>
    </div>
  );
}
