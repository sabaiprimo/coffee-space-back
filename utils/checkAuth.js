import passport from './pass.js';

export const checkAuth = (req, res) => {
  try {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        {
          session: false,
        },
        (err, user, info) => {
          if (!user) {
            resolve(false);
          }
          resolve(user);
        }
      )(req, res);
    });
  } catch (err) {
    throw err;
  }
};

// export default checkAuth;
