'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static async deleteCommentById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id
        }
      });
      return rowsDeleted;
    }

    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'authorId' });
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      Comment.belongsTo(models.Post, { foreignKey: 'postId' });
      Comment.belongsTo(models.Comment, { foreignKey: 'parentCommentId' });
      Comment.hasMany(models.Comment, { foreignKey: 'parentCommentId' });
    }
  }

  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Posts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      parentCommentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Comments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: 'Comment'
    }
  );

  return Comment;
};
