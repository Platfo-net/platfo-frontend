import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    // Todo : add session types
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // Todo : add JWT types
  }
}
