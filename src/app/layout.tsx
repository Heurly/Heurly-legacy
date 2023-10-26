import "@/globals.css";
import { Lato } from "next/font/google";
import Link from "next/link";
import cn from "classnames";

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
    <html>
      <body className={cn("bg-gray-200", "dark:bg-neutral-950")} >{children}</body>
    </html>
  );
}
