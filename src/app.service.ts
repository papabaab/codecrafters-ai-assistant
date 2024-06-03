import { Injectable } from '@nestjs/common';
import { ChatService } from './chats/chat.service';
import { ChatThread } from './chats/chat-thread.dto';


@Injectable()
export class AppService {
  constructor(private chatService: ChatService) {}


createChatThread(chatThread: ChatThread) {
  return this.chatService.createChatThread(chatThread)
}

  async respondToClient(loanId: string, clientMessage?: string) {
    console.log('APP SERVICE: RUN METHOD TO TEST GEMINI ---->', loanId, clientMessage);
    const chat = await this.chatService.getChat(loanId?loanId:'1765456789')
    const msg = clientMessage? clientMessage : "J'ai un petit boulôt qui me permet d'avoir environ 2000000 XOF par mois. En plus de ça, j'ai des parents riches qui me donnent 300 000 XOF par mois en guise d'argent de poche.";
    const result = await chat.sendMessage(msg);
    const history = await chat.getHistory()
    const historyUpdated = await this.chatService.updateChatHistory('1765456789',history)
    console.log('APP SERVICE: CHAT HISTORY UPDATED', historyUpdated)
    const response = result.response;
    console.log(response.text());
  }
}
