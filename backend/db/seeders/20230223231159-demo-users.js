const bcrypt = require("bcryptjs");
const { User } = require("../models");

let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "Users";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        email: "user1@user.io",
        username: "User One",
        password: "password1",
        firstName: "Greedo",
        lastName: "Tetsu",
        avatarUrl:
          "https://www.cnet.com/a/img/resize/70c8abc9fb49534c807b7dffbee42c4c09bd95c9/hub/2015/11/30/ecd7a68d-ccd4-44a5-8768-6da9b1ace572/greedo.jpg?auto=webp&fit=crop&height=675&width=1200",
      },
      {
        email: "user2@user.io",
        username: "User Two",
        password: "password2",
        firstName: "Han",
        lastName: "Solo",
        avatarUrl:
          "https://www.cnet.com/a/img/resize/430d55caa2e1bf90cdbe21d3b69520de2d25bbc1/hub/2016/05/03/0f31fc0a-89a0-43ea-9a7e-0d9324ab7cf2/hansolo2.jpg?auto=webp&fit=crop&height=1200&width=1200",
      },
      {
        email: "user3@user.io",
        username: "User Three",
        password: "password3",
        firstName: "R2",
        lastName: "D2",
        avatarUrl:
          "https://lumiere-a.akamaihd.net/v1/images/r2-d2-main_f315b094.jpeg?region=247%2C0%2C951%2C536",
      },
      {
        email: "user4@user.io",
        username: "User Four",
        password: "password4",
        firstName: "Bossk'wassak",
        lastName: "Cradossk",
        avatarUrl: "https://thedirect.s3.amazonaws.com/media/photos/bossk.jpg",
      },
      {
        email: "user5@user.io",
        username: "User Five",
        password: "password5",
        firstName: "Nein",
        lastName: "Nunb",
        avatarUrl:
          "https://upload.wikimedia.org/wikipedia/en/9/9e/Nien_Nunb_Return_of_the_Jedi.jpeg",
      },
      {
        email: "user6@user.io",
        username: "User Six",
        password: "password6",
        firstName: "Luke",
        lastName: "Skywalker",
        avatarUrl:
          "https://dailytargum.imgix.net/images/1486e6ba-1198-4292-a4ad-4338a8767e71.jpg?auto=compress&crop=faces&fit=crop&fm=jpg&height=640&width=1200",
      },
    ];

    const createdUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hashSync(user.password, 10);
        return User.create({
          email: user.email,
          username: user.username,
          hashedPassword,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.avatarUrl
        });
      })
    );

    await Promise.all(
      createdUsers.map((user) => {
        return user
          .createDefaultNotebook()
          .then(() => user.createDefaultPhotoAlbum())
          .catch((error) => console.log(error));
      })
    );

    return;
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "User One",
            "User Two",
            "User Three",
            "User Four",
            "User Five",
            "User Six"
          ],
        },
      },
      {}
    );
  },
};
