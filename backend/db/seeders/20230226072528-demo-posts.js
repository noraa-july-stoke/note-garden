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

      console.log(notes.textNotes[0].id)

        const post1 = await Post.build({
          authorId: user.id,
          noteId: notes.textNotes[0].id,
          textNote: true,
          caption: 'My text note'
        });

        console.log(post1)

        const post2 = await Post.build({
          authorId: user.id,
          noteId: notes.imageNotes[0].id,
          textNote: false,
          caption: 'My image note'
        });
      console.log(post2)

    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all posts
    await queryInterface.bulkDelete(options, null, {});
  }
};
