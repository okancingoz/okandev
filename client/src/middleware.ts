import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Login sayfası herkesin erişimine açık
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // Admin sayfasına token yoksa erişim engellenir
  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Token varsa login sayfasına gitmek isterse admin sayfasına yönlendir
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Diğer tüm durumlarda erişime izin ver
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*"],
};
