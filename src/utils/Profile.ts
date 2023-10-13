import {ModuleChoice} from "@/app/(layoutNavbar)/edt/types";
import {API_URL} from "@/config/const";
import {PrismaClient} from "@prisma/client";

export interface Profile {
    modules: ModuleChoice[];
}

const prisma = new PrismaClient();

export async function getProfile(email: string) {
    const payload = {email: email};

    const data = await fetch(API_URL + "/profile",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    return await data.json() as ModuleChoice[];
}

export async function fetchProfile(email: string) {
    const profile = await prisma.user.findFirst({
        where: {
            email: email
        }
    });

    const res = await prisma.unit.findMany({
            where: {
                code: {
                    in: profile?.profile
                }
            }
        }
    );

    return res;
}
