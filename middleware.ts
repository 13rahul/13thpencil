import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  const secret = process.env.AUTH_SECRET;

  if (!token || !secret) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.next();
  } catch {
    const login = new URL("/login", request.url);
    return NextResponse.redirect(login);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
