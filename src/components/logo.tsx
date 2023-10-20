import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
export default function Logo(props: { className?: string }) {
  return (
    <Link href="/dashboard">
      <Image
        src="./images/logo/logo_white.svg"
        width={150}
        height={90}
        alt="Heurly logo"
      />
    </Link>
  );
}
