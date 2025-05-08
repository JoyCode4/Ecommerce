import User from '../../../../models/User';
import jwt from "jsonwebtoken";
import dbConnect from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req:any) {
    await dbConnect();
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWTSECRETKEY) as any;
    const user = await User.findById(decoded.id).select('-password');
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Unauthorized'+err }), { status: 401 });
  }
}