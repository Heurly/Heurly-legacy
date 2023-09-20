import React from "react";

import Tools from "./tool";

export default function ToolsLink() {
    
    const links = [
      { imageLink: "/images/webaurion.svg", text: "Webaurion",urllink: "https://webaurion.esiee.fr/faces/Login.xhtml" },
      { imageLink: "/images/instraEsiee.svg", text: "Intranet ESIEE", urllink: "https://intra.esiee.fr/" },
      { imageLink: "/images/bdeInstra.svg", text: "BDE Instra", urllink: "https://www.instagram.com/bde_esiee_paris/reels/" },
      { imageLink: "/images/blackboard.svg", text: "Blackboard",urllink: "https://esiee.blackboard.com/webapps/login/" },
      
    ];
  
    return (
       
        <div className="border-t border-neutral-600 bg-neutral-950 text-white flex flex-col justify-center gap-5 py-5 px-7 w-full  ">
          {links.map((link, index) => (
            <div className="pl-5">
            <Tools key={index} imageLink={link.imageLink} text={link.text} urllink={link.urllink} />
            </div>
          ))}
        </div>
      );
  }