'use strict';
const { User, Post, Comment } = require('../models');

// Set options for the bulk delete operation
let options = {};
options.schema = process.env.SCHEMA;
options.tableName = 'Comments';

module.exports = {
  // The up function seeds the database with comments
  up: async (queryInterface, Sequelize) => {
    // Find all users in the database
    const users = await User.findAll();

    // Find all comments in the database, including the associated post
    const comments = await Comment.findAll({ include: [Post] });

    // Create an array to hold promises of bulk create operations for the new comments
    const promises = [];

    // Loop through all users in the database
    for (const user of users) {
      const authorId = user.id;

      // Loop through all comments in the database, checking if the comment belongs to a post created by the current user
      const commentPromises = comments.map(async (comment) => {
        const postId = comment.Post.id;
        const post = await Post.findByPk(postId);
        const postAuthorId = post.authorId;

        if (postAuthorId === authorId) {
          // Create a new comment object
          const reply = {
            userId: authorId,
            authorId: postAuthorId,
            postId: postId,
            parentCommentId: comment.id,
            content: 'This is a reply.'
          };

          return reply;
        }
      });

      // Filter out undefined values and create a new array of comments to be created
      const newReplies = await Promise.all(commentPromises).then(replies => replies.filter(reply => reply !== undefined));

      // Push a bulk create operation promise to the promises array for each new comment
      promises.push(Comment.bulkCreate(newReplies, { validate: true }));
    }

    // Wait for all bulk create operations to finish
    await Promise.all(promises);
  },

  // The down function deletes all comments in the database
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(options, null, {});
  }
};
