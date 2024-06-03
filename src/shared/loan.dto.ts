export class ILoan {
    _id: string 
    userId: string;
    amount?: number;
    interestRate?: number;
    startDate?: Date;
    endDate?: Date;
    professionalCategory?: string;
    profession?: string;
    duration?: number;
    approvalDate?: Date;
    status?: string;
    transactionId?: string;
  }