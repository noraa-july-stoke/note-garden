'use strict';

const { UserData, PhotoAlbum } = require('../models');

let options = {};
options.schema = process.env.SCHEMA; // define your schema in options object
options.tableName = 'Photos';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await UserData.findAll({ include: PhotoAlbum });
    const notes = [];
    for (const user of users) {
      const albums = user.PhotoAlbums;
      for (const album of albums) {
        notes.push({
          authorId: user.id,
          albumId: album.id,
          caption: `Image Note for ${album.name}`,
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
