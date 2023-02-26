'use strict';

const { User, Notebook } = require('../models');

let options = {};
options.schema = process.env.SCHEMA; // define your schema in options object
options.tableName = 'TextNotes';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll({ include: Notebook });
    const notes = [];
    for (const user of users) {
      const notebooks = user.Notebooks;
      for (const notebook of notebooks) {
        for (let i = 0; i < 3; i++) {
          notes.push({
            authorId: user.id,
            notebookId: notebook.id,
            name: `Text Note ${i + 1}`,
            note: "<p>this is demo note by a demo user.</p>"
          });
        }
      }
    }
    return queryInterface.bulkInsert(options, notes, {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(options, null, {});
  }
};
