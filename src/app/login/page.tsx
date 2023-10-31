"use client";
import React from "react";
import Image from "next/image";
import { SessionProvider, signIn } from "next-auth/react";
import Button from "@/components/Button";
import cn from "classnames";

export default function Login(): React.ReactElement {
  return (
    <SessionProvider>
      <div className="md:flex w-full h-[100svh]">
        <div className="md:w-1/2 h-1/2 md:h-full flex justify-center items-center">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-4xl text-neutral-400 font-black text-center md:text-left">
              Bienvenue sur{" "}
              <span className={cn("text-neutral-950", "dark:text-white")}>
                ESIEE&nbsp;HUB
              </span>
            </h1>
            <div className={cn("text-neutral-950", "dark:text-white")}>
              <Button onClick={() => signIn("google", { callbackUrl: "/edt" })}>
                Se connecter avec Google
              </Button>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "md:w-1/2 h-1/2 md:h-full bg-white border-l-2 border-gray-600 flex justify-center items-center",
            "dark:bg-black",
          )}
        >
          <div className="flex flex-col items-center justify-center gap-y-5">
            <Image src="/images/share.svg" alt="" width={400} height={400} />
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
