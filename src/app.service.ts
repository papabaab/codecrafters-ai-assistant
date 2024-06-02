import { Injectable } from '@nestjs/common';
import { ChatService } from './chats/chat.service';


@Injectable()
export class AppService {
  constructor(private chatService: ChatService) {}
  async getHello() {
    // TESTING AI SERVICE
    this.run();
    return 'hello configs test';
  }



  async run() {
    console.log('APP SERVICE: RUN METHOD TO TEST GEMINI ---->');
    const chat = await this.chatService.startChat('1765456789')
    const msg = "J'ai un petit boulôt qui me permet d'avoir environ 2000000 XOF par mois. En plus de ça, j'ai des parents riches qui me donnent 300 000 XOF par mois en guise d'argent de poche.";

    const result = await chat.sendMessage(msg);
    const history = await chat.getHistory()
    const historyUpdated = await this.chatService.updateChatHistory('1765456789',history)

    console.log('APP SERVICE: CHAT HISTORY UPDATED', historyUpdated)

    const response = result.response;
    console.log(response.text());
  }
}
