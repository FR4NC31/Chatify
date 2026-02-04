import { Router } from "express";
import { protectRoute } from "../middlewares/auth";
import { getChats, getOrCreateChat } from "../controllers/chatController";

const router = Router()

router.use(protectRoute)
router.get("/", getChats as any)
router.post("/with/:participantId", getOrCreateChat as any)

export default router