export interface ISalesOrderQuote {
    salesOrderQuoteId: number;
    quoteTypeId: number;
    openDate: string;
    customerRequestDate: string;
    promisedDate: string;
    estimatedShipDate: string;
    validForDays: number;
    quoteExpireDate: string;
    priorityId: number;
    accountTypeId: number;
    customerId: number;
    customerContactId: number;
    customerReference: string;
    contractReference: string;
    salesPersonId: number;
    agentName: string;
    customerSeviceRepId: number;
    probabilityId: number;
    leadSourceId: number;
    creditLimit: number;
    creditTermId: number;
    employeeId: number;
    restrictPMA: boolean;
    restrictDER: boolean;
    quoteApprovedById: number;
    approvedDate: string;
    currencyId: number;
    customerWarningId: number;
    memo: string | null;
    notes: string | null;
    shipToSiteName: string;
    shipToAddress1: string;
    shipToAddress2: string;
    shipToAddress3: string;
    shipToCity: string;
    shipToState: string;
    shipToPostalCode: string;
    shipToCountry: string;
    shipToContactId: number;
    shipToContactName: string;
    shipViaName: string;
    shipViaShippingAccountInfo: string;
    shippingId: string;
    shippingURL: string;
    shipViaMemo: string;
    shipViaShippingURL: string;
    billToSiteName: string;
    billToAddress1: string;
    billToAddress2: string;
    billToAddress3: string;
    billToCity: string;
    billToState: string;
    billToPostalCode: string;
    billToCountry: string;
    billToContactId: number;
    billToContactName: string;
    billToMemo: string;
    masterCompanyId: number;
    createdBy: string;
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
    isDeleted: boolean;
    statusId: number;
}