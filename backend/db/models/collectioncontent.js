"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CollectionContent extends Model {

    static associate(models) {
      CollectionContent.belongsTo(models.Collection, {
        foreignKey: "collectionId",
      });
    }
  }
  CollectionContent.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      collectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CollectionContent",
    }
  );
  return CollectionContent;
};
