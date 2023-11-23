import { Inter } from "next/font/google";
import "@/globals.css";
const inter = Inter({ subsets: ["latin"] });
import NavBar from "@/components/Navbar";
import TopBar from "@/components/Topbar";

export default function NavBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:flex gap-x-6 md:flex-row md:justify-between md:p-5 h-[100svh] w-[100svw]">
      <TopBar />
      <NavBar />
      <div>{children}</div>
    </div>
  );
}
