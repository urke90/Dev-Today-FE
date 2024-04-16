import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth/next";

type HandlerType = typeof NextAuth;

declare module "next-auth" {
  interface Session {
    id: string;
    name: string;
  }
}

const handler: HandlerType = NextAuth(authOptions);

export { handler as GET, handler as POST };
