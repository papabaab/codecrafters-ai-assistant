import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Content } from '@google/generative-ai';



export type ChatThread = {
    id?: string;
    chatHistory: Content[];
    userId: string;
    loanId: string;
}

// CHAT THREAD DTO
@Schema({collection: 'chats', strict: false, timestamps: true, versionKey: false, toJSON: {virtuals: true}, toObject: {virtuals: true}})
export class ChatThreadDto extends Document{

    @Prop({type: String})
    chatId: string;

    @Prop({type : [Object], nullable: true})
    chatHistory: Content[]

    @Prop({type: String, nullable: true})
    userId: string

    @Prop({type: String, nullable: true})
    loanId: string
}



export const ChatThreadSchema = SchemaFactory.createForClass(ChatThreadDto);