import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  callbacks: {
    authorized({ auth, request }) {
      const isTryingToAccessApp = request.nextUrl.pathname.startsWith("/app");
      const isLoggedIn = !!auth?.user;

      if (isLoggedIn) {
        if (request.nextUrl.pathname === "/") {
          return Response.redirect(new URL("/app", request.nextUrl));
        }
        return true;
      }

      if (!isLoggedIn) {
        if (!isTryingToAccessApp) {
          return true;
        }
        return false;
      }
      return false;
    },
  },
  providers: [GitHub],
} satisfies NextAuthConfig;
