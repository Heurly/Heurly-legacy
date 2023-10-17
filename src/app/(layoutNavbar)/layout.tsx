import "@/globals.css";
import {Inter} from "next/font/google";
import cn from "classnames";
import NavBar from "@/components/common/Navbar";
import {getServerSession, Session} from "next-auth";
import authOptions from "@/utils/AuthOptions";
import {redirect, RedirectType} from "next/navigation";
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
  const session: Session | null  = await getServerSession(authOptions);

  return (
    <>
      {session && (
        <div className={cn(inter.className)}>
          {/* <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only"></span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
             <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
      </button> */}
          <NavBar/>
          <div className="md:w-4/5 md:ml-[20%] pt-[20%] md:p-5 bg-neutral-950">
            {children}
          </div>
        </div>
      )}
      {!session && redirect('/login', RedirectType.replace)}
    </>
  );
}
