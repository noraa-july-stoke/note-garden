const { PhotoAlbum, User } = require('../models');

let options = {};
options.schema = process.env.SCHEMA; // define your schema in options object
options.tableName = 'PhotoAlbums';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const notebooks = [];
    for (const user of users) {
      for (let i = 0; i < 3; i++) {
        notebooks.push({
          authorId: user.id,
          name: `Image Notebook ${i + 1}`
        });
      }
    }
    return queryInterface.bulkInsert(options, notebooks, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(options, null, {});
    return;
  },
};
