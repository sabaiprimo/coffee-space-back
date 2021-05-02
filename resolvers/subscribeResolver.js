import Subscribe from '../models/subscribe.js';

export default {
  Query: {
    subscribes: () => {
      return Subscribe.find();
    },
  },
  Mutation: {
    addSubscribe: async (parent, args) => {
      const { email } = args;
      const userSub = await Subscribe.find({ email: email });
      if (userSub.length > 0) {
        return 'User already subscribe';
      }
      const newSub = new Subscribe(args);
      await newSub.save();
      return 'Thanks for your subscribe';
    },
    modifySubscribe: async (parent, args) => {
      // if (!context.user) {
      //   throw new AuthenticationError('authication failed');
      // }
      return await Subscribe.findByIdAndUpdate(
        args._id,
        {
          ...args,
        },
        { new: true }
      );
    },
  },
};
