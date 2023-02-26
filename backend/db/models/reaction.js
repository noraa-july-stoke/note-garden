'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    static associate(models) {
      Reaction.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Reaction.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
      Reaction.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
    }
  }
  Reaction.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reactionType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        isIn: [['like', 'dislike']],
      }
    }
  }, {
    sequelize,
    modelName: 'Reaction',
  });
  return Reaction;
};