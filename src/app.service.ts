import { Injectable } from '@nestjs/common';
import { ChatService } from './chats/chat.service';
import { ChatThread } from './chats/chat-thread.dto';


@Injectable()
export class AppService {
  constructor(private chatService: ChatService) {}


createChatThread(chatThread: ChatThread) {
  return this.chatService.createChatThread(chatThread)
}

  async analyzeLoanRequest(loanId: string, clientMessage?: string) {
    console.log('APP SERVICE: TESTING ANALYZE LOAN REQUEST ---->', loanId, clientMessage);
    const response = await this.chatService.analyzeLoanRequest(loanId, clientMessage)
    console.log(response.text());
    return response.text();
  }
}
