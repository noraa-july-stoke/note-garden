//=================================================================
//   ██████╗ ██████╗ ██╗     ██╗      █████╗ ██████╗
//  ██╔════╝██╔═══██╗██║     ██║     ██╔══██╗██╔══██╗
//  ██║     ██║   ██║██║     ██║     ███████║██████╔╝█████╗
//  ██║     ██║   ██║██║     ██║     ██╔══██║██╔══██╗╚════╝
//  ╚██████╗╚██████╔╝███████╗███████╗██║  ██║██████╔╝
//   ██████╗ ██████╗ ╚█████╗╝████████╗██╗ ██████╗═███╗   ██╗
//  ██╔═══██╗██╔══██╗██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
//  ██║   ██║██████╔╝███████║   ██║   ██║██║   ██║██╔██╗ ██║
//  ██║   ██║██╔══██╗██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
//  ╚██████╔╝██║  ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
//  ███╗═══███╗╝██████╗╝██████╗ ███████╗██╗═════╝ ╚═╝  ╚═══╝
//  ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
//  ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
//  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
//  ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
//  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
//==================================================================

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Collaboration extends Model {
    static async deleteCollaborationById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id,
        },
      });
      return rowsDeleted;
    }

    static associate(models) {
      Collaboration.belongsTo(models.UserData, {
        foreignKey: "authorId",
      });

      Collaboration.belongsTo(models.UserData, {
        foreignKey: "collaboratorId",
      });

      // the scope here determine which association to choose based on whether the collaboration is via a textnote or not
      Collaboration.belongsTo(models.TextNote, {
        foreignKey: "noteId",
        constraints: false,
        scope: {
          textNote: true,
        },
      });

      // the scope here determine which association to choose
      Collaboration.belongsTo(models.Photo, {
        foreignKey: "noteId",
        constraints: false,
        scope: {
          textNote: false,
        },
      });
    }
  }

  Collaboration.init(
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
      collaboratorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "UserData",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      noteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "TextNotes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      textNote: {
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
      modelName: "Collaboration",
    }
  );
  return Collaboration;
};
