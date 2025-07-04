import Link from "next/link";
import Logo from "../logo";
import UserBar from "../navbar/UserBar";
import { headers } from "next/headers";
import ToolsLink from "../navbar/toolsLink";
import Image from "next/image";
import React from "react";
import SvgIcon from "./svgIcon";
import cn from "classnames";

const NavBar: React.FunctionComponent = () => {
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";

  const links = [
    { imageName: "dashboard", text: "Dashboard", urlLink: "/dashboard" },
    { imageName: "edt", text: "Emploi du temps", urlLink: "/edt" },
    { imageName: "actu", text: "Actualités", urlLink: "/actu" },
    { imageName: "ressource", text: "Ressource", urlLink: "/ressources" },
    { imageName: "forum", text: "Forum", urlLink: "/forum" },
  ];

  return (
    <>
      <input
        className="peer fixed top-2 left-2 cursor-pointer w-8 h-8 z-40 opacity-0 md:hidden"
        type="checkbox"
        id="navbarToggle"
      />
      <label
        htmlFor="navbarToggle"
        className={cn(
          "z-40 fixed top-2 left-2 cursor-pointer w-8 h-8 p-1 hover:bg-neutral-600 rounded-lg text-neutral-950",
          "dark:text-white",
        )}
      >
        <svg
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </label>

      <nav
        className={cn(
          "flex flex-col items-center bg-gray-200 z-30 space-y-5 py-10 fixed top-0 w-64 h-[100svh] transition-transform  sm:translate-x-0 border-r border-neutral-600 text-neutral-950 peer-checked:-translate-x-full ",
          "dark:bg-neutral-950 dark:text-white",
        )}
      >
        <div className="flex flex-col space-y-5 text-xl">
          <div className="flex flex-row items-stretch ">
            <div>
              <Logo></Logo>
            </div>
            <div className="pl-10"></div>
          </div>

          {links.map((link, index) => (
            <Link key={index} href={link.urlLink} as={link.urlLink}>
              <div className={header_url.includes(link.urlLink) ? "" : ""}>
                <div className="flex gap-x-3 p-1 rounded-lg hover:bg-neutral-600 transition duration-200 cursor-pointer">
                  <div
                    className={cn(
                      "flex items-center text-neutral-950",
                      "dark:text-white",
                    )}
                  >
                    <SvgIcon name={link.imageName} classNameStyle="" />
                  </div>
                  <div className="">
                    <p>{link.text}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <ToolsLink />
        <div>
          <UserBar />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
