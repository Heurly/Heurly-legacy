"use client";
import { useSession, signOut } from "next-auth/react";
import React from "react";

const Logout: React.FunctionComponent = () => {
  const { data: session } = useSession();

  return (
    <>
      {session != undefined && (
        <div>
          Signed in as {session?.user?.email} <br />
          <button onClick={() => signOut()}>Déconnexion</button>
        </div>
      )}
    </>
  );
};

export default Logout;
