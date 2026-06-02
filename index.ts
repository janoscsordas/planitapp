import app from "./server/app"

const server = Bun.serve({
    port: process.env.PORT!,
    fetch: app.fetch,
    // websocket: {

    // }
})



console.log(`Server running at ${server.url}`)