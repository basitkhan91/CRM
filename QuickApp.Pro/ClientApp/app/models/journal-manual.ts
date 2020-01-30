export class JournalManual {
    id: number;
    isManual: boolean;
    glAccountId: number;
    batchNumber: number;
    batchName: string;
    batchDescription: string;
    balanceTypeId: number;
    journalCategoryId: number;
    journalTypeId: number;
    entryDate: Date;
    effectiveDate: Date;
    accountingCalendarId: number;
    // journalManualPeriodName: string;
    employeeId: number;
    localCurrencyId: number;
    reportingCurrencyId: number;
    currencyDate: Date;
    journalCurrencyTypeId: number;
    currencyRate: number;
    isReversing: boolean;
    reversingDate: Date;
    reversingAccountingCalendarId: number;
    isRecurring: boolean;
    recurringDate: Date;
    // reversingPeriodName: string;
    masterCompanyId: number;

    localDebitCurrency: number;
    localCreditCurrency: number;
    reportingDebitCurrency: number;
    reportingCreditCurrency: number;

    description: string;
    managementStructureEntityId: number;

    createdBy: string;
    updatedBy: string;
    createdDate: string;
    updatedDate: string;
    isDeleted: boolean;
    isActive: boolean;
    journalManualList: JournalManual[];
}