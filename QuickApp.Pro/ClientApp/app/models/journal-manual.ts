export class JournalManual {
    id: number;
    isManual: boolean;
    gLAccountId: number;
    journalManualBatchNumber: number;
    journalManualBatchName: string;
    journalManualBatchDescription: string;
    journalManualBalanceTypeId: number;
    journalManualCategoryId: number;
    journalManualTypeId: number;
    journalManualEntryDate: Date;
    journalManualEffectiveDate: Date;
    journalManualPeriodName: string;
    journalManualEmployeeId: number;
    journalManualLocalCurrencyId: number;
    journalManualReportingCurrencyId: number;
    journalManualCurrencyDate: Date;
    journalManualcurrencytype: number;
    journalManualcurrencyrate: number;
    isreversing: boolean;
    isrecurring: boolean;
    journalManualReversingDate: Date;
    reversingPeriodName: string;
    journalManualRecurringDate: Date;
    masterCompanyId: number;

    journalManualLocalDebitCurrency: number;
    journalManualLocalCreditCurrency: number;
    journalManualReposrtingDebitCurrency: number;
    journalManualReposrtingCreditCurrency: number;

    JournalManualDescription: string

    createdBy: string;
    updatedBy: string;
    createdDate: Date;
    updatedDate: Date;
    isDeleted: boolean;
    isActive: boolean;
    journalManualList: JournalManual[];
}