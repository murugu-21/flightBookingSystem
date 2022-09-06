import app from "./app"
import { port } from "./config"
import { connectDB } from "./config/db"

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`[server]: Server is running at PORT:${port}`)
        })
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
