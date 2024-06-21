import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('ai'); // setting global prefix to ai ==> localhost:3003/ai
  app.enableCors()
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: Number(process.env.AI_MICROSERVICE_PORT),
    },
  });
  await app.startAllMicroservices() //setting up hybrid mode
  await app.listen(process.env.AI_PORT); // setting up local mode
  console.log('AI ASSISTANT HYBRID SERVICE STARTED ON PORT: ', process.env.AI_PORT)
}
bootstrap();
