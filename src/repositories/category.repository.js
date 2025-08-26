const Category = require("../models/category.model");

class CategoryRepository {
  async findAllByUser(userId) {
    return Category.findAll({ where: { userId } });
  }

  async findByIdForUser(id, userId) {
    return Category.findOne({ where: { id, userId } });
  }

  async findByNameForUser(name, userId) {
    return Category.findOne({ where: { name, userId } });
  }

  async wasNameUsed(name) {
    // Якщо видалені категорії зберігаються, цей метод знайде будь-яку категорію з таким ім'ям
    return Category.findOne({ where: { name } });
  }

  async create(data) {
    return Category.create(data);
  }
}

module.exports = new CategoryRepository();
