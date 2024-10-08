import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token");
  const pathname = request.nextUrl.pathname;

  if (pathname.includes("/auth") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if (pathname.includes("/post/create") && !token) {
  //   return NextResponse.redirect(new URL(getUrl("/auth")));
  // }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
