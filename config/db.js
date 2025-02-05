const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("userService", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;