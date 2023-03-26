"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "UserData";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      options,
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        avatarUrl: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        bgColor: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        bgImgUrl: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        defaultCollection: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        defaultAlbum: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        palsOnly: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(options, options);
  },
};
