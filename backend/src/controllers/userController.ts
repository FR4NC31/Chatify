import type { Response, NextFunction } from 'express'
import type { AuthRequest } from '../middlewares/auth';
import { User } from '../models/user';

export async function getUsers(req:AuthRequest, res:Response, next:NextFunction) {
    try {
        const userId = req.userId

        const users = await User.find ({_id: {$ne: userId} })
        .select ("name email avatar")
        .limit(50)

        res.json(users)
    } catch (error) {
        res.status(500)
        next(error)
    }
}