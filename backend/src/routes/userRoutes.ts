import { Router } from "express";
import { protectRoute } from "../middlewares/auth";
import { getUsers } from "../controllers/userController";

const router = Router()

router.get("/", protectRoute, getUsers as any)

export default router