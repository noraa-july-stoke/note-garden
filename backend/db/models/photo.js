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
      Photo.belongsTo(models.User, {
        foreignKey: "authorId",
      });

      Photo.belongsTo(models.PhotoAlbum, {
        foreignKey: "albumId",
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
      },
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true,
      },
      caption: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING(255),
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
