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

      PhotoAlbum.belongsTo(models.User, {
        foreignKey: "authorId",
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
      },
      name: {
        type: DataTypes.STRING(60),
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
