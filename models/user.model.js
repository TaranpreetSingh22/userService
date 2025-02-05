const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // NOT NULL constraint
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // UNIQUE constraint
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        isIn: {
          args: [["admin", "instructor", "student"]],
          msg: "Role must be one of: admin, instructor, student",
        },
      },
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt columns
});

module.exports = User;
