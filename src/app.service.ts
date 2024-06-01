import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';
import { GENERATION_CONFIG, MODEL_NAME, PARTS, ROLE, SAFETY_SETTINGS, SYSTEM_INSTRUCTIONS } from './configs.ai';

const API_KEY = process.env.GEMINI_API_KEY;

@Injectable()
export class AppService {
  constructor() {}
  getHello(): string {
    this.run();
    return 'Hello World!';
  }
  async run() {
    console.log('APP SERVICE: RUN METHOD TO TEST GEMINI ---->');
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: SYSTEM_INSTRUCTIONS,
    });

    // const result = await model.generateContent({
    //   contents: [{ role: 'user', parts }],
    //   generationConfig,
    //   safetySettings,
    // });

    const chat = model.startChat({
      history: [
        {
          role: ROLE.USER,
          parts: [PARTS[0]],
        },
        {
          role: ROLE.MODEL,
          parts: [PARTS[1]],
        }
      ], generationConfig: GENERATION_CONFIG,
      safetySettings: SAFETY_SETTINGS
    });

    const msg = "J'ai un petit boulôt qui me permet d'avoir environ 2000000 XOF par mois. En plus de ça, j'ai des parents riches qui me donnent 300 000 XOF par mois en guise d'argent de poche.";

    const result = await chat.sendMessage(msg);

    const response = result.response;
    console.log(response.text());
  }
}
