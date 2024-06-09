import { Injectable } from '@nestjs/common';
import { AiConfigs, AiConfigsDto } from './ai-configs.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';
const API_KEY = process.env.GEMINI_API_KEY;

@Injectable()
export class AiConfigsService {

    CONFIGS: AiConfigs
    AI_MODEL: GenerativeModel
    constructor(@InjectModel(AiConfigsDto.name) private aiConfigsModel: Model<AiConfigsDto>) {
        this.onConfigSetup()
    }


    async updateConfig(config: AiConfigsDto) {
        console.log('AI CONFIGS SERVICE: updateConfig: ', config);
        const result = await this.aiConfigsModel.findOneAndUpdate({}, config);
        console.log('AI CONFIGS SERVICE: updateConfig: result: ', result);
        return result;
    }


    private async onConfigSetup() {
        console.log('AI CONFIGS SERVICE: getConfig: ');
        const result = await this.aiConfigsModel.find() as AiConfigs[];
        console.log('AI CONFIGS SERVICE: getConfig: result: ', result);
        this.CONFIGS = result[0]
        this.AI_MODEL = new GoogleGenerativeAI(API_KEY).getGenerativeModel({
            model: this.CONFIGS.MODEL_NAME,
            systemInstruction: this.CONFIGS.SYSTEM_INSTRUCTIONS,
          });
    }

    //METHOD TO CREATE CONFIGURATION OF NEW AI ASSISTANT (used for 1st test)
    // async setConfig(config: AiConfigs) {
    //     console.log('AI CONFIGS SERVICE: setConfig: ', config);
    //     const result = await this.aiConfigsModel.create(config);
    //     console.log('AI CONFIGS SERVICE: setConfig: result: ', result);
    //     return result;
    // }

    async getConfig() {
        console.log('AI CONFIGS SERVICE: getConfig: ');
        const result = await this.aiConfigsModel.find() as AiConfigs[];
        console.log('AI CONFIGS SERVICE: getConfig: result: ', result);
        return result[0];
    }
}
