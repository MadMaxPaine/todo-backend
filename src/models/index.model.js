const sequelize = require("../config/db");
const User = require("./user.model");
const Category = require("./category.model");
const Task = require("./task.model");
const Token = require("./token.model");

// Зв’язки
User.hasMany(Category, { foreignKey: "userId", onDelete: "CASCADE" });
Category.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Token, { foreignKey: "userId", onDelete: "CASCADE" });
Token.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId" });

Category.hasMany(Task, { foreignKey: "categoryId", onDelete: "SET NULL" });
Task.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = {
 User,
 Category,
 Task,
 Token,
};
