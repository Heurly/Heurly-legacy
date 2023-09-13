import React from "react";
import Image from "next/image";
import GoogleLoginProvider from "@/components/login/GoogleLoginProvider";

export default function Page(): React.ReactElement {
  return (
    <div className="md:flex w-full h-screen">
      <div className="md:w-1/2 h-1/2 md:h-full flex justify-center items-center">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-4xl text-neutral-400 font-black text-center md:text-left">
            Bienvenue sur <span className="text-white">ESIEE&nbsp;HUB</span>
          </h1>
            <GoogleLoginProvider></GoogleLoginProvider>
        </div>
      </div>
      <div className="md:w-1/2 h-1/2 md:h-full bg-black border-l-2 border-gray-600 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-y-5">
          <Image src="/images/share.svg" alt="" width={400} height={400} />
        </div>
      </div>
    </div>
  );
}
