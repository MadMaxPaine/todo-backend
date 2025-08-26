const Task = require("../models/task.model");

class TaskRepository {
 async findAllByUser(userId) {
  return Task.findAll({ where: { userId } });
 }

 async findByIdForUser(id, userId) {
  return Task.findOne({ where: { id, userId } });
 }

 async create(data) {
  return Task.create(data);
 }
 async findAllByUserAndCategory(userId, categoryId) {
  return Task.findAll({ where: { userId, categoryId } });
 }
}

module.exports = new TaskRepository();