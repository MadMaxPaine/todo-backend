/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Операції з користувачами
 *   - name: Category
 *     description: Операції з категоріями
 *   - name: Task
 *     description: Операції з задачами
 */
const Router = require("express");
const router = new Router();
const authMiddleware = require("../middlewares/auth.middleware");

const userRouter = require("./user.route");
const categoryRouter = require("./category.route");
const taskRouter = require("./task.route");

router.use("/user", userRouter);
router.use("/categories", categoryRouter);
router.use("/tasks", taskRouter);

module.exports = router;
