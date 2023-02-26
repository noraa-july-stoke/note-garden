'use strict';
const { User, Post } = require('../models');

let options = {};
options.schema = process.env.SCHEMA; // define your schema in options object
options.tableName = 'Reactions';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get all users and posts
    const users = await User.findAll();
    const posts = await Post.findAll();

    // Create an array of authors from the users
    const authors = users.map(user => user);

    // Create a set to keep track of unique post-user combinations
    const reactionSet = new Set();

    // Loop through all possible post-user combinations
    for (const user of users) {
      for (const post of posts) {
        // Generate a random author
        const author = authors[Math.floor(Math.random() * authors.length)];

        // Check if the post-user combination already exists in the set
        const reactionKey = `${post.id}-${user.id}`;
        if (reactionSet.has(reactionKey)) {
          // Combination already exists, skip it
          continue;
        }

        // Add the post-user combination to the set
        reactionSet.add(reactionKey);

        // Generate a random reaction type
        const reactionType = Math.random() < 0.5 ? 'like' : 'dislike';

        // Create a new reaction with the generated data
        const reaction = {
          userId: user.id,
          authorId: author.id,
          postId: post.id,
          reactionType: reactionType
        };

        // Insert the new reaction into the database
        await queryInterface.bulkInsert(options, [reaction]);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all reactions
    await queryInterface.bulkDelete(options, null, {});
  }
};
