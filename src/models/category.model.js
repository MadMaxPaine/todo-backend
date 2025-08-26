const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model"); // імпорт, щоб додати зв'язок

const Category = sequelize.define("Category", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  isDefault: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
    onDelete: "CASCADE"
  }
});

module.exports = Category;
