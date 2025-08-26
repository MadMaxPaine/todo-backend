const corsOptions = {
  origin: [
    "http://localhost:3000", // dev frontend
    "https://todo-frontend-ua7r.vercel.app/"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization",],
  credentials: true, // дозволити куки
};

module.exports = corsOptions;
