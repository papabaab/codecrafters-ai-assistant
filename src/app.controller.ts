
import { Body, Controller, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { ChatThread } from './chats/chat-thread.dto';

@Controller('assistant')
export class AppController {
  constructor(private readonly appService: AppService) {}




  @EventPattern('loan_created')
  async onLoanCreated(createdLoan: any) {
    console.log('APP CONTROLLER: onLoanCreated ---->', createdLoan);
    const chatThread : ChatThread = {
      loanId: createdLoan.id,
      clientId: createdLoan.userId,
    }
    console.log('CHAT HISTORY OF NEW LOAN: ', chatThread);
    const result = await this.appService.createChatThread(chatThread);
    console.log('APP CONTROLLER: CHAT THREAD CREATED ---->', result);
    return await this.appService.respondToClient(createdLoan.id, JSON.stringify(createdLoan));
  }



  @Post(':loanId')
  respondToClient(@Param() loanId: string, @Body() clientMessage?: string) {
    console.log('APP CONTROLLER: RUN METHOD TO TEST GEMINI ---->', loanId, clientMessage);
    return this.appService.respondToClient(loanId, clientMessage);
  }
}


