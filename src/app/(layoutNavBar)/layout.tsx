import SearchBar from "@/components/search-bar";
import "@/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import cn from "classnames";
import Button from "@/components/Button";
import Logo from "@/components/logo";
import NavBar from "@/components/NavBar";

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
        <NavBar/>
        <div className="md:w-4/5 md:ml-[20%] pt-[20%] md:p-5 bg-neutral-900">
          {children}
        </div>
      </body>
    </>
  );
}
