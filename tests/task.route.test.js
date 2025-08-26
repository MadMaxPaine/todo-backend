const request = require("supertest");
const app = require("../src/app");

let accessToken;

beforeAll(async () => {
  try {
    await request(app)
      .post("/api/user/registration")
      .send({ username: "testuser", password: "password" });
  } catch (err) {}
  const res = await request(app)
    .post("/api/user/login")
    .send({ username: "testuser", password: "password" });
  accessToken = res.body.accessToken;
});

describe("Task routes", () => {
  it("GET /api/tasks - should return array of tasks", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/tasks - should create a new task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ title: "Test task", status: "undone" });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Test task");
    expect(res.body.status).toBe("undone");
  });

  it("GET /api/tasks/:id - should return a single task", async () => {
    const createRes = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ title: "Single task", status: "undone" });
    const taskId = createRes.body.id;

    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(taskId);
  });

  it("PUT /api/tasks/:id - should update a task", async () => {
    const createRes = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ title: "Update task", status: "undone" });
    const taskId = createRes.body.id;

    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ title: "Updated task", status: "done" });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated task");
    expect(res.body.status).toBe("done");
  });

  it("DELETE /api/tasks/:id - should delete a task", async () => {
    const createRes = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ title: "Delete task", status: "undone" });
    const taskId = createRes.body.id;

    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
  });

  it("POST /api/tasks - should fail without title", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ status: "undone" }); // title не передаємо
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors.some(e => e.path === "title")).toBe(true);
  });

  it("POST /api/tasks - should fail with invalid status", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ title: "Bad status", status: "invalid" });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.path === "status")).toBe(true);
  });

  it("POST /api/tasks - should fail with invalid priority", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ title: "Bad priority", status: "undone", priority: 100 });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.path === "priority")).toBe(true);
  });

  it("GET /api/tasks - should fail without token", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(401);
  });

  it("GET /api/tasks/:id - should return 404 for non-existent task", async () => {
    const res = await request(app)
      .get("/api/tasks/999999")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(404);
  });
});

const sequelize = require("../src/config/db");
afterAll(async () => {
  await sequelize.close();
});