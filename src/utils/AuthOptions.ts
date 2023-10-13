import {NextAuthOptions, Session} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {fetchProfile, getProfile} from "@/utils/Profile";
import {PrismaClient} from "@prisma/client";
import {ModuleChoice} from "@/app/(layoutNavbar)/edt/types";
import {getDbUser} from "@/utils/User";

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

            await getDbUser(session);

            const profile = await fetchProfile(session?.user?.email);
            session.user.profile = {
                modules: profile.map(u => ({
                    label: u.full_name.replaceAll(';', ' - '),
                    code: u.code
                } as ModuleChoice)) as ModuleChoice[]
            };

            return session;
        }
    }
}

export default authOptions;