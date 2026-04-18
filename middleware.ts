// middleware.ts
import NextAuth from "next-auth";
import authConfig from "./src/auth.config";// ← edge-safe, no Prisma

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuth = nextUrl.pathname.startsWith("/api/auth");
  const isAuthPage = ["/login", "/register"].includes(nextUrl.pathname);
  const isProtected =
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/curriculum") ||
    nextUrl.pathname.startsWith("/resources");

  if (isApiAuth) return; // never block auth API

  if (isLoggedIn && isAuthPage) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  if (!isLoggedIn && isProtected) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname);
    return Response.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};