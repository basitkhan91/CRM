﻿export class GlAccount {
    glAccountId: number = NaN;
    ledgerName: string='';
    oldAccountCode: string='';
    accountCode: string='';
    accountName: string='';
    accountDescription: string='';
    //identification: string='';
    summaryAccount: boolean;
    allowManualJE: boolean;
    currencyId: number = NaN;
    interCompany: boolean;
    activeFlag: boolean;
    balanceTypeActual: boolean;
    balanceTypeBudget: boolean;
    balanceTypeForecast: boolean;
    glAccountTypeId: number = NaN;
    subAccountOf: number = NaN;
    glClassFlowClassificationId: number=NaN;
    //accountCodeDescription: string='';
    glAccountMiscCategoryId: number=NaN;
    glCreatedBy: string='';
    masterCompanyId: number=NaN;
    createdBy: string='';
    updatedBy: string='';
    createdDate: Date;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
    managementStrtureId: number = NaN;
    legalEntityId: number=NaN;
    glAccountList: GlAccount[];


}