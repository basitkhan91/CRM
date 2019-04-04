export class GlAccount {
    glAccountId: number;
    ledgerName: string;
    oldAccountCode: string;
    accountCode: string;
    accountName: string;
    accountDescription: string;
    identification: string;
    summaryAccount: boolean;
    allowManualJE: boolean;
    currencyId: number;
    interCompany: boolean;
    activeFlag: boolean;
    balanceTypeActual: boolean;
    balanceTypeBudget: boolean;
    balanceTypeForecast: boolean;
    gLAccountTypeId: number;
    subAccountOf: number;
    glClassFlowClassificationId: number;
    accountCodeDescription: string;
    glAccountMiscCategoryId: number;
    glCreatedBy: string;
    masterCompanyId: number;
    createdBy: string;
    updatedBy: string;
    createdDate: Date;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
    glAccountList: GlAccount[];

}