'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pal extends Model {
    static associate(models) {
      Pal.belongsTo(models.User, {
        foreignKey: "palOne",
        as: "palOneUser"
      });

      Pal.belongsTo(models.User, {
        foreignKey: "palTwo",
        as: "palTwoUser"
      });
    }
  }
  Pal.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    palOne: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    palTwo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Pal',
  });
  return Pal;
};
