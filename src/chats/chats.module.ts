import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatThreadDto, ChatThreadSchema } from './chat-thread.dto';
import { ChatService } from './chat.service';
import { AiConfigsModule } from 'src/ai-configs/ai-configs.module';

@Module({
    imports: [
        AiConfigsModule,
        MongooseModule.forFeature([ 
            { name: ChatThreadDto.name, schema: ChatThreadSchema},
         ]),
    ],
    providers: [ChatService],
    exports: [ChatService],
})
export class ChatsModule {}
