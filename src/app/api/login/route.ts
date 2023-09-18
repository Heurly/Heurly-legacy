import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

const GOOGLE_USERINFO_ENDPOINT = (access_token: string) => `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`;
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const accessToken: string = await request.json();
    const profile = await fetch(GOOGLE_USERINFO_ENDPOINT(accessToken), {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json'
        },
    }).then(data => Promise.resolve(data.json()));

    let user = await prisma.user.findUnique({
        where: {
            email: profile.email,
        }
    });
    if (user != null) {
        cookies().set('user', user.id.toString());
        return NextResponse.json({ok: true});
    }

    user = await prisma.user.create({
        data: {
            email: profile.email,
            name: profile.name,
        },
    });

    if (user != null) {
        cookies().set('user', user.id.toString());
        return NextResponse.json({ok: true});
    }

    return NextResponse.json({ok: false});
}