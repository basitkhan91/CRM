import { ISalesOrderQuoteApproverList } from "./ISalesOrderQuoteApproverList";

export class SalesOrderQuoteApproverList implements ISalesOrderQuoteApproverList {
    salesOrderQuoteApproverListId: number;
    salesOrderQuoteId: number;
    employeeId: number;
    level: number;
    statusId: number;
    masterCompanyId: number;
    createdBy: string;
    updatedBy: string;
    createdDate: number;
    updatedDate: number;
}