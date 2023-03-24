//===================================================
//  ██╗   ██╗███████╗███████╗██████╗
//  ██║   ██║██╔════╝██╔════╝██╔══██╗
//  ██║   ██║███████╗█████╗  ██████╔╝
//  ██║   ██║╚════██║██╔══╝  ██╔══██╗
//  ╚██████╔╝███████║███████╗██║  ██║
//  ███╗═══███╗═██████╗═██████╗╝███████╗██╗
//  ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
//  ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
//  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
//  ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
//  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
//====================================================

"use strict";
const { Model, Validator, Op } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const {
        id,
        username,
        email,
        defaultNotebookId,
        defaultPhotoAlbum,
        firstName,
        lastName,
        avatarUrl,
      } = this; // context will be the User instance
      return {
        id,
        username,
        email,
        defaultNotebookId,
        defaultPhotoAlbum,
        firstName,
        lastName,
        avatarUrl,
      };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    async getNotes() {
      const Photo = sequelize.models.Photo;
      const TextNote = sequelize.models.TextNote;
      let objectTextNotes = {};
      let objectPhotos = {};

      const photos = await Photo.findAll({
        where: { authorId: this.id },
        order: [["createdAt"]],
      });

      const textNotes = await TextNote.findAll({
        where: { authorId: this.id },
        order: [["createdAt"]],
      });

      for (let photo of photos) {
        photo = photo.toJSON();
        objectPhotos[photo.id] = photo;
      }

      for (let textNote of textNotes) {
        textNote = textNote.toJSON();
        objectTextNotes[textNote.id] = textNote;
      }

      return { photos: objectPhotos, textNotes: objectTextNotes };
    }

    // query notebook model for any notebooks and any image notebooks that belong to the user and return them as arrays inside
    // a composite object
    async getNotebooks() {
      const Notebook = sequelize.models.Notebook;
      const PhotoAlbum = sequelize.models.PhotoAlbum;
      const objectNotebooks = {};
      const objectPhotoAlbums = {};

      const notebooks = await Notebook.findAll({
        where: { authorId: this.id },
        order: [["createdAt"]],
      });

      const photoAlbums = await PhotoAlbum.findAll({
        where: { authorId: this.id },
        order: [["createdAt"]],
      });

      for (let notebook of notebooks) {
        notebook = notebook.toJSON();
        objectNotebooks[notebook.id] = notebook;
      }

      for (let photoAlbum of photoAlbums) {
        photoAlbum = photoAlbum.toJSON();
        objectPhotoAlbums[photoAlbum.id] = photoAlbum;
      }

      return {
        textNotebooks: objectNotebooks,
        photoAlbums: objectPhotoAlbums,
      };
    }

    // getpals gets any of the pal relationships of the user. the user could be found as palOne or palTwo
    async getPals() {
      const Pal = sequelize.models.Pal;
      const objectPals = {};
      const pals = await Pal.findAll({
        where: {
          [Op.or]: [{ palOne: this.id }, { palTwo: this.id }],
        },
        include: { model: User },
      });

      for (let pal of pals) {
        pal = pal.toJSON();
        pal.palOne === this.id
          ? (objectPals[pal.palTwo] = pal.palTwo)
          : (objectPals[pal.palOne] = pal.palOne);
      }
      return objectPals;
    }

    // extract the pals from the object returned by getPals;
    async getPalsByIds(idObj) {
      const User = sequelize.models.User;
      const ids = Object.values(idObj);
      const palsObject = {};
      const users = await User.findAll({
        where: {
          id: ids,
        },
      });
      for (let user of users) {
        user = user.toJSON();
        palsObject[user.id] = user;
      }
      return { pals: palsObject };
    }

    // query for and return any collaborations that the user exists in under the key collaboratorId
    async getCollaborations() {
      const Collaboration = sequelize.models.Collaboration;
      const objectCollaborations = {};
      const collaborations = await Collaboration.findAll({
        where: { collaboratorId: this.id },
        order: [["createdAt"]],
      });
      for (let collaboration of collaborations) {
        collaboration = collaboration.toJSON();
        objectCollaborations[collaboration.id] = collaboration;
      }

      return objectCollaborations;
    }

    // query for and return any posts that the user exists in under the key authorIdId
    async getPosts() {
      const Post = sequelize.models.Post;
      const objectPosts = {};

      const posts = await Post.findAll({
        where: { authorId: this.id },
        order: [["createdAt"]],
      });

      for (let post of posts) {
        post = post.toJSON();
        objectPosts[post.id] = post;
      }
      return posts;
    }
    // query for and return any comments the user has left on a post the user exists in under the key userId
    async getComments() {
      const Comment = sequelize.models.Comment;
      const objectComments = {};

      const comments = await Comment.findAll({
        where: { userId: this.id },
        order: [["createdAt"]],
      });

      for (let comment of comments) {
        comment = comment.toJSON();
        objectComments[comment.id] = comment;
      }
      return objectComments;
    }

    // query for and return any reactions the user has left on a post the user exists in under the key userId
    async getReactions() {
      const Reaction = sequelize.models.Reaction;
      const reactions = await Reaction.findAll({
        where: { userId: this.id },
        order: [["createdAt"]],
      });
      return reactions;
    }

    async createDefaultNotebook() {
      const Notebook = sequelize.models.Notebook;
      const notebook = await Notebook.create({
        name: "Default",
        authorId: this.id,
      });
      await this.update({ defaultNotebookId: notebook.id });
    }

    async createDefaultPhotoAlbum() {
      const PhotoAlbum = sequelize.models.PhotoAlbum;
      const notebook = await PhotoAlbum.create({
        name: "Default Photo Album",
        authorId: this.id,
      });
      await this.update({ defaultPhotoAlbumId: notebook.id });
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async deleteUserById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id,
        },
      });
      return rowsDeleted;
    }

    static async login({ credential, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });

      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }

    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName,
      });
      return await User.scope("currentUser").findByPk(user.id);
    }

    static associate(models) {
      User.hasMany(models.Notebook, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.PhotoAlbum, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.TextNote, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Photo, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Reaction, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Reaction, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Comment, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Comment, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Collaboration, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Collaboration, {
        foreignKey: "collaboratorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Post, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Pal, {
        foreignKey: "palOne",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Pal, {
        foreignKey: "palTwo",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.belongsToMany(models.User, {
        as: "palOne",
        foreignKey: "palOne",
        through: models.Pal,
        otherKey: "palTwo",
      });

      User.belongsToMany(models.User, {
        as: "palTwo",
        foreignKey: "palTwo",
        through: models.Pal,
        otherKey: "palOne",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      defaultNotebookId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      defaultPhotoAlbum: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      avatarUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
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
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: [
            "hashedPassword",
            "createdAt",
            "updatedAt",
            "defaultPhotoAlbum",
            "defaultNotebookId",
          ],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
