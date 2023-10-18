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
      { imageLink: "/images/dashboard.svg", text: "Dashboard", urlLink: "/dashboard" },
      { imageLink: "/images/edt.svg", text: "Emplois du temps", urlLink: "/edt" },
      { imageLink: "/images/actu.svg", text: "Actualités", urlLink: "/actu" },
      { imageLink: "/images/ressource.svg", text: "Ressource", urlLink: "/ressources" },
      { imageLink: "/images/forum.svg", text: "Forum", urlLink: "/forum" },
    ];


    return (
      <>
      <input className="peer absolute top-2 left-2 cursor-pointer w-8 h-8 z-0 opacity-0" type="checkbox" id="navbarToggle" />
      <label htmlFor="navbarToggle" className="z-10 absolute top-2 left-2 cursor-pointer w-8 h-8 p-1 hover:bg-neutral-600 rounded-lg">
          <svg aria-hidden="true" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
      </label>
      
      <nav className="flex flex-col items-center space-y-10 py-10 fixed top-0 w-64 h-full transition-transform -translate-x-full sm:translate-x-0 dark:bg-neutral-950 border-r border-neutral-600 text-white  peer-checked:hidden ">
      <div className="flex flex-col space-y-5 text-xl">
          <div className="flex flex-row items-stretch ">
              <div><Logo></Logo></div>
                <div className="pl-10">
                </div>
          </div >

        {links.map((link, index) => (
            <Link key={index} href={link.urlLink} as={link.urlLink}>
              <div className={header_url.includes(link.urlLink) ? "" : ""}>
              <div className="flex gap-x-3 p-1 rounded-lg hover:bg-neutral-600 transition duration-200 cursor-pointer">
                    <div className="flex items-center">
                        <Image className="" src={link.imageLink} alt={link.text} width={20} height={20}/>
                    </div>
                    <div className="">
                        <p>{link.text}</p>
                    </div>
              </div>
              </div>
            </Link>
          ))}
        </div>

        <ToolsLink/>
        <div>
        <UserBar/>
        </div>
      </nav>
      </>
    );
}

export default NavBar;