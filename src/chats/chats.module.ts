import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatThreadDto, ChatThreadSchema } from './chat-thread.dto';
import { ChatService } from './chat.service';

@Module({
    imports: [
    MongooseModule.forFeature([ { name: ChatThreadDto.name, schema: ChatThreadSchema} ]),
    ],
    providers: [ChatService],
    exports: [ChatService],
})
export class ChatsModule {}
