import SearchBar from "@/components/search-bar";
import "@/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import cn from "classnames";
import Button from "@/components/Button";
import Logo from "@/components/logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "Homepage for the website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  
  return (
    <>
      <body className={cn(inter.className)}>
        <nav className="flex md:flex-col p-5 md:h-full md:w-1/5 w-full m-0 bg-neutral-950 border-r border-neutral-600 text-white fixed top-0 gap-y-5">
          <Logo className="text-3xl flex items-center justify-center"/>
          <SearchBar placeholder="Rechercher une ressource" />
          <Link href="/hub">
            <Button className="w-full">Hub</Button>
          </Link>
          <Link href="/edt">
            <Button className="w-full">Emploi du temps</Button>
          </Link>
        </nav>
        <div className="md:w-4/5 md:ml-[20%] pt-[20%] md:p-5 bg-neutral-900">
          {children}
        </div>
      </body>
    </>
  );
}
