const cfg = require("../src/config/config");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const router = require("../src/routes/index.route");
const errorHandler = require("../src/middlewares/errorHandling.middleware");
const models = require("../src/models/index.model");
const app = express();
const corsOptions = require("./config/cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is online!" });
});

app.use("/api", router);
app.use(errorHandler);

module.exports = app;