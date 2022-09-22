import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next|fonts|images|icons|unity|[\\w-]+\\.\\w+).*)"],
};

export default function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host");
  const currentHost =
    process.env.NODE_ENV === "production"
      ? hostname?.replace(`.test-multi-domain.vercel.app`, "")
      : hostname?.replace(".localhost:3000", "");

  if (currentHost === "app") {
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}
