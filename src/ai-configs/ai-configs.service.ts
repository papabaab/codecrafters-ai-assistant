import { Injectable } from '@nestjs/common';
import { AiConfigs, AiConfigsDto } from './ai-configs.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Content, GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';
import { ROLE } from './default-configs.ai';
const API_KEY = process.env.GEMINI_API_KEY;

@Injectable()
export class AiConfigsService {

    CONFIGS: AiConfigsDto
    AI_MODEL: GenerativeModel
    constructor(@InjectModel(AiConfigsDto.name) private aiConfigsModel: Model<AiConfigsDto>) {
        this.onConfigSetup()
    }


    async updateConfig(configs: AiConfigs) {
        console.log('AI CONFIGS SERVICE: updateConfig: ', configs);
        const configsObj: AiConfigs = {
            MODEL_NAME: configs.MODEL_NAME,
            GENERATION_CONFIG: configs.GENERATION_CONFIG,
            SYSTEM_INSTRUCTIONS: {
                role: ROLE.USER,
                parts: [{ text: configs.SYSTEM_INSTRUCTIONS }]
            } as Content,
            PARTS: configs.PARTS,
            ASSISTANT_NAME: configs.ASSISTANT_NAME
        }
        console.log('AI CONFIGS SERVICE: updateConfig: configsDto: ', configsObj);
        const result = await this.aiConfigsModel.findOneAndUpdate({}, configsObj, { new: true });
        console.log('AI CONFIGS SERVICE: updateConfig: result: ', result);
        return result;
    }


    private async onConfigSetup() {
        console.log('AI CONFIGS SERVICE: getConfig: ');
        const result = await this.aiConfigsModel.find() as AiConfigsDto[];
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
