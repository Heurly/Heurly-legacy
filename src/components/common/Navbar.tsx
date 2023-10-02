import Link from "next/link";
import Logo from "../logo";
import UserBar from "../UserBar";
import { headers } from "next/headers";
import ToolsLink from "../toolsLink";

export default function NavBar() {
  const headersList = headers();

  const header_url = headersList.get("x-url") || "";

  return (
    <nav className="flex md:flex-col items-center justify-between md:h-full md:w-1/5 w-full m-0 bg-neutral-950 border-r border-neutral-600 text-white fixed top-0 gap-y-5 max-w-sm min-w-[250px] overflow-auto">
      <div className="py-20 flex flex-col gap-y-10 text-xl">
        <Logo />
        <Link
          href="#"
          className={header_url.includes("/dashboard") ? "font-bold" : ""}
        >
          Dashboard
        </Link>
        <Link
          href="/edt"
          className={header_url.includes("/edt") ? "font-bold" : ""}
        >
          Emplois du temps
        </Link>
        <Link
          href="#"
          className={header_url.includes("/actu") ? "font-bold" : ""}
        >
          Actualités
        </Link>
        <Link
          href="/ressources"
          className={header_url.includes("/ressources") ? "font-bold" : ""}
        >
          Ressources
        </Link>
        <Link
          href="#"
          className={header_url.includes("/forum") ? "font-bold" : ""}
        >
          Forum
        </Link>
      </div>
      <ToolsLink />
      <UserBar />
      
    </nav>
  );
}
