const TaskRepository = require("../repositories/task.repository");
const ApiError = require("../utils/errors.API");

class TaskService {
 async getAll(userId, categoryId) {
  if (categoryId) {
   return TaskRepository.findAllByUserAndCategory(userId, categoryId);
  }
  return TaskRepository.findAllByUser(userId);
 }

 async getOne(userId, id) {
  return TaskRepository.findByIdForUser(id, userId);
 }

 async create({ title, description, dueDate, priority, status, categoryId, userId }) {
  // Перевірка: чи є title
  if (!title) {
   throw ApiError.badRequest("Task title is required");
  }
  // Можна додати додаткову валідацію, якщо потрібно
  return TaskRepository.create({
   title,
   description,
   dueDate,
   priority,
   status,
   categoryId,
   userId,
  });
 }

 async update(userId, id, { title, description, dueDate, priority, status, categoryId }) {
  const task = await TaskRepository.findByIdForUser(id, userId);
  if (!task) {
   return null;
  }
  // Оновлення полів
  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.dueDate = dueDate ?? task.dueDate;
  task.priority = priority ?? task.priority;
  task.status = status ?? task.status;
  task.categoryId = categoryId ?? task.categoryId;
  await task.save();
  return task;
 }

 async delete(userId, id) {
  const task = await TaskRepository.findByIdForUser(id, userId);
  if (!task) {
   return null;
  }
  await task.destroy();
  return true;
 }
}

module.exports = new TaskService();
