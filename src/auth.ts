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
          bot_prompt: "normal",
          prompt: "login",
          ui_locales: "ja",
        },
      },
      checks: ["pkce","state"],
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    // JWTに`sub`を保存
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.sub = profile.sub; // LINEの`sub`をJWTに含める
      }
      return token;
    },
    // セッション情報に`sub`を含める
    async session({ session, token }) {
      session.user.sub = token.sub; // セッションに`sub`を追加
      return session;
    },
  },
});
