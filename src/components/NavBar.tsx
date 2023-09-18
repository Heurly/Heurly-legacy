import Link from "next/link";
import Logo from "./logo";
import UserBar from "./UserBar";
import { headers } from "next/headers";

export default function NavBar() {
  const headersList = headers();
  // read the custom x-url header
  const header_url = headersList.get("x-url") || "";

  console.log(header_url)
  return (
    <nav className="flex md:flex-col items-center justify-between md:h-full md:w-1/5 w-full m-0 bg-neutral-950 border-r border-neutral-600 text-white fixed top-0 gap-y-5 max-w-sm min-w-[250px] overflow-auto">
      <div className="py-20 flex flex-col gap-y-10 text-xl">
        <Logo />
        <Link href="#" className={header_url == "/dashboard" ? "font-bold" : ""}>
          Dashboard
        </Link>
        <Link href="#">Emplois du temps</Link>
        <Link href="#">Actualités</Link>
        <Link href="#">Ressources</Link>
        <Link href="#">Forum</Link>
      </div>
      <UserBar />
    </nav>
  );
}
