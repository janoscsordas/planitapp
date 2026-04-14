import { Hono } from "hono";
import { logger } from "hono/logger";
import { auth } from "./lib/auth";
import { taskRoutes } from "./routes/task";

const app = new Hono();

app.use("*", logger())

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

const apiRoutes = app.basePath("/api").route("/tasks", taskRoutes)

export default app;
export type ApiRoutes = typeof apiRoutes;
