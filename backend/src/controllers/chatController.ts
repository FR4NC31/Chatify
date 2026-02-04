import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middlewares/auth";
import { Chat } from "../models/chat";

export async function getChats(req: AuthRequest, res: Response, next: NextFunction) {
   try {
     const userId = req.userId

    const chats = await Chat.find ({ participants: userId })
    .populate(
        "participants",
        "name email avatar"
    )
    .populate("lastMessage")
    .sort({ lastMessageAt: -1 })
    
    const formattedChats = chats.map(chat => {
        const otherParticipant = chat.participants.find(p => p._id.toString() !== userId)
        return {
            _id: chat._id,
            participant: otherParticipant,
            lastMessage: chat.lastMessage,
            lastMessageAt: chat.lastMessageAt,
            createdAt: chat.createdAt
        }
    })

    res.json(formattedChats)
   } catch (error) {
    res.status(500)
    next(error)
   }
}

export async function getOrCreateChat(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.userId
        const { participantId } = req.params

        let chat = await Chat.findOne({
            participants: {
                $all: [userId, participantId]
            }
        })
        .populate("participants", "name email avatar")
        .populate("lastMessage")

        if(!chat) {
            const NewChat = new Chat ({ participants: [userId, participantId] })
            await NewChat.save()
            chat = await NewChat.populate("participants", "name email avatar")
        }

        const otherParticipant = chat.participants.find((p: any) => p._id.toString() !== userId)
        res.json({
            _id: chat._id,
            participant: otherParticipant ?? null,
            lastMessage: chat.lastMessage,
            lastMessageAt: chat.lastMessageAt,
            createdAt: chat.createdAt
        })
    } catch (error) {
        res.status(500)
        next(error)
    }
}