import Comment from '../models/comment.js';

export default {
  Query: {
    comments: () => {
      return Comment.find();
    },
    comment: (parent, args) => {
      return Comment.findById(args.id);
    },
  },
  /* Mutation comment
    Add comment: create new comment
    Edit comment: find comment by id and update

   */
};
