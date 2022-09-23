import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/([^/.]*)"],
};

export default function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") 
  console.log('middleware',hostname)
  const currentHost =
    process.env.NODE_ENV === "production"
      ? hostname.replace(`.test-multi-domain.vercel.app`, "").replace(`.localhost:3000`, "")
      : hostname.replace(".localhost:3000", "");

  console.log(currentHost)

  if (currentHost === "app") {
    url.pathname = `/app${url.pathname}`;
    console.log('ay doooo')
    return NextResponse.rewrite(url);
  }
}
