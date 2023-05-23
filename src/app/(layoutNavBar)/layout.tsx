import SearchBar from "@/components/search-bar";
import "@/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import cn from "classnames";
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
        <nav className="flex md:flex-col items-start p-5 justify-start md:h-full md:w-1/5 w-full m-0 bg-black text-white fixed top-0 ">
          <SearchBar placeholder="Rechercher une ressource" />
          <Link href="/hub">Hub</Link>
          <Link href="/edt">Emploi du temps</Link>
        </nav>
        <div className="md:w-4/5 md:ml-[20%] pt-[20%] md:pt-[unset]">
          {children}
        </div>
      </body>
    </>
  );
}
