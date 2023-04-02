//===============================================================================
//   ██████╗ ██████╗ ███╗   ███╗███╗   ███╗███████╗███╗   ██╗████████╗
//  ██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔════╝████╗  ██║╚══██╔══╝
//  ██║     ██║   ██║██╔████╔██║██╔████╔██║█████╗  ██╔██╗ ██║   ██║
//  ██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║
//  ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║███████╗██║ ╚████║   ██║
//   ╚═════╝ ╚══███╗ ╚═███╗ ██████╗ ██████╗╚███████╗██╗ ╚═══╝   ╚═╝
//              ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
//              ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
//              ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
//              ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
//              ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
//===============================================================================
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static async getCommentsByPostIds(ids) {
      const comments = await this.findAll({
        where: {
          "postId": ids, // specify table alias for postId column
          "parentCommentId": null, // filter only top-level comments
        },
        include: [
          {
            model: sequelize.models.UserData,
          },
          {
            model: sequelize.models.Reaction,
          },
        ],
        order: [["createdAt", "ASC"]],
      });

      // Transform the comments into an object with the post ID as the key
      const commentsByPost = {};
      for (const comment of comments) {
        const postId = comment.postId;
        if (!commentsByPost[postId]) {
          commentsByPost[postId] = [];
        }
        commentsByPost[postId].push(comment);
      }

      return commentsByPost;
    }

    static associate(models) {
      Comment.belongsTo(models.UserData, { foreignKey: "authorId" });
      Comment.belongsTo(models.UserData, { foreignKey: "userId" });
      Comment.belongsTo(models.Post, { foreignKey: "postId" });
      Comment.belongsTo(models.Comment, {
        foreignKey: "parentCommentId",
      });
      Comment.hasMany(models.Comment, { foreignKey: "parentCommentId" });
      Comment.hasMany(models.Reaction, { foreignKey: "commentId" });
    }
  }

  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      //the user who left the comment(s)
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      // the user who owns the post the comments were left on.
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      // the user who owns the post the comments were left on.
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      parentCommentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Comments",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      content: {
        type: DataTypes.STRING,
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
      modelName: "Comment",
    }
  );

  return Comment;
};
