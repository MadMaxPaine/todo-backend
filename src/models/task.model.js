const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./category.model");
const User = require("./user.model");

const Task = sequelize.define("Task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  dueDate: { type: DataTypes.DATE, allowNull: true },

  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
     validate: {
      min: 1,
      max: 10,
    },
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
    validate: {
      isIn: [["undone","done"]],
    },
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
    onDelete: "CASCADE",
  },

  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: Category, key: "id" },
    onDelete: "SET NULL",
  },
});

module.exports = Task;
