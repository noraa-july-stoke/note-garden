let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "Posts";
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable(
      options,
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        authorId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "UserData",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        collectionId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "Collections",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        caption: {
          type: Sequelize.STRING,
          allowNull: false,
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
  down: async (queryInterface, Sequelize) => {


    await queryInterface.dropTable(options, options);
  }
};
