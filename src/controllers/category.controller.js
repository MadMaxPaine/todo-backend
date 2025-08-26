const CategoryService = require("../services/category.service");
const ApiError = require("../utils/errors.API");
const CategoryDto = require("../dtos/category.dto");

class CategoryController {
 async getAll(req, res, next) {
  try {
   const userId = req.user.id;
   const categories = await CategoryService.getAll(userId);
   res.json(categories.map(cat => new CategoryDto(cat)));
  } catch (e) {
   next(e);
  }
 }

 async getOne(req, res, next) {
  try {
   const userId = req.user.id;
   const { id } = req.params;
   const category = await CategoryService.getOne(userId, id);
   if (!category) {
    return next(ApiError.notFound("Category not found"));
   }
   res.json(new CategoryDto(category));
  } catch (e) {
   next(e);
  }
 }

 async create(req, res, next) {
  try {
   const userId = req.user.id;
   const { name, isDefault } = req.body;
   if (!name) {
    return next(ApiError.badRequest("Category name is required"));
   }
   const category = await CategoryService.create({ name, isDefault, userId });
   res.json(new CategoryDto(category));
  } catch (e) {
   next(e);
  }
 }

 async update(req, res, next) {
  try {
   const userId = req.user.id;
   const { id } = req.params;
   const { name, isDefault } = req.body;
   const category = await CategoryService.update(userId, id, { name, isDefault });
   if (!category) {
    return next(ApiError.notFound("Category not found for update"));
   }
   res.json(new CategoryDto(category));
  } catch (e) {
   next(e);
  }
 }

 async delete(req, res, next) {
  try {
   const userId = req.user.id;
   const { id } = req.params;
   const deleted = await CategoryService.delete(userId, id);
   if (!deleted) {
    return next(ApiError.notFound("Category not found for deletion"));
   }
   res.json({ message: "Category deleted" });
  } catch (e) {
   next(e);
  }
 }
}

module.exports = new CategoryController();