let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "Photos";

("use strict");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
        },
        albumId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "PhotoAlbums",
            key: "id",
          },
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
        isPublic: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        caption: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false,
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
