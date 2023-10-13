import React from "react";

import Tools from "./tool";

export default function ToolsLink() {
    
    const links = [
      { imageLink: "/images/webaurion.svg", text: "Webaurion",urlLink: "https://webaurion.esiee.fr/faces/Login.xhtml" },
      { imageLink: "/images/instraEsiee.svg", text: "Intranet ESIEE", urlLink: "https://intra.esiee.fr/" },
      { imageLink: "/images/bdeInstra.svg", text: "BDE Instra", urlLink: "https://www.instagram.com/bde_esiee_paris/reels/" },
      { imageLink: "/images/blackboard.svg", text: "Blackboard",urlLink: "https://esiee.blackboard.com/webapps/login/" },
      
    ];
  
    return (
       
        <div className="border-t border-neutral-600 bg-neutral-950 text-white flex flex-col justify-end gap-y-3 py-3 px-7 w-full h-30  ">
          {links && links.map((link, index) => (
            <div className="" key={index}>
            <Tools key={index} imageLink={link.imageLink} text={link.text} urlLink={link.urlLink} />
            </div>
          ))}
        </div>
      );
  }