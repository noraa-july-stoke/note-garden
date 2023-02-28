'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pal extends Model {

    static async deletePalById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id
        }
      });
      return rowsDeleted;
    }

    static associate(models) {
      Pal.belongsTo(models.User, {
        foreignKey: "palOne"
      });

      Pal.belongsTo(models.User, {
        foreignKey: "palTwo"
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
    indexes: [{
      unique: true,
      fields: ['palOne', 'palTwo']
    }]
  });
  return Pal;
};
