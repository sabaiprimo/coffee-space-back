import User from '../models/user.js';
import { AuthenticationError } from 'apollo-server-errors';
import passport from '../utils/pass.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const saltRound = 12;

export default {
  Comment: {
    userID(parent) {
      return User.findById(parent.userID);
    },
  },
  Recipe: {
    author(parent) {
      return User.findById(parent.author);
    },
  },
  FavRecipe: {
    user(parent) {
      return User.findById(parent.user);
    },
  },
  Article: {
    author(parent) {
      return User.findById(parent.author);
    },
  },
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (parent, args, context, info) => {
      const { email } = args;
      return await User.find((user) => User.email === email).pop();
    },
    login: async (parent, args, { req, res }) => {
      // call passport login (done in class)
      try {
        return await new Promise((resolve, reject) => {
          passport.authenticate(
            'local',
            { session: false },
            (err, user, info) => {
              if (err || !user) {
                // res.send(new AuthenticationError('login failed'));
                reject({
                  error: err,
                });
                throw new AuthenticationError('login failed');
              }
              req.login(user, { session: false }, (err) => {
                if (err) {
                  throw err;
                }
                // generate a signed son web token with the contents of user object and return it in the response
                const token = jwt.sign(user, 'your_jwt_secret');
                resolve({
                  ...user,
                  token,
                });
              });
            }
          )({ body: args }, res);
        });
      } catch (err) {
        throw err;
      }
    },
    // fetch the profile of currenly athenticated user
    me: async (_, args, { user }) => {
      // Make sure user is logged in
      if (!user) {
        throw new Error('You are not authenticated!');
      }

      // user is authenticated
      return await User.findById(user.id);
    },
  },
  Mutation: {
    register: async (parent, args) => {
      try {
        const user = await User.create(args);

        // return json web token
        return jwt.sign(JSON.stringify(user), 'your_jwt_secret');
      } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new Error('User already exist!');
        }

        // Some other error
        throw new Error(err);
      }
    },
    changePassword: async (parent, args) => {
      const user = await User.findById(args._id);
      if (!(await bcrypt.compare(args.oldPassword, user.password))) {
        throw new Error('Password does not match');
      }
      // generate a salt
      const salt = await bcrypt.genSalt(saltRound);
      // hash the password using our new salt
      const hashPassword = await bcrypt.hash(args.newPassword, salt);
      // if (!context.usconst user = await User.create(args);er) {
      //   throw new AuthenticationError('authication failed');
      // }
      return await User.findByIdAndUpdate(
        args._id,
        {
          password: hashPassword,
        },
        { new: true }
      );
    },
    modifyUser: async (parent, args) => {
      // if (!context.user) {
      //   throw new AuthenticationError('authication failed');
      // }
      return await User.findByIdAndUpdate(
        args._id,
        {
          ...args,
        },
        { new: true }
      );
    },
  },
};
