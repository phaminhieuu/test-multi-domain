import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/([^/.]*)"],
};

export default function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || 'app.test-multi-domain.vercel.app'
  const currentHost =
    process.env.NODE_ENV === "production"
      ? hostname.replace(`.test-multi-domain.vercel.app`, "")
      : hostname.replace(".localhost:3000", "");

  if (currentHost === "app") {
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}
