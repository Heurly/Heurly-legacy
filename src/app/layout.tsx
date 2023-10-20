import "@/globals.css";
import { Lato } from "next/font/google";
import Link from "next/link";

const lato = Lato({ weight: "100", subsets: ["latin"] });

export const metadata = {
  title: "Heurly",
  description: "Heurly app",
  manifest: "/manifest.json",
  themeColor: "#0A0A0A",
  appleTouchIcon: "/icon.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="fr">
      <body className="bg-neutral-950">{children}</body>
    </html>
  );
}
