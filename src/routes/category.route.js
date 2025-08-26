const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { categoryValidation } = require("../validations/category.validation");
const validateRequest = require("../middlewares/validationRequest.middleware");
/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Операції з категоріями
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Отримати всі категорії
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список категорій
 */
router.get("/", authMiddleware, categoryController.getAll);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Отримати одну категорію
 *     tags: [Category]
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
 *         description: Одна категорія
 *       404:
 *         description: Категорія не знайдена
 */
router.get("/:id", authMiddleware, categoryController.getOne);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Створити категорію
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Категорія створена
 *       400:
 *         description: Помилка валідації
 */
router.post("/", authMiddleware, categoryValidation, validateRequest, categoryController.create);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Оновити категорію
 *     tags: [Category]
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
 *               name:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Категорія оновлена
 *       400:
 *         description: Помилка валідації
 *       404:
 *         description: Категорія не знайдена
 */
router.put("/:id", authMiddleware, categoryValidation, validateRequest, categoryController.update);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Видалити категорію
 *     tags: [Category]
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
 *         description: Категорія видалена
 *       404:
 *         description: Категорія не знайдена
 */
router.delete("/:id", authMiddleware, categoryController.delete);

module.exports = router;