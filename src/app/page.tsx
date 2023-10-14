import React from "react";
import { getServerSession, Session } from "next-auth";
import authOptions from "@/utils/AuthOptions";
import { redirect, RedirectType } from "next/navigation";

export default async function Page(): Promise<React.ReactElement> {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <div className="md:flex w-full h-screen">
      {session && redirect("/edt", RedirectType.replace)}
      {!session && redirect("/login", RedirectType.replace)}
    </div>
  );
}
