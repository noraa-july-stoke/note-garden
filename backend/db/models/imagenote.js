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
  class ImageNote extends Model {
    static async deleteImageNoteById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id,
        },
      });
      return rowsDeleted;
    }
    static associate(models) {
      ImageNote.belongsTo(models.User, {
        foreignKey: "authorId",
      });

      ImageNote.belongsTo(models.ImageNotebook, {
        foreignKey: "notebookId",
      });
    }
  }

  ImageNote.init(
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
      notebookId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true,
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
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
      modelName: "ImageNote",
    }
  );
  return ImageNote;
};
