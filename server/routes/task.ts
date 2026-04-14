import { Hono } from "hono";

export const taskRoutes = new Hono()
    .get("/", (c) => {
        // get all tasks by organizationId
        return c.json({ message: "Get all tasks by organizationId" });
    });