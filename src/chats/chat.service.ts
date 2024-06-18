import { ChatSession, Content, GenerateContentRequest } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatThreadDto, ChatThread } from './chat-thread.dto';
import { AiConfigsService } from 'src/ai-configs/ai-configs.service';



@Injectable()
export class ChatService {

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
        console.log('CHAT SERVICE": chat session not created yet. Creating new one from', this.aiConfigsService.CONFIGS.MODEL_NAME)
        const chatHistory = await this.getChatHistory(loanId)
        const chatSession = this.aiConfigsService.AI_MODEL.startChat({
            history: chatHistory,
            generationConfig: this.aiConfigsService.CONFIGS.GENERATION_CONFIG,
            safetySettings: this.aiConfigsService.CONFIGS.SAFETY_SETTINGS
          });

        return chatSession
    }



    async analyzeLoanRequest(id: string, loanRequest:string){
        console.log("CHAT SERVICE: ANALYZE LOAN REQUEST", loanRequest)
        console.log("CHAT SERVICE: ANALYZE LOAN REQUEST", this.aiConfigsService.CONFIGS.SYSTEM_INSTRUCTIONS)
        const contentRequest : GenerateContentRequest = {contents: [this.aiConfigsService.CONFIGS.SYSTEM_INSTRUCTIONS as Content, {role: 'user', parts: [{text: loanRequest}]}]};
        // const {response} = await this.aiConfigsService.AI_MODEL.generateContent(contentRequest)
        const contentStream = await this.aiConfigsService.AI_MODEL.generateContentStream(contentRequest)
        // console.log("CHAT SERVICE: ANALYZE LOAN REQUEST: RESPONSE ---STREAM")
        // for await (const chunk of stream) {
        //     console.log(chunk.text())
        // }
        
        const aggregateResponse = (await contentStream.response).text()
        // const chatHistory = [...contentRequest.contents, {role: 'model', parts: [{text: response.text()}]}] as Content[]
        const chatHistory = [...contentRequest.contents, {role: 'model', parts: [{text: aggregateResponse}]}] as Content[]
        await this.updateChatHistory(id, chatHistory)
        return (await contentStream.response).text()
    }

    async respondToClient(loanId: string, clientMessage: string){
        console.log('CHAT SERVICE: --> respond to client method: ', loanId)
        const chat = await this.getChat(loanId);
        const generatedContent = await chat.sendMessage(clientMessage)
        const chatHistory = await chat.getHistory()
        await this.updateChatHistory(loanId, chatHistory)
        return generatedContent.response.text()
        
    }

}
