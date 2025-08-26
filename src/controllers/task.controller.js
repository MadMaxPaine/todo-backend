const TaskService = require("../services/task.service");
const ApiError = require("../utils/errors.API");
const TaskDto = require("../dtos/task.dto");

class TaskController {
  async getAll(req, res, next) {
    try {
      const userId = req.user.id;
      const tasks = await TaskService.getAll(userId);
      res.json(tasks.map(task => new TaskDto(task)));
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const task = await TaskService.getOne(userId, id);
      if (!task) {
        return next(ApiError.notFound("Task not found"));
      }
      res.json(new TaskDto(task));
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const userId = req.user.id;
      const { title, description, dueDate, priority, status, categoryId } = req.body;
      if (!title) {
        return next(ApiError.badRequest("Task title is required"));
      }
      const task = await TaskService.create({
        title,
        description,
        dueDate,
        priority,
        status,
        categoryId,
        userId,
      });
      res.json(new TaskDto(task));
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { title, description, dueDate, priority, status, categoryId } = req.body;
      const task = await TaskService.update(userId, id, {
        title,
        description,
        dueDate,
        priority,
        status,
        categoryId,
      });
      if (!task) {
        return next(ApiError.notFound("Task not found for update"));
      }
      res.json(new TaskDto(task));
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const deleted = await TaskService.delete(userId, id);
      if (!deleted) {
        return next(ApiError.notFound("Task not found for deletion"));
      }
      res.json({ message: "Task deleted" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TaskController();