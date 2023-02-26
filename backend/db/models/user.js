const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, defaultNotebookId } = this; // context will be the User instance
      return { id, username, email, defaultNotebookId };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    async createDefaultNotebook() {
      const Notebook = sequelize.models.Notebook;
      const notebook = await Notebook.create({ name: 'Default Notebook', authorId: this.id });
      await this.update({ defaultNotebookId: notebook.id });
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });

      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      User.hasMany(models.Notebook, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true
      });

      User.hasMany(models.ImageNotebook, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true
      });

      User.hasMany(models.TextNote, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true
      });

      User.hasMany(models.ImageNote, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true
      })
    }};

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
      }}}},

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true
      }},
      defaultNotebookId:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
      }}},

    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
      }}});

  return User;
};
