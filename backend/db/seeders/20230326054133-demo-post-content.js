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

    const users = await UserData.findAll({
      where: {
        email: {
          [Sequelize.Op.in]: [
            "greedo@jabbas-palace.com",
            "han@rebel-alliance.com",
            "R2@rebel-alliance.com",
            "bossk@jabbas-palace.com",
            "nien@rebel-alliance.com",
            "luke@rebel-alliance.com",
            "vader@galactic-empire.gov",
          ],
        },
      },
    });

    const posts = await Post.findAll();

    let n = 0;
    const postData = [];
    const links = [
      "www.google.com",
      "www.nasa.gov",
      "https://www.youtube.com/@pbsspacetime",
      "https://www.youtube.com/watch?v=tJevBNQsKtU",
      "https://www.instagram.com/audioopera/",
    ];
    const images = [
      "https://storage.googleapis.com/note_garden_bucket/orangina.jpg",
      "https://storage.googleapis.com/note_garden_bucket/banana-milk.jpeg",
      "https://storage.googleapis.com/note_garden_bucket/viet-coffee.jpg",
    ];

    posts.forEach(async (post) => {
      const user = users.find((user) => user.id === post.authorId);

      if (!user) {
        return;
      }

      let contentType = n % 2 === 1 ? "LINK" : "IMAGE";
      let content =
        contentType === "LINK"
          ? links[Math.floor(Math.random() * links.length)]
          : images[Math.floor(Math.random() * images.length)];

      postData.push({
        authorId: post.authorId,
        postId: post.id,
        contentType: contentType,
        content: content,
      });

      content =
        contentType === "LINK"
          ? links[Math.floor(Math.random() * links.length)]
          : images[Math.floor(Math.random() * images.length)];

      postData.push({
        authorId: post.authorId,
        postId: post.id,
        contentType: contentType,
        content: content,
      });

      if (user.email === "greedo@jabbas-palace.com") {
        postData.push({
          authorId: post.authorId,
          postId: post.id,
          contentType: "TEXT",
          content: `<p><strong>HELLO GREEDO</strong></p>`,
        });
      } else if (user.email === "han@rebel-alliance.com") {
        postData.push({
          authorId: post.authorId,
          postId: post.id,
          contentType: "TEXT",
          content: `<p><strong>HELLO HAN</strong></p>`,
        });
      } else if (user.email === "R2@rebel-alliance.com") {
        postData.push({
          authorId: post.authorId,
          postId: post.id,
          contentType: "TEXT",
          content: `<p><strong>BEEP BOOP</strong></p>`,
        });
      } else if (user.email === "bossk@jabbas-palace.com") {
        postData.push({
          authorId: post.authorId,
          postId: post.id,
          contentType: "TEXT",
          content: `<p><strong>HELLO BOSSK</strong></p>`,
        });
      } else if (user.email === "nien@rebel-alliance.com") {
        postData.push({
          authorId: post.authorId,
          postId: post.id,
          contentType: "TEXT",
          content: `<p><strong>HELLO NIEN</strong></p>`,
        });
      } else if (user.email === "luke@rebel-alliance.com") {
        postData.push({
          authorId: post.authorId,
          postId: post.id,
          contentType: "TEXT",
          content: `<p><strong>I can't believe my dad is an evil cyborg dictator 🫤  He's basically the emperor's puppet. I would never let some old wise dude come around telling me what to do like that. Maybe I should go ask yoda what I should do about this... Gosh darn I sure do feel emo recently.</strong></p>`,
        });
      } else if (user.email === "vader@galactic-empire.gov") {
        postData.push({
          authorId: post.authorId,
          postId: post.id,
          contentType: "TEXT",
          content: `<p><strong>I love my kids!!! </strong></p>`,
        });
      }
      n++;
    });

    await queryInterface.bulkInsert(options, postData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {});
  },
};
