import { Module } from '@nestjs/common';
import { AiConfigsDto, AiConfigsSchema } from './ai-configs.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { AiConfigsService } from './ai-configs.service';

@Module({
    imports: [
    MongooseModule.forFeature([ { name: AiConfigsDto.name, schema: AiConfigsSchema} ]),
    ],
    providers: [
    AiConfigsService
],
exports: [
    AiConfigsService
],
})
export class AiConfigsModule {}
