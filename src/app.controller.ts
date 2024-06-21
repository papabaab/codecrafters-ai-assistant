
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { ChatThread } from './chats/chat-thread.dto';
import { ILoan } from './shared/loan.dto';
import { AiConfigs } from './ai-configs/ai-configs.dto';

@Controller('')
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




  @MessagePattern({cmd: 'updateConfigs'})
  @Put('configs')
  updateConfigs(@Body() configs?: AiConfigs) {
    console.log('APP CONTROLLER: RUN METHOD TO TEST GEMINI ---->', configs);
    return this.appService.updateAiConfigs(configs);
  }


  @MessagePattern({cmd: 'getConfigs'})
  @Get('configs')
  async getConfigs() {
    console.log('APP CONTROLLER: get configs of the AI ---->');
    const result = await this.appService.getAiConfigs();
    console.log('APP CONTROLLER: get configs of the AI ---->', result);
    return result
  }



  @MessagePattern({cmd: 'respondToClient'})
  @Post('interview')
  async respondToClient(@Body('loanId') loanId: string, @Body('clientMessage') clientMessage: string){
    console.log("APP CONTROLLER: ---> respondToClient method: ", loanId)
    const result = await this.appService.respondToClient(loanId, clientMessage)
    console.log('APP CONTROLLER ----> response of ai assistant: ', result)
    return result;
  }






}


