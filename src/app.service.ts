import { Injectable } from '@nestjs/common';
import { ChatService } from './chats/chat.service';
import { ChatThread } from './chats/chat-thread.dto';
import { AiConfigsService } from './ai-configs/ai-configs.service';
import { AiConfigsDto } from './ai-configs/ai-configs.dto';


@Injectable()
export class AppService {
  constructor(private chatService: ChatService, private aiConfigsService: AiConfigsService) {}


createChatThread(chatThread: ChatThread) {
  return this.chatService.createChatThread(chatThread)
}

  async analyzeLoanRequest(loanId: string, clientMessage?: string) {
    console.log('APP SERVICE: TESTING ANALYZE LOAN REQUEST ---->', loanId, clientMessage);
    const response = await this.chatService.analyzeLoanRequest(loanId, clientMessage)
    console.log(response.text());
    return response.text();
  }



  async updateAiConfigs(configs: AiConfigsDto) {
    console.log('APP SERVICE: updateAiConfigs: ', configs);
    return this.aiConfigsService.updateConfig(configs)
  }







  async getAiConfigs() {
    console.log('APP SERVICE: getAiConfigs: ');
    return this.aiConfigsService.getConfig();
  }

}
