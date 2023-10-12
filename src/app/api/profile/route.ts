import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {ModuleChoice} from "@/app/(layoutNavbar)/edt/types";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const payload: { email: string } = await request.json();

    let profile = await prisma.user.findFirst({
        where: {
            email: payload.email
        }
    });

    let res = await prisma.unit.findMany({
            where: {
                code: {
                    in: profile?.profile
                }
            }
        }
    )

    return NextResponse.json(res.map(u => ({label: u.name, code: u.code} as ModuleChoice)));
}
