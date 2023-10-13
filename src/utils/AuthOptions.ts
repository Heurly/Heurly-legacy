import {NextAuthOptions, Session} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {getProfile} from "@/utils/Profile";
import {PrismaClient} from "@prisma/client";
import {ModuleChoice} from "@/app/(layoutNavbar)/edt/types";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({session}: {session: Session})  {
            if (session?.user?.email == undefined) return session;

            const profile = await prisma.user.findFirst({
                where: {
                    email: session?.user?.email
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
            session.user.profile = {
                modules: res.map(u => ({
                    label: u.full_name.replaceAll(';', ' - '),
                    code: u.code
                } as ModuleChoice)) as ModuleChoice[]
            };

            return session;
        }
    }
}

export default authOptions;