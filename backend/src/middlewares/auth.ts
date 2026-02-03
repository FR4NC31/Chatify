import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { User } from "../models/user";
import { requireAuth } from "@clerk/express";

export type AuthRequest = Request & { userId: string }

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId: clerkId } = getAuth(req)
        if (!clerkId) {
            res.status(401).json({ message: "Unauthorized - invalid token" })
            return
        }

        const user = await User.findOne({ clerkId })
        if (!user) {
            res.status(404).json({ message: "User not found" })
            return
        }

        (req as AuthRequest).userId = user._id.toString()
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware", error)
        next(error)
    }
}

export const protectRoute = [requireAuth(), authMiddleware]