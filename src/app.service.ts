import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';
// import { GENERATION_CONFIG, MODEL_NAME, SAFETY_SETTINGS, SYSTEM_INSTRUCTIONS } from './ai-configs/configs.ai';
import { ChatService } from './chats/chat.service';
import { AiConfigsService } from './ai-configs/ai-configs.service';
import { AiConfigs } from './ai-configs/ai-configs.dto';

const API_KEY = process.env.GEMINI_API_KEY;

@Injectable()
export class AppService {
  constructor(private chatService: ChatService, private aiConfigs: AiConfigsService) {}
  async getHello() {
    // TESTING AI SERVICE

    const result = await this.aiConfigs.getConfig()

    // RUNNING CHAT
    this.run(result);
    return 'hello configs test';
  }



  async run(CONFIGS?:AiConfigs) {
    console.log('APP SERVICE: RUN METHOD TO TEST GEMINI ---->');
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: CONFIGS.MODEL_NAME,
      systemInstruction: CONFIGS.SYSTEM_INSTRUCTIONS,
    });

    const chat = model.startChat({
      history: await this.chatService.getChatHistory('1765456789'),
      generationConfig: CONFIGS.GENERATION_CONFIG,
      safetySettings: CONFIGS.SAFETY_SETTINGS
    });



    const msg = "J'ai un petit boulôt qui me permet d'avoir environ 2000000 XOF par mois. En plus de ça, j'ai des parents riches qui me donnent 300 000 XOF par mois en guise d'argent de poche.";

    const result = await chat.sendMessage(msg);

    const response = result.response;
    console.log(response.text());
  }
}
