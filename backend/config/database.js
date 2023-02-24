// backend/config/database.js
const config = require('./index');

module.exports = {
  development: {
    dialect: "postgres",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    schema: process.env.SCHEMA,
    define: {
      schema: process.env.SCHEMA
    }
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }
};
