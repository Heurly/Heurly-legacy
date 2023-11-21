"use client";
import Logo from "@/components/icon/Logo";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormEvent, useState } from "react";

enum Terror {
  "email" = "Veuillez entrer une adresse e-mail valide",
  "accept" = "Vous devez accepter les CGU pour vous abonner",
}

export default function WaitlistPage() {
  const [onAccept, setOnAccept] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Terror | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get("email") && onAccept) {
      // send data with server action here

      // reset form
      e.currentTarget.reset();

      // show success messagea
      setSuccess(true);
    }
    if (!form.get("email")) setError(Terror.email);
    if (!onAccept) setError(Terror.accept);
  };

  return (
    <main className="w-full h-[100svh] flex items-center justify-center">
      <form
        className="flex flex-col justify-center items-center gap-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Logo className="w-3/4" />
        <p className="text-sky-300 font-black text-3xl">
          Heurly <span className="italic text-black">.fr</span>
        </p>
        <label htmlFor="email">
          <p className="font-bold">Email</p>
          <Input type="email" name="email" required />
          <p className=" text-sm">
            Entrer votre email pour être sur la waitlist
          </p>
        </label>
        <div className="flex gap-3">
          <Switch
            onClick={() => {
              setOnAccept(!onAccept);
            }}
            data-cy="switch"
          />
          <p className="font-bold text-sm">
            Accepter les{" "}
            <Link className="underline" href="/policy">
              CGU
            </Link>
          </p>
        </div>
        <Button variant="outline" type="submit">
          S'abonner
        </Button>
        {success && (
          <p className="text-green-500 font-bold">
            Vous êtes bien sur la waitlist
          </p>
        )}
        {error && <p className="text-red-500 font-bold">{error}</p>}
      </form>
    </main>
  );
}
