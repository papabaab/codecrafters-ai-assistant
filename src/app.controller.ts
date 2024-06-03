
import { Body, Controller, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { ChatThread } from './chats/chat-thread.dto';
import { ILoan } from './shared/loan.dto';

@Controller('assistant')
export class AppController {
  constructor(private readonly appService: AppService) {}



  /**
   * 
   * @param createdLoan `ILoan`
   * @description cette fonction permet de traiter les nouvelles demandes de prêts
   * @returns 
   */

  @MessagePattern({cmd: 'loan_created'})
  async onLoanCreated(createdLoan: ILoan) {
    console.log('APP CONTROLLER: onLoanCreated ---->', createdLoan);
    const chatThread : ChatThread = {
      loanId: createdLoan._id,
      clientId: createdLoan.userId,
    }
    console.log('CHAT HISTORY OF NEW LOAN: ', chatThread);
    const result = await this.appService.createChatThread(chatThread);
    console.log('APP CONTROLLER: CHAT THREAD CREATED ---->', result);
    return this.appService.analyzeLoanRequest(createdLoan._id, JSON.stringify(createdLoan));
  }




  @Post(':loanId')
  respondToClient(@Param() loanId: string, @Body() clientMessage?: string) {
    console.log('APP CONTROLLER: RUN METHOD TO TEST GEMINI ---->', loanId, clientMessage);
    return this.appService.analyzeLoanRequest(loanId, clientMessage);
  }
}


