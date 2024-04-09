import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { error } from "console";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: "saksham",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. "Sign in with...")
    //   name: "Credentials",
    //   // `credentials` is used to generate a form on the sign in page.
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     // Add logic here to look up the user from the credentials supplied
    //     const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user;
    //     } else {
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       return null;

    //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async signIn({ profile, user }) {
      try {
        if (!profile?.email) {
          throw new Error("NO profile");
        }
        // console.log("PROFILE = ", profile);

        const response = await fetch("http://localhost:3001/api/v1/auth/signIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: profile?.email, name: profile?.name }),
        });

        const res = await response.json();
        user.accessToken = res?.token;
        console.log("RESpo = ", res);
        return true;
      } catch (error) {
        return false;
      }
    },
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      // if (account) {
      //   // console.log("Tok = ", token);
      //   // console.log("ACC = ", account);
      //   token.accessToken = account.access_token;
      // }
      if (user) {
        token = { accessToken: user.accessToken };
      }

      return token;
      // localStorage.setItem("Token", account?.access_token as string);
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
