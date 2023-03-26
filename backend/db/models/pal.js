//========================================================
//      ██████╗  █████╗ ██╗
//      ██╔══██╗██╔══██╗██║
//      ██████╔╝███████║██║
//      ██╔═══╝ ██╔══██║██║
//      ██║     ██║  ██║███████╗
//  ███╗╚═╝███╗ ██████╗╝██████╗╝███████╗██╗
//  ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
//  ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
//  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
//  ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
//  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
//=======================================================

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pal extends Model {
    static async deletePalById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id,
        },
      });
      return rowsDeleted;
    }

    static associate(models) {
      Pal.belongsTo(models.UserData, {
        foreignKey: "palOne",
      });

      Pal.belongsTo(models.UserData, {
        foreignKey: "palTwo",
      });
    }
  }
  Pal.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      palOne: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "UserData",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      palTwo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "UserData",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      modelName: "Pal",
      indexes: [
        {
          unique: true,
          fields: ["palOne", "palTwo"],
        },
      ],
    }
  );
  return Pal;
};
