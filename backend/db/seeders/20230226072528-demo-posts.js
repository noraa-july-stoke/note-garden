'use strict';
const { User, Post } = require('../models');

let options = {};
options.schema = process.env.SCHEMA; // define your schema in options object
options.tableName = 'Posts';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();

    for (const user of users) {
      const notes = await user.getNotes();

        await Post.create({
          authorId: user.id,
          noteId: Object.values(notes.textNotes)[0].id,
          textNote: true,
          caption: 'My text note'
        });

        await Post.create({
          authorId: user.id,
          noteId: Object.values(notes.imageNotes)[0].id,
          textNote: false,
          caption: 'My image note'
        });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all posts
    await queryInterface.bulkDelete(options, null, {});
  }
};
