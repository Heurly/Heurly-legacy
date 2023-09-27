import "@/globals.css";
import { Inter } from "next/font/google";
import cn from "classnames";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "Homepage for the website.",
};

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  
  return (
    <>
      <div className={cn(inter.className)}>
        <NavBar/>
        <div className="md:w-4/5 md:ml-[20%] pt-[20%] md:p-5 bg-neutral-950">
          {children}
        </div>
      </div>
    </>
  );
}
