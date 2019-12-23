import { ISalesOrderQuotePart } from './ISalesOrderQuotePart';
export class SalesOrderQuotePart implements ISalesOrderQuotePart {
    salesOrderQuotePartId: number;
    salesOrderQuoteId: number;
    itemMasterId: number;
    stockLineId: number;
    fxRate: number;
    qtyQuoted: number;
    unitSalePrice: number;
    markUpPercentage: number;
    salesBeforeDiscount: number;
    discount: number;
    discountAmount: number;
    netSales: number;
    masterCompanyId: number;
    createdBy: string;
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
    isDeleted: boolean;
}