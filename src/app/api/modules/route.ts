import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export type ModuleFilter = {
    contains: string[];
}

export async function POST(request: NextRequest) {
    const payload = await request.json() as ModuleFilter;
    const condition = {AND: payload.contains.map(w => ({
            full_name: {
                contains: w
            }
        }))};
    let res = await prisma.unit.findMany({
        where: condition
    });

    return NextResponse.json(
        res.map(m =>
            ({label: m.full_name.replaceAll(';', " - "), code: m.code})));
}
