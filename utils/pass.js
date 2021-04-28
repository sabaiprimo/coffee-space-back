'use strict';
import passport from 'passport';
import passportLocal from 'passport-local';
const Strategy = passportLocal.Strategy;
import User from '../models/user.js';
import passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import bcrypt from 'bcrypt';

// local strategy for email password login
passport.use(
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        console.log('Local strategy', user); // result is binary row
        if (user === undefined) {
          return done(new Error('Invalid'), false, {
            message: 'Incorrect email.',
          });
        }
        if (!(await bcrypt.compare(password, user.password))) {
          return done(new Error('Invalid'), false, {
            message: 'Wrong cretendials.',
          });
        }
        return done(null, user.toJSON(), { message: 'Logged In Successfully' }); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }
  )
);

// TODO: JWT strategy for handling bearer token
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload._id);
        // console.log("JWT strategy", user);
        if (user == null) {
          return done(null, false, { message: 'User not found.' });
        }

        return done(null, user, { message: 'Logged In Successfully' });
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
