import { Router } from "express";
import { getMe } from "../controllers/authController";
import { protectRoute } from "../middlewares/auth";
import { authCallback } from "../controllers/authController";

const router = Router()

router.get("/me", protectRoute, getMe)
router.post("/callback", authCallback)

export default router