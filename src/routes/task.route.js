const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { taskValidation } = require("../validations/task.validation");
const validateRequest = require("../middlewares/validationRequest.middleware");

/**
 * @swagger
 * tags:
 *   - name: Task
 *     description: Операції з задачами
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Отримати всі задачі користувача
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список задач
 */
router.get("/", authMiddleware, taskController.getAll);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Отримати одну задачу
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Одна задача
 *       404:
 *         description: Задача не знайдена
 */
router.get("/:id", authMiddleware, taskController.getOne);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Створити задачу
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               priority:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [undone, done]
 *               categoryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Створена задача
 *       400:
 *         description: Помилка валідації
 */
router.post("/", authMiddleware, taskValidation, validateRequest, taskController.create);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Оновити задачу
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               priority:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [undone, done]
 *               categoryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Оновлена задача
 *       400:
 *         description: Помилка валідації
 *       404:
 *         description: Задача не знайдена
 */
router.put("/:id", authMiddleware, taskValidation, validateRequest, taskController.update);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Видалити задачу
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Задача видалена
 *       404:
 *         description: Задача не знайдена
 */
router.delete("/:id", authMiddleware, taskController.delete);

module.exports = router;