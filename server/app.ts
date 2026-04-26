import { Hono } from "hono"
import { logger } from "hono/logger"
import { auth } from "./lib/auth"
import { taskRoutes } from "./routes/task"

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}>()

app.use("*", logger())

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    c.set("user", null)
    c.set("session", null)
    await next()
    return
  }

  c.set("user", session.user)
  c.set("session", session.session)
  await next()
})

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))

const apiRoutes = app.basePath("/api").route("/tasks", taskRoutes)

export default app
export type ApiRoutes = typeof apiRoutes
