import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      accessToken: string;
    };
    expires: Date; // This is the expiry of the session, not any of the tokens within the session
  }

  interface User {
    name: string;
    email: string;
    image: string;
    accessToken: string;
  }
}
