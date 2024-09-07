import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [Google],
  session: { strategy: "jwt" },
  callbacks: {
    session({ session, token }) {
      session.user.userId = token.sub;
      return session;
    },
  },
} satisfies NextAuthConfig;
