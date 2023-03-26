//==============================================================================
//          ██╗███╗   ███╗ █████╗  ██████╗ ███████╗
//          ██║████╗ ████║██╔══██╗██╔════╝ ██╔════╝
//          ██║██╔████╔██║███████║██║  ███╗█████╗
//          ██║██║╚██╔╝██║██╔══██║██║   ██║██╔══╝
//          ██║██║ ╚═╝ ██║██║  ██║╚██████╔╝███████╗
//  ███╗   ██╗╝██████╗ ████████╗███████╗██████╗══██████╗  ██████╗ ██╗  ██╗
//  ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔══██╗██╔═══██╗██╔═══██╗██║ ██╔╝
//  ██╔██╗ ██║██║   ██║   ██║   █████╗  ██████╔╝██║   ██║██║   ██║█████╔╝
//  ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ██╔══██╗██║   ██║██║   ██║██╔═██╗
//  ██║ ╚████║╚██████╔╝   ██║   ███████╗██████╔╝╚██████╔╝╚██████╔╝██║  ██╗
//  ╚═╝  ╚═══╝ ╚════███╗  ╚███╗ ██████╗╝██████╗ ███████╗██╗═════╝ ╚═╝  ╚═╝
//                  ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
//                  ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
//                  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
//                  ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
//                  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
//==============================================================================
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PhotoAlbum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async deleteAlbumById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id,
        },
      });
      return rowsDeleted;
    }
    static associate(models) {
      PhotoAlbum.hasMany(models.Photo, {
        foreignKey: "albumId",
        hooks: true,
      });

      PhotoAlbum.belongsTo(models.UserData, {
        foreignKey: "authorId",
      });

      PhotoAlbum.belongsTo(models.Collection, {
        foreignKey: "collectionId",
      });
    }
  }

  PhotoAlbum.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
        type: DataTypes.STRING(60),
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
      modelName: "PhotoAlbum",
    }
  );
  return PhotoAlbum;
};
