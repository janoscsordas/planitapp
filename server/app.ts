import { Hono } from "hono";
import { logger } from "hono/logger";
import { auth } from "./lib/auth";

const app = new Hono();

app.use("*", logger())

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

export default app;
