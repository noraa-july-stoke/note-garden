'use strict';

const { User, ImageNotebook } = require('../models');

let options = {};
options.schema = process.env.SCHEMA; // define your schema in options object
options.tableName = 'ImageNotes';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll({ include: ImageNotebook });
    const notes = [];
    for (const user of users) {
      const notebooks = user.ImageNotebooks;
      for (const notebook of notebooks) {
        notes.push({
          authorId: user.id,
          notebookId: notebook.id,
          name: `Image Note for ${notebook.name}`,
          url: "https://storage.googleapis.com/note_garden_bucket/banana-milk.jpeg",
        });
      }
    }
    return queryInterface.bulkInsert(options, notes, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(options, null, {});
  }
};
