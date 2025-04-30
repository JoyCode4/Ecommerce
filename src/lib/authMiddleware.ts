import { verifyJwtToken } from "./jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware =async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = verifyJwtToken(token);

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/profile/:path*', '/admin/:path*'], // protected routes
};
