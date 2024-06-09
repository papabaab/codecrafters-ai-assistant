import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('ai'); // setting global prefix to ai ==> localhost:3001/ai
  app.enableCors()
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });
  await app.startAllMicroservices() //setting up hybrid mode
  await app.listen(3003); // setting up local mode
}
bootstrap();
