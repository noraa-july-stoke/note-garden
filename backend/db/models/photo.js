//===============================================================================
//  ██╗███╗   ███╗ █████╗  ██████╗ ███████╗███╗   ██╗ ██████╗ ████████╗███████╗
//  ██║████╗ ████║██╔══██╗██╔════╝ ██╔════╝████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝
//  ██║██╔████╔██║███████║██║  ███╗█████╗  ██╔██╗ ██║██║   ██║   ██║   █████╗
//  ██║██║╚██╔╝██║██╔══██║██║   ██║██╔══╝  ██║╚██╗██║██║   ██║   ██║   ██╔══╝
//  ██║██║ ╚═╝ ██║██║  ██║╚██████╔╝███████╗██║ ╚████║╚██████╔╝   ██║   ███████╗
//  ╚═╝╚═╝     ╚═╝╚═███╗═╝ ███╗═██████╗═██████╗ ███████╗██╗═╝    ╚═╝   ╚══════╝
//                  ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
//                  ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
//                  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
//                  ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
//                  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
//===============================================================================
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static async deletePhotoById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id,
        },
      });
      return rowsDeleted;
    }
    static associate(models) {
      Photo.belongsTo(models.UserData, {
        foreignKey: "authorId",
      });

      Photo.belongsTo(models.PhotoAlbum, {
        foreignKey: "albumId",
      });

      Photo.belongsTo(models.Collection, {
        foreignKey: "collectionId",
      });
    }
  }

  Photo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "UserData",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true,
        references: {
          model: "PhotoAlbums",
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
      caption: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Photo",
    }
  );
  return Photo;
};
