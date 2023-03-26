"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    static associate(models) {
      Collection.hasMany(models.Audio, {
        foreignKey: "collectionId",
        onDelete: "CASCADE",
        hooks: true,
      });

      Collection.hasMany(models.AudioAlbum, {
        foreignKey: "collectionId",
        onDelete: "CASCADE",
        hooks: true,
      });

      // Collection.hasMany(models.CollectionContent, {
      //   foreignKey: "collectionId",
      //   onDelete: "CASCADE",
      //   hooks: true,
      // });

      Collection.hasMany(models.Link, {
        foreignKey: "collectionId",
        onDelete: "CASCADE",
        hooks: true,
      });

      Collection.hasMany(models.Notebook, {
        foreignKey: "collectionId",
        onDelete: "CASCADE",
        hooks: true,
      });

      Collection.hasMany(models.Photo, {
        foreignKey: "collectionId",
        onDelete: "CASCADE",
        hooks: true,
      });

      Collection.hasMany(models.PhotoAlbum, {
        foreignKey: "collectionId",
        onDelete: "CASCADE",
        hooks: true,
      });

      Collection.hasMany(models.Post, {
        foreignKey: "collectionId",
        onDelete: "CASCADE",
        hooks: true,
      });

      Collection.hasMany(models.PostContent, {
        foreignKey: "collectionId",
        onDelete: "CASCADE",
        hooks: true,
      });

      Collection.belongsTo(models.UserData, {
        foreignKey: "authorId",
      });
    }
  }
  Collection.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Collection",
    }
  );
  return Collection;
};
