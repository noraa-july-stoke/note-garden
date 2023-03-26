"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AudioAlbum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AudioAlbum.hasMany(models.Audio, {
        foreignKey: "albumId",
        hooks: true,
      });

      AudioAlbum.belongsTo(models.UserData, {
        foreignKey: "authorId",
      });
      AudioAlbum.belongsTo(models.Collection, {
        foreignKey: "collectionId",
      });
    }
  }
  AudioAlbum.init(
    {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artist: {
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
      modelName: "AudioAlbum",
    }
  );
  return AudioAlbum;
};
