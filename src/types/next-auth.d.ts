import NextAuth, { DefaultSession } from "next-auth";
import { Profile } from "@/utils/Profile";

/**
 * See: https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      profile: Profile;
    } & DefaultSession["user"];
  }
}
