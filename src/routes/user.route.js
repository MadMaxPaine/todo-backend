const Router = require("express");

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {
 registerValidation,
} = require("../validations/registration.validation");
const validateRequest = require("../middlewares/validationRequest.middleware");
const router = new Router();
/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Операції з користувачами
 */

/**
 * @swagger
 * /api/user/registration:
 *   post:
 *     summary: Реєстрація нового користувача
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Користувач успішно зареєстрований
 *       400:
 *         description: Помилка валідації
 */
router.post(
 "/registration",
 registerValidation,
 validateRequest,
 userController.registration
);
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Логін користувача
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успішний логін
 *       400:
 *         description: Невірні дані
 */
router.post("/login", userController.login);
/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Вихід користувача
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Успішний вихід
 */
router.post("/logout", userController.logout);
/**
 * @swagger
 * /api/user/refresh:
 *   get:
 *     summary: Оновлення токена
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Оновлений токен
 */
router.get("/refresh", userController.refresh);

module.exports = router;
