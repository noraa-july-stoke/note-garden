"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PostContent.belongsTo(models.Post, {
        foreignKey: "postId",
      });
      PostContent.belongsTo(models.UserData, {
        foreignKey: "authorId",
      });
      PostContent.belongsTo(models.Collection, {
        foreignKey: "collectionId",
      });
    }
  }
  PostContent.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "UserData",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Post",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      collectionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true,
        references: {
          model: "Collection",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      contentType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isIn: [["LINK", "IMAGE", "COLLECTION", "TEXT", "AUDIO", "VIDEO"]],
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PostContent",
    }
  );
  return PostContent;
};
