import mongoose, { Schema, type Document } from "mongoose";

export interface IMessage extends Document {
    chat: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    text: string
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

messageSchema.index({ chat: 1, createdAt: 1 })
//1 - ascending order
//-1 - descending order

export const Message = mongoose.model<IMessage>("Message", messageSchema)