"use strict";
const { User, TextNote } = require("../models");

let options = {};
options.schema = process.env.SCHEMA; // define your schema in options object
options.tableName = "Collaborations";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const collaborations = [];

    for (const user of users) {
      const notes = await TextNote.findAll();

      for (const note of notes) {
        const randomUser = users[Math.floor(Math.random() * users.length)];

        if (randomUser.id !== user.id) {
          collaborations.push({
            authorId: user.id,
            collaboratorId: randomUser.id,
            textNote: true,
            noteId: note.id,
          });
        }
      }
    }

    await queryInterface.bulkInsert(options, collaborations);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all collaborations
    await queryInterface.bulkDelete(options, null, {});
  },
};
