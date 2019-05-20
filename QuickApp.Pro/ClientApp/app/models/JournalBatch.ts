export class JournalBatch {
    id: number;
    JournalBatchNumber: string;
    JournalBatchDescription: string;
    GLAccountId: number;
    JournalSourceId: number;
    JournalTypeId: number;
    JournalPeriodId: number;
    LocalCurrencyId: number;
    LocalDebitAmount: number;
    LocalCreditAmount: number;
    ReportingCurrencyId: number;
    ReportingDebitAmount: number
    ReportingCreditAmount
    IsReversing: boolean;
    IsRecurring: boolean;
    MasterCompanyId: number;
    
    createdBy: string;
    updatedBy: string;
    createdDate: Date;
    updatedDate: Date;
    isDeleted: boolean;
    isActive: boolean;
    journelBatchList: JournalBatch[];

}