import "@/globals.css";
import { Lato } from "next/font/google";
import Link from "next/link";

const lato = Lato({ weight: "100", subsets: ["latin"] });

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
      <body className="bg-[#E3E3E3]">{children}</body>
    </>
  );
}
