import Link from "next/link";
import Logo from "../logo";
import UserBar from "../UserBar";
import { headers } from "next/headers";
import ToolsLink from "../toolsLink";
import Image from "next/image";

import React from "react";

const NavBar: React.FunctionComponent = () => {
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";

  const links = [
    {
      imageLink: "/images/dashboard.svg",
      text: "Dashboard",
      urlLink: "/dashboard",
    },
    { imageLink: "/images/edt.svg", text: "Emploi du temps", urlLink: "/edt" },
    { imageLink: "/images/actu.svg", text: "Actualités", urlLink: "/actu" },
    {
      imageLink: "/images/ressource.svg",
      text: "Ressource",
      urlLink: "/ressources",
    },
    { imageLink: "/images/forum.svg", text: "Forum", urlLink: "/forum" },
  ];

  return (
    <nav className="flex flex-col items-center space-y-10 py-10 fixed top-0 w-64 h-[100svh] transition-transform -translate-x-full sm:translate-x-0 dark: bg-neutral-950 border-r border-neutral-600 text-white">
      <div className="flex flex-col space-y-5 text-xl">
        <div>
          <Logo></Logo>
        </div>
        {links.map((link, index) => (
          <Link key={index} href={link.urlLink} as={link.urlLink}>
            <div className={header_url.includes(link.urlLink) ? "" : ""}>
              <div className="flex gap-x-3 p-1 rounded-lg hover:bg-neutral-600 transition duration-200 cursor-pointer">
                <div className="flex items-center">
                  <Image
                    className=""
                    src={link.imageLink}
                    alt={link.text}
                    width={20}
                    height={20}
                  />
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
      <UserBar />
    </nav>
  );
};

export default NavBar;
