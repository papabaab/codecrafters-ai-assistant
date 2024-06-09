import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from './chats/chats.module';
import { AiConfigsModule } from './ai-configs/ai-configs.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URL,
      {
        dbName: 'ai_assistant',
      },
    ),
    ChatsModule,
    AiConfigsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
