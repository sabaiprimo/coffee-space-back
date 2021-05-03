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
    addComment: (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }
      const newComment = new Comment(args);
      return newComment.save();
    },
    // Edit Comment: find Comment by id and update
    modifyComment: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }
      return await Comment.findByIdAndUpdate(
        args.id,
        {
          ...args,
        },
        { new: true }
      );
    },
    deleteComment: async (parent, { commentID }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError('Unauthorized');
        }
        return await Comment.findByIdAndDelete(commentID);
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  /* Mutation comment
    Add comment: create new comment
    Edit comment: find comment by id and update

   */
};
