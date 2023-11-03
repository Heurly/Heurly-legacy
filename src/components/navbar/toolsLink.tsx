import React from "react";

import Tools from "./tool";
import cn from "classnames";

export default function ToolsLink() {
  const links = [
    {
      imageName: "webaurion",
      text: "Webaurion",
      urlLink: "https://webaurion.esiee.fr/faces/Login.xhtml",
    },
    {
      imageName: "instraEsiee",
      text: "Intranet ESIEE",
      urlLink: "https://intra.esiee.fr/",
    },
    {
      imageName: "bdeInsta",
      text: "BDE Insta",
      urlLink: "https://www.instagram.com/bde_esiee_paris/reels/",
    },
    {
      imageName: "blackboard",
      text: "Blackboard",
      urlLink: "https://esiee.blackboard.com/webapps/login/",
    },
  ];

  return (
    <div
      className={cn(
        "border-t border-neutral-600 bg-gray-200 text-neutral-950 flex flex-col place-content-end gap-y-3 py-3 px-7 w-full h-30",
        "dark:bg-neutral-950 dark:text-white",
      )}
    >
      {links &&
        links.map((link, index) => (
          <div className="" key={index}>
            <Tools
              key={index}
              iconName={link.imageName}
              text={link.text}
              urlLink={link.urlLink}
            />
          </div>
        ))}
    </div>
  );
}
