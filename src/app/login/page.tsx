import Logo from "@/components/icon/Logo";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/icon/GoogleIcon";
import cn from "classnames";

export default function LoginPage() {
  return (
    <main
      className={cn(
        "w-full h-[100svh] flex flex-col  justify-between items-center",
        "md:flex-row",
      )}
    >
      <div className="w-full flex flex-col items-center justify-center h-full gap-y-5">
        <div className="flex items-center flex-col">
          <Logo className={cn("w-1/2", " md:11/12")} />
          <p className="text-sky-300 font-black text-3xl">
            Heurly <span className="italic text-black">.fr</span>
          </p>
        </div>
        <p className={cn("font-bold text-center leading-5 ", "md:hidden")}>
          Pour les étudiants
          <br /> Par les étudiants
        </p>
      </div>
      <div
        className={cn(
          "w-full bg-white rounded-t-xl flex  gap-10 items-center justify-center py-10",
          "md:h-full md:rounded-none md:flex-col",
        )}
      >
        <p
          className={cn(
            "font-extrabold text-center text-3xl hidden",
            " md:block",
          )}
        >
          Pour les <span className="italic">étudiants</span>
          <br /> Par les <span className="italic">étudiants</span>
        </p>
        <Button className="bg-black">
          <GoogleIcon className="w-7" />
          Se connecter
        </Button>
      </div>
    </main>
  );
}
