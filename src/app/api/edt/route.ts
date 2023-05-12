import { NextResponse } from "next/server";
import { PLANIF_ENDPOINT, EDTData, URLBuilder } from "@/app/api/ApiHelper";

export async function GET(payload: { [params: string]: string }) {
  const endpoint = URLBuilder(PLANIF_ENDPOINT, payload);

  const data = await fetch(endpoint, {
    method: "GET",
  });

  if (!data.ok) {
    throw new Error(data.statusText);
  }

  return NextResponse.json(data);
}
