import SettingsBtn from "./SettingsBtn";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/AuthOptions";
import Image from "next/image";
import React from "react";
import SvgIcon from "../common/svgIcon";
import cn from "classnames";

export default async function UserBar(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session != undefined && (
          <div className="border-t border-neutral-600 flex justify-items-center items-center justify-center gap-10 py-1 px-3 w-full">
            <div className="flex justify-items-center items-center w-10/12">
              <Image
                className="rounded-2xl"
                src={session?.user?.image ?? ""}
                alt="user icon"
                width={32}
                height={32}
              />
              <p className="p-4">{session?.user?.name ?? ""}</p>
            </div>
            <SettingsBtn />
            <a href="/api/auth/signout" className={cn("text-neutral-950", "dark:text-white")}>
              <SvgIcon name="logOut" classNameStyle=""/>
            </a>
          </div>
      )}
    </>
  );
}
