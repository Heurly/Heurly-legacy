import { NextResponse } from "next/server";

export default async function Middleware(req: Request) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
