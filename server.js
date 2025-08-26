const app = require("./src/app");
const { Pool } = require("pg");
const sequelize = require("./src/config/db");
const cfg = require("./src/config/config");
const models = require("./src/models/index.model"); // Імпортуємо всі моделі для реєстрації
const PORT = cfg.server.port || 7000;
const http = require("http");

const start = async () => {
  try {
    const pool = new Pool({
      host: cfg.database.host,
      port: cfg.database.port,
      user: cfg.database.user,
      password: cfg.database.password,
      database: cfg.database.dialect,
    });

    const client = await pool.connect();
    const dbName = "tododb";

    const dbExists = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (dbExists.rowCount === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully`);
    } else {
      console.log(`Database ${dbName} already exists`);
    }

    client.release();

    await sequelize.authenticate();
    console.log("Синхронізація моделей...");
    await sequelize.sync({ force: true });
    console.log("Синхронізація завершена!");
    // === HTTP ===
    const server = http.createServer(app); // створюємо сервер    

    server.listen(PORT, () =>
      console.log(`Server is starting on port: ${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
