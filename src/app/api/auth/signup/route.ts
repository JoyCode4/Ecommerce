import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs';

export async function POST(req:any) {
  await dbConnect();
  const { email, password, role } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashedPassword, role });
  return new Response(JSON.stringify({ message: 'User created',user:user }), { status: 201 });
}