("use strict");

let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "Comments";
const { UserData, Post } = require("../models");


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await UserData.findAll();
    for (const user of users) {
      await Post.create({
        authorId: user.id,
        caption: "My first post",
        palsOnly: false,
      });
      await Post.create({
        authorId: user.id,
        caption: "My second post",
        palsOnly: true,
      });
    }
  },
  down: async (queryInterface, Sequelize) => {
    // Remove all posts
    await queryInterface.bulkDelete(options, null, {});
  },
};
