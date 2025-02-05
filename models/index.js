const sequelize = require("../config/db");
const User = require("./user.model");

const db = { sequelize, User };

module.exports = db;
