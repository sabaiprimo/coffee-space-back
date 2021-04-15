import User from '../models/user.js';

export default {
  Query: {
    users: () => {
      return User.find();
    },
  },
};
