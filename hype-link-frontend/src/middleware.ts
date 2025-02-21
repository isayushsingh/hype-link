import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const useFirebase = process.env.NEXT_PUBLIC_USE_FIREBASE === "true";
    // Allow mock authentication in development
  if (!useFirebase && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next(); // Allow access in mock mode
  }
  const user = request.cookies.get("user");
  const protectedRoutes = ["/dashboard"];

  if (!user && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};