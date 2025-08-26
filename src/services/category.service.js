const CategoryRepository = require("../repositories/category.repository");
const Task = require("../models/task.model");
const ApiError = require("../utils/errors.API");

class CategoryService {
 async getAll(userId) {
  return CategoryRepository.findAllByUser(userId);
 }

 async getOne(userId, id) {
  return CategoryRepository.findByIdForUser(id, userId);
 }

 async create({ name, isDefault, userId }) {
  // Перевірка: чи вже існує категорія з таким ім'ям для цього користувача
  const exists = await CategoryRepository.findByNameForUser(name, userId);
  if (exists) {
   throw ApiError.badRequest("Category name already exists for this user");
  }

  return CategoryRepository.create({ name, isDefault, userId });
 }

 async update(userId, id, { name, isDefault }) {
  // Перевірка: чи існує категорія для оновлення
  const category = await CategoryRepository.findByIdForUser(id, userId);
  if (!category) {
   return null;
  }
  if (category.isDefault) {
   throw ApiError.forbidden("Default category cannot be modified or deleted");
  }
  // Перевірка унікальності імені для користувача
  if (name && name !== category.name) {
   const exists = await CategoryRepository.findByNameForUser(name, userId);
   if (exists) {
    throw ApiError.badRequest("Category name already exists for this user");
   }

  }

  category.name = name ?? category.name;
  category.isDefault = isDefault ?? category.isDefault;
  await category.save();
  return category;
 }

 async delete(userId, id) {
  const category = await CategoryRepository.findByIdForUser(id, userId);
  if (!category) {
   return null;
  }
  if (category.isDefault) {
   throw ApiError.forbidden("Default category cannot be modified or deleted");
  }
  // Знайти базову категорію для користувача
  const basicCategory = await CategoryRepository.findByNameForUser("Basic", userId);
  if (!basicCategory) {
   throw ApiError.internal("Basic category not found for user");
  }

  // Оновити всі задачі, які мають цю категорію
  await Task.update(
   { categoryId: basicCategory.id },
   { where: { categoryId: category.id, userId } }
  );

  // Видалити категорію
  await category.destroy();
  return true;
 }
}

module.exports = new CategoryService();