const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  username: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },  
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
});

// Хук для створення дефолтної категорії після створення користувача
User.afterCreate(async (user, options) => {
  try {
    const Category = require("./category.model"); // require тут уникає циклічного імпорту

    // Перевірка, щоб не створювати дублікат дефолтної категорії
    const exists = await Category.findOne({
      where: { userId: user.id, isDefault: true }
    });

    if (!exists) {
      await Category.create({
        name: "Basic",
        isDefault: true,
        userId: user.id,
      });
    }
  } catch (err) {
    console.error("Помилка створення дефолтної категорії:", err);
    // Тут можна залогувати або обробити помилку, але користувача все одно буде створено
  }
});

module.exports = User;
