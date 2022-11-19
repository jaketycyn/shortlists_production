import NextAuth, {
  type DefaultSession,
  type DefaultUser,
  JWT,
  User,
} from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
  }
}
