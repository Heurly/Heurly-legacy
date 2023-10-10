import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const res = await prisma.unit.findMany();
    return NextResponse.json(res.map(m => ({ label: m.full_name.replaceAll(';', " - "), code: m.code })));
}
