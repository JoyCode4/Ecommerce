import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "@/models/User";

passport.use(new LocalStrategy(
  { usernameField: "email", passwordField:"password" },
  async (email:string, password:string, done:any) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

export default passport;
