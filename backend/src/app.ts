import express from 'express'

//Routes
import authRoutes from "./routes/authRoute"
import chatRoutes from "./routes/chatRoute"
import messageRoutes from "./routes/messageRoute"
import userRoutes from "./routes/userRoutes"

const app = express()

app.use(express.json())

app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" })
})

app.use("/api/auth", authRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)
export default app