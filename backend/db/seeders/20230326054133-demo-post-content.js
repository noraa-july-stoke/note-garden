"use strict";
let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "PostContents";
const { UserData, Post } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const posts = await Post.findAll();
    let n = 0;
    const postData = [];

    posts.forEach(async (post) => {
      postData.push({
        authorId: post.authorId,
        postId: post.id,
        contentType: n % 2 === 1 ? "LINK" : "IMAGE",
        content:
          n % 2 === 1
            ? "www.nasa.gov"
            : "https://storage.googleapis.com/note_garden_bucket/banana-milk.jpeg",
      });
    });

    await queryInterface.bulkInsert(options, postData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {});
  },
};
