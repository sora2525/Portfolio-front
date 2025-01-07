import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LineProvider from "next-auth/providers/line";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID,
      clientSecret: process.env.LINE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email",
          response_type: "code",
          redirect_uri: `${process.env.AUTH_URL}/api/auth/callback/line`,
          state:crypto.randomUUID(), 
        },
      },
      checks: ["pkce"],
    }),
  ],
  secret: process.env.AUTH_SECRET, 
});
