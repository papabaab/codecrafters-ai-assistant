import { ChatSession, Content, GenerateContentRequest } from '@google/generative-ai';
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
        console.log('CHAT SERVICE: get chat history', result)
        const chatHistory : Content[] = result['chatHistory']
        return chatHistory 
    }


    async updateChatHistory(loanId: string, chatHistory: Content[]) {
        const result = await this.chatModel.findOneAndUpdate({ loanId: loanId }, { chatHistory: chatHistory }, { new: true })
        console.log('CHAT SERVICE: chat history updated', result)
        return result
    }


    async getChat(loanId: string) {
        console.log("CHAT SERVICE: GET CHAT", loanId)
        if(this.chatSession) return this.chatSession
        console.log('CHAT SERVICE": chat session not created yet. Creating new one from', this.aiConfigsService.CONFIGS.MODEL_NAME)
        const chatHistory = await this.getChatHistory(loanId)
        this.chatSession =  await this.aiConfigsService.AI_MODEL.startChat({
            history: chatHistory,
            generationConfig: this.aiConfigsService.CONFIGS.GENERATION_CONFIG,
            safetySettings: this.aiConfigsService.CONFIGS.SAFETY_SETTINGS
          });

        return this.chatSession
    }



    async analyzeLoanRequest(id: string, loanRequest:string){
        console.log("CHAT SERVICE: ANALYZE LOAN REQUEST", loanRequest)
        const contentRequest : GenerateContentRequest = {contents: [this.aiConfigsService.CONFIGS.SYSTEM_INSTRUCTIONS as Content, {role: 'user', parts: [{text: loanRequest}]}]};
        const {response} = await this.aiConfigsService.AI_MODEL.generateContent(contentRequest)
        const chatHistory = [...contentRequest.contents, {role: 'model', parts: [{text: response.text()}]}] as Content[]
        await this.updateChatHistory(id, chatHistory)
        return response
    }

}
