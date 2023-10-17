import "@/globals.css";
import { Inter } from "next/font/google";
import cn from "classnames";
import NavBar from "@/components/common/Navbar";
import { getServerSession, Session } from "next-auth";
import authOptions from "@/utils/AuthOptions";
import { redirect, RedirectType } from "next/navigation";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default async function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactElement> {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <>
      {session && (
        <div className={cn(inter.className)}>
          <div className="w-screen h-screen flex flex-row">
            <div className="hidden md:block lg:block h-full w-2/12 fixed">
              <NavBar />
            </div>
            <div className="basis-2/12"></div>
            <div className="h-full basis-10/12 p-6 overflow-hidden bg-neutral-950">
              {children}
            </div>
          </div>
        </div>
      )}
      {!session && redirect("/login", RedirectType.replace)}
    </>
  );
}
