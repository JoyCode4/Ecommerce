import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcryptjs';
import User from '../models/User'; // Your mongoose model

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email:any, password:any, done:any) => {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'User not found' });

      const isMatch = await compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Invalid credentials' });

      return done(null, user);
    }
  )
);