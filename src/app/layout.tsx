import "@/globals.css";
import { Lato } from "next/font/google";

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
      <body className="bg-neutral-950">{children}</body>
    </html>
  );
}
