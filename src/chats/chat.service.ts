import { Content } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatThreadDto, ChatThread } from './chat-thread.dto';



@Injectable()
export class ChatService {


    constructor(@InjectModel(ChatThreadDto.name) private chatModel: Model<ChatThreadDto>) {}


    async createChat(chatHistory: ChatThread) {
          const result = await this.chatModel.create(chatHistory)
          return result
    }


    async getChatHistory(loanId: string) {
        const result = await this.chatModel.findOne({ loanId: loanId })
        console.log('AI SETTINGS: chat history', result)
        const chatHistory : Content[] = result['chatHistory']
        return chatHistory 
    }


    async updateChatHistory(loanId: string, chatHistory: Content[]) {
        const result = await this.chatModel.findOneAndUpdate({ loanId: loanId }, { chatHistory: chatHistory }, { new: true })
        console.log('AI SETTINGS: chat history', result)
        return result
    }

}
