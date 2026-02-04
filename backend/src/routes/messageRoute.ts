import { Router } from "express";
import { protectRoute } from "../middlewares/auth";
import { getMessages } from "../controllers/messageController";

const router = Router()

router.get('/chat/:chatId', protectRoute, getMessages as any)

export default router