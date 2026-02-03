import type { AuthRequest } from "../middlewares/auth";
import type { Request, NextFunction, Response } from "express";
import { User } from "../models/user";
import { clerkClient, getAuth } from "@clerk/express";

export async function getMe(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as AuthRequest).userId

        const user = await User.findById(userId)

        if (!user) return res.status(404).json({ message: "User not found" })

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export async function authCallback(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId: clerkId } = getAuth(req)

        if (!clerkId) {
            res.status(401).json({ message: "Unauthorized" })
            return
        }

        let user = await User.findOne({ clerkId })

        if (!user) {
            const clerkUser = await clerkClient.users.getUser(clerkId)

            user = await User.create({
                clerkId,
                name: clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim() : clerkUser.emailAddresses[0]?.emailAddress.split("@")[0] || "User",
                email: clerkUser.emailAddresses[0]?.emailAddress,
                avatar: clerkUser.imageUrl
            })
        }

        res.json(user)
    } catch (error) {
        next(error)
    }
}