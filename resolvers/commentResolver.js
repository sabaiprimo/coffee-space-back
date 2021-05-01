import Comment from '../models/comment.js';

export default {
  Query: {
    comments: async (parent, args) => {
      const { recipeID } = args;

      return recipeID
        ? await Comment.find({ recipeID: recipeID })
        : await Comment.find();
    },
    comment: (parent, args) => {
      return Comment.findById(args.id);
    },
  },
  Mutation: {
    // Add Comment: create new Comment
    addComment: (parent, args) => {
      console.log('Comment Resolver, addComment', args);
      const newComment = new Comment(args);
      return newComment.save();
    },
    // Edit Comment: find Comment by id and update
    modifyComment: async (parent, args) => {
      // if (!context.user) {
      //   throw new AuthenticationError('authication failed');
      // }
      return await Comment.findByIdAndUpdate(
        args.id,
        {
          ...args,
        },
        { new: true }
      );
    },
  },
  /* Mutation comment
    Add comment: create new comment
    Edit comment: find comment by id and update

   */
};
