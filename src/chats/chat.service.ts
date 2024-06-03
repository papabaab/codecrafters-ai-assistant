import { ChatSession, Content } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatThreadDto, ChatThread } from './chat-thread.dto';
import { AiConfigsService } from 'src/ai-configs/ai-configs.service';



@Injectable()
export class ChatService {

    private chatSession: ChatSession

    constructor(@InjectModel(ChatThreadDto.name) private chatModel: Model<ChatThreadDto> , 
    private aiConfigsService: AiConfigsService) {}



    // CRÉEER UN NOUVEAU CHAT THREAD POUR ENREGISTRER LES INTÉRACTIONS ENTRE LE CLIENT ET L'IA
    /**
     * 
     * @param chatThread 
     * @description Cette fonction permet de creer un nouveau chat
     * @returns 
     */
    async createChatThread(chatThread: ChatThread) {
          const result = await this.chatModel.create(chatThread)
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


    async getChat(loanId: string) {
        if(this.chatSession) return this.chatSession
        this.chatSession =  await this.aiConfigsService.AI_MODEL.startChat({
            history: await this.getChatHistory(loanId),
            generationConfig: this.aiConfigsService.CONFIGS.GENERATION_CONFIG,
            safetySettings: this.aiConfigsService.CONFIGS.SAFETY_SETTINGS
          });

        return this.chatSession
    }

}
