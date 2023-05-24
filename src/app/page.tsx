import React from "react";
import Hub from "@/app/(layoutNavBar)/hub/page";
import Button from "./components/Button";
import Image from "next/image";

export default function Home(): React.ReactElement {
  return (
    <div className=" md:flex w-full h-screen">
      <div className="md:w-1/2 h-1/2 md:h-full flex justify-center items-center">
        <h1 className="text-4xl font-black text-center md:text-left">
          Bienvenue sur <span className="text-white">ESIEE&nbsp;HUB</span>
        </h1>
      </div>
      <div className="md:w-1/2 h-1/2 md:h-full bg-black flex justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-y-5">
          <Image src="/images/3_User.svg" alt="" width={200} height={200} />
          <Button className="bg-white text-black flex items-center justify-center font-bold">
            <Image
              src="/images/mdi_google.svg"
              alt="connect with Google"
              width={30}
              height={30}
            />
            Se connecter avec votre compte ESIEE
          </Button>
        </div>
      </div>
    </div>
  );
}
