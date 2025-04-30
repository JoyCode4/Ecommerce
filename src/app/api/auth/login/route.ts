import { NextRequest, NextResponse } from "next/server";
import passport from "@/lib/passport";
import dbConnect from "@/lib/mongodb"; // Your MongoDB connection
import { signJwtToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();

  return new Promise((resolve) => {
    passport.authenticate('local', { session: false }, async (err:any, user:any, info:any) => {
      console.log(err,user,info);
      if (err || !user) {
        return resolve(NextResponse.json({ error: info?.message || 'Login failed' }, { status: 401 }));
      }

      const token = signJwtToken({ id: user.id, role: user.role });

      const res = NextResponse.json({ message: "Login successful" });
      res.cookies.set('token', token, {
        httpOnly: true,
        path: "/",
      });

      return resolve(res);
    })(req as any);  // because passport expects Express req
  });
}
