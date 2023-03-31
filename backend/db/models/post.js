//================================================
//  ██████╗  ██████╗ ███████╗████████╗
//  ██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝
//  ██████╔╝██║   ██║███████╗   ██║
//  ██╔═══╝ ██║   ██║╚════██║   ██║
//  ██║     ╚██████╔╝███████║   ██║
//  ███╗   ███╗═██████╗═██████╗ ███████╗██╗
//  ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
//  ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
//  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
//  ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
//  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
//================================================
"use strict";
const { Model } = require("sequelize");
const { postFixup } = require("../db-helpers/post-helpers");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    //=======================================================
    //Organizes a chronolologcal post feed by friend's posts;
    //=======================================================
    static async findAllByAuthors(idObj) {
      // Extracts authorIds from idObj
      const authorIds = Object.values(idObj);
      // Object to store posts
      const objectPosts = {};
      // Eager loading made this way faster.
      // Finds all posts made by authorIds in descending order of creation time
      const posts = await this.findAll({
        where: {
          authorId: authorIds,
        },
        include: [
          {
            model: sequelize.models.UserData,
          },
          {
            model: sequelize.models.PostContent,
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      // Loops through each post and adds it to objectPosts
      for (let post of posts) {
        // Extracts content and author information from post
        // Adds content and author information to post object
        post = post.toJSON();
        objectPosts[post.id] = post;
      }

      // Returns objectPosts dictionary
      return objectPosts;
    }

    //=======================================================
    //Deletes a post by it's id.
    //=======================================================

    static async deletePostById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id,
        },
      });
      return rowsDeleted;
    }

    static associate(models) {
      Post.belongsTo(models.UserData, {
        foreignKey: "authorId",
      });

      Post.hasMany(models.PostContent, {
        foreignKey: "postId",
      });

      Post.belongsTo(models.Collection, {
        foreignKey: "collectionId",
      });
    }
  }
  Post.init(
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
      collectionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true,
        references: {
          model: "Collection",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      caption: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      palsOnly: {
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
      modelName: "Post",
    }
  );
  return Post;
};
