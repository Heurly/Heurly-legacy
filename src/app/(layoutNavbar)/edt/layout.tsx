"use client";
import "@/globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";

export default function EdtLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <SessionProvider>{children}</SessionProvider>;
}
