import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { compare } from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req:any,res:any) {
  await dbConnect();
  const { email, password } = await req.json();
  const user = await User.findOne({ email });

  if (!user || !(await compare(password, user.password))) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, "secret", {
    expiresIn: '1h'
  });

  const response:any =NextResponse.json({ token });
   // Set the cookie using `cookies()` from App Router
   response.cookies.set("token", token, {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  return response;
}