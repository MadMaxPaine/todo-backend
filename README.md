# Todo Backend

Бекенд для додатку задач (Todo) на Node.js, Express, Sequelize.

## Швидкий старт

1. **Встанови залежності**
   ```sh
   npm install
   ```

2. **Створи файл `.env`**  
   Приклад:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=todo_db
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   JWT_SECRET=your_jwt_secret
   ```

3. **Запусти сервер**
   ```sh
   npm start
   ```
   або
   ```sh
   node server.js
   ```

4. **API документація**
   Відкрий у браузері:
   ```
   http://localhost:5000/api-docs
   ```

5. **Тестування**
   ```sh
   npm test
   ```

## Основні ендпоінти

- **/api/user/registration** — реєстрація користувача
- **/api/user/login** — логін
- **/api/user/logout** — вихід
- **/api/user/refresh** — оновлення токена

- **/api/tasks** — CRUD задач
- **/api/categories** — CRUD категорій

## Авторизація

Всі приватні ендпоінти потребують JWT токен у заголовку:
```
Authorization: Bearer <token>
```

## Структура проекту

- `src/routes/` — роутери
- `src/controllers/` — контролери
- `src/models/` — моделі Sequelize
- `src/validations/` — валідація даних
- `src/middlewares/` — middleware
- `src/swagger.js` — Swagger-конфіг

## Ліцензія

MIT