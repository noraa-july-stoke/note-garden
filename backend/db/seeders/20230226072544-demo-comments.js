'use strict';
const { User, Post, Comment } = require('../models');

let options = {};
options.schema = process.env.SCHEMA;
options.tableName = 'Comments';

//This might be optimized? Idk.
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get all users, authors, and posts
    const users = await User.findAll();
    const authors = [...users];
    const posts = await Post.findAll();

    // Create a set to keep track of unique post-author combinations
    const commentSet = new Set();

    // Create a map to keep track of the posts each user has created
    const userPostsMap = new Map();
    for (const post of posts) {
      const authorId = post.authorId;
      if (!userPostsMap.has(authorId)) {
        userPostsMap.set(authorId, new Set());
      }
      userPostsMap.get(authorId).add(post.id);
    }

    // Loop through all possible post-author combinations
    const promises = [];
    for (const user of users) {
      const userId = user.id;

      // Get the authors that the user has not created a post for
      const otherAuthors = authors.filter((author) => author.id !== userId);

      // Create a set to keep track of the authors that the user has already commented on
      const userCommentedAuthorsSet = new Set();

      // Loop through the other authors and leave a comment
      const commentPromises = otherAuthors.map(async (author) => {
        const authorId = author.id;

        // Check if the user has already commented on this author's post
        if (userCommentedAuthorsSet.has(authorId)) {
          return;
        }

        // Check if the user has already left a comment on a post by this author
        const authorPosts = await Post.findAll({ where: { authorId: authorId } });
        const authorPostIds = authorPosts.map((post) => post.id);
        const commentKey = `${userId}-${authorId}`;
        if (commentSet.has(commentKey)) {
          return;
        }

        // Add the post-author combination to the set
        commentSet.add(commentKey);

        // Add the author to the user's commented authors set
        userCommentedAuthorsSet.add(authorId);

        // Create a new comment with the generated data
        const postId = authorPostIds[Math.floor(Math.random() * authorPostIds.length)];
        const comment = {
          userId: userId,
          authorId: authorId,
          postId: postId,
          content: 'This is a comment.'
        };

        return comment;
      });

      // Check if the user has any posts and add their authors to the commented authors set
      if (userPostsMap.has(userId)) {
        for (const postId of userPostsMap.get(userId)) {
          const post = await Post.findByPk(postId);
          const authorId = post.authorId;
          userCommentedAuthorsSet.add(authorId);
        }
      }

      const newComments = await Promise.all(commentPromises).then(comments => comments.filter(comment => comment !== undefined));
      promises.push(Comment.bulkCreate(newComments, { validate: true }));
    }

    await Promise.all(promises);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all comments
    await queryInterface.bulkDelete(options, null, {});
  }
};
