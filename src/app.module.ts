import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URL,
      {
        dbName: 'ai_assistant',
      },
    ),
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
