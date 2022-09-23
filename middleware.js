import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/([^/.]*)"],
};

export default function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") 
  const currentHost =
    process.env.NODE_ENV === "production"
      ? hostname.replace(`.test-multi-domain.vercel.app`, "")
      : hostname.replace(".localhost:3000", "");

  console.log(currentHost)

  if (currentHost === "site") {
    url.pathname = `/site${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}
