import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {GoogleProfile} from "@/utils/Google";
import {ROOT_URL} from "@/config/const";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const profile: GoogleProfile = await request.json();

    let user = await prisma.user.findUnique({
        where: {
            email: profile.email,
        }
    });
    console.log(user);
    if (user != null) {
        return NextResponse.json(profile);
    }

    user = await prisma.user.create({
        data: {
            email: profile.email,
            name: profile.name,
        },
    });

    if (user != null) {
        return NextResponse.json(profile);
    }
}