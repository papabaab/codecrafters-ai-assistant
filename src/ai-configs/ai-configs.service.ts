import { Injectable } from '@nestjs/common';
import { AiConfigs, AiConfigsDto } from './ai-configs.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AiConfigsService {

    constructor(@InjectModel(AiConfigsDto.name) private aiConfigsModel: Model<AiConfigsDto>) {}



    async updateConfig(config: AiConfigsDto) {
        console.log('AI CONFIGS SERVICE: updateConfig: ', config);
        const result = await this.aiConfigsModel.findOneAndUpdate({}, config);
        console.log('AI CONFIGS SERVICE: updateConfig: result: ', result);
        return result;
    }


    async getConfig() {
        console.log('AI CONFIGS SERVICE: getConfig: ');
        const result = await this.aiConfigsModel.find() as AiConfigs[];
        console.log('AI CONFIGS SERVICE: getConfig: result: ', result);
        return result[0] ; //RETURN FIRST CONFIGS FOR NOW --- ONLY ONE ASSISTANT SO FAR
    }

    async setConfig(config: AiConfigs) {
        console.log('AI CONFIGS SERVICE: setConfig: ', config);
        const result = await this.aiConfigsModel.create(config);
        console.log('AI CONFIGS SERVICE: setConfig: result: ', result);
        return result;
    }
}
