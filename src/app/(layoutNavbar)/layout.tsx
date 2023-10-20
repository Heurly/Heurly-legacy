import "@/globals.css";
import { Inter } from "next/font/google";
import cn from "classnames";
import NavBar from "@/components/common/Navbar";
import { getServerSession, Session } from "next-auth";
import authOptions from "@/utils/AuthOptions";
import { redirect, RedirectType } from "next/navigation";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "Homepage for the website.",
};

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
          <NavBar />
          <div className="md:w-4/5 md:ml-[20%] pt-[20%] md:p-5 bg-neutral-950">
            {children}
          </div>
        </div>
       )}
      {!session && redirect("/login", RedirectType.replace)} 
    </>
  );
}
