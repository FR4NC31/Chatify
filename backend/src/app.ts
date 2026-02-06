import express from 'express'
import { clerkMiddleware } from "@clerk/express"
import { errorHandler } from './middlewares/errorHandler'
import path from 'path'

//Routes
import authRoutes from "./routes/authRoute"
import chatRoutes from "./routes/chatRoute"
import messageRoutes from "./routes/messageRoute"
import userRoutes from "./routes/userRoutes"

const app = express()

app.use(express.json())

app.use(clerkMiddleware())

app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" })
})

app.use(errorHandler)

app.use("/api/auth", authRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)



if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../web/dist")))

    app.get("/{*any}", ( req, res ) => {
        res.sendFile(path.join(__dirname, "../../web/dist/index.html"))
    })
}
export default app