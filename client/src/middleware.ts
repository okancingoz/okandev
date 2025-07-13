import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Token varsa login sayfasına gitmeye çalışıyorsa → /admin'e yönlendir
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // 2. Token yoksa ve /admin'e gitmeye çalışıyorsa → ana sayfaya yönlendir
  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. /login herkese açık (bu satır en sonda olmalı)
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*"],
};
