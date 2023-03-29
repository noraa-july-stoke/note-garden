const bcrypt = require("bcryptjs");
const { User, UserData } = require("../models");

let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "UserData";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const emails = [
    //   "greedo@jabbas-palace.com",
    //   "han@rebel-alliance.com",
    //   "R2@rebel-alliance.com",
    //   "bossk@jabbas-palace.com",
    //   "nien@rebel-alliance.com",
    //   "luke@rebel-alliance.com",
    // ];

    const users = {
      "greedo@jabbas-palace.com": {
        firstName: "Greedo",
        lastName: "Tetsu",
        avatarUrl:
          "https://www.cnet.com/a/img/resize/70c8abc9fb49534c807b7dffbee42c4c09bd95c9/hub/2015/11/30/ecd7a68d-ccd4-44a5-8768-6da9b1ace572/greedo.jpg?auto=webp&fit=crop&height=675&width=1200",
      },
      "han@rebel-alliance.com": {
        firstName: "Han",
        lastName: "Solo",
        avatarUrl:
          "https://www.cnet.com/a/img/resize/430d55caa2e1bf90cdbe21d3b69520de2d25bbc1/hub/2016/05/03/0f31fc0a-89a0-43ea-9a7e-0d9324ab7cf2/hansolo2.jpg?auto=webp&fit=crop&height=1200&width=1200",
      },
      "R2@rebel-alliance.com": {
        firstName: "R2",
        lastName: "D2",
        avatarUrl:
          "https://lumiere-a.akamaihd.net/v1/images/r2-d2-main_f315b094.jpeg?region=247%2C0%2C951%2C536",
      },
      "bossk@jabbas-palace.com": {
        firstName: "Bossk'wassak",
        lastName: "Cradossk",
        avatarUrl: "https://thedirect.s3.amazonaws.com/media/photos/bossk.jpg",
      },
      "nien@rebel-alliance.com": {
        firstName: "Nein",
        lastName: "Nunb",
        avatarUrl:
          "https://upload.wikimedia.org/wikipedia/en/9/9e/Nien_Nunb_Return_of_the_Jedi.jpeg",
      },
      "luke@rebel-alliance.com": {
        firstName: "Luke",
        lastName: "Skywalker",
        avatarUrl:
          "https://dailytargum.imgix.net/images/1486e6ba-1198-4292-a4ad-4338a8767e71.jpg?auto=compress&crop=faces&fit=crop&fm=jpg&height=640&width=1200",
      },
      "vader@galactic-empire.gov": {
        firstName: "Darth",
        lastName: "Vader",
        avatarUrl:
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/darth-vader-obi-wan-kenobi-1648722348.jpg?crop=0.361xw:0.431xh;0.316xw,0.134xh&resize=640:*",
      },
    };

    const seedUsers = await User.findAll({
      attributes: { exclude: ["hashedPassword"] },
    });

    const seedData = seedUsers.map((user) => {
      return {
        id: user.id,
        email: user.email,
        username: user.username,
        ...users[user.email],
      };
    });

    return queryInterface.bulkInsert(options, seedData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await UserData.destroy({ where: {} });
    return;
  },
};

//  const users = [
//    {
//      email: "greedo@jabbas-palace.com",
//      username: "HanSoloSuxxx",
//      hashedPassword:
//        "$2b$10$LSt5uV7JhFy8uP7lY2xcguBavzGnmvyCxsmX7VsoDRG5u5d5B5Wti",
//      firstName: "Greedo",
//      lastName: "Tetsu",
//      avatarUrl:
//        "https://www.cnet.com/a/img/resize/70c8abc9fb49534c807b7dffbee42c4c09bd95c9/hub/2015/11/30/ecd7a68d-ccd4-44a5-8768-6da9b1ace572/greedo.jpg?auto=webp&fit=crop&height=675&width=1200",
//    },
//    {
//      email: "han@rebel-alliance.com",
//      username: "Nerf_Herder22",
//      hashedPassword:
//        "$2b$10$LSt5uV7JhFy8uP7lY2xcguBavzGnmvyCxsmX7VsoDRG5u5d5B5Wti",
//      firstName: "Han",
//      lastName: "Solo",
//      avatarUrl:
//        "https://www.cnet.com/a/img/resize/430d55caa2e1bf90cdbe21d3b69520de2d25bbc1/hub/2016/05/03/0f31fc0a-89a0-43ea-9a7e-0d9324ab7cf2/hansolo2.jpg?auto=webp&fit=crop&height=1200&width=1200",
//    },
//    {
//      email: "R2@rebel-alliance.com",
//      username: "TheRealR2",
//      hashedPassword:
//        "$2b$10$LSt5uV7JhFy8uP7lY2xcguBavzGnmvyCxsmX7VsoDRG5u5d5B5Wti",
//      firstName: "R2",
//      lastName: "D2",
//      avatarUrl:
//        "https://lumiere-a.akamaihd.net/v1/images/r2-d2-main_f315b094.jpeg?region=247%2C0%2C951%2C536",
//    },
//    {
//      email: "bossk@jabbas-palace.com",
//      username: "dioxis-breath",
//      hashedPassword:
//        "$2b$10$LSt5uV7JhFy8uP7lY2xcguBavzGnmvyCxsmX7VsoDRG5u5d5B5Wti",
//      firstName: "Bossk'wassak",
//      lastName: "Cradossk",
//      avatarUrl: "https://thedirect.s3.amazonaws.com/media/photos/bossk.jpg",
//    },
//    {
//      email: "nien@rebel-alliance.com",
//      username: "nien-09",
//      hashedPassword:
//        "$2b$10$LSt5uV7JhFy8uP7lY2xcguBavzGnmvyCxsmX7VsoDRG5u5d5B5Wti",
//      firstName: "Nein",
//      lastName: "Nunb",
//      avatarUrl:
//        "https://dailytargum.imgix.net/images/1486e6ba-1198-4292-a4ad-4338a8767e71.jpg?auto=compress&crop=faces&fit=crop&fm=jpg&height=640&width=1200",
//    },
//  ];
