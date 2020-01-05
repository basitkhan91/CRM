export interface ISalesOrderQuotePart {
  salesOrderQuotePartId: number;
  salesOrderQuoteId: number;
  itemMasterId: number;
  stockLineId: number;
  fxRate: number;
  qtyQuoted: number;
  unitSalePrice: number;
  unitCost: number;
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
  methodType: string;
  serialNumber: string;
  salesPriceExtended: number;
  markupExtended: number;
  salesDiscountExtended: number;
  netSalePriceExtended: number;
  unitCostExtended: number;
  marginAmount: number;
  marginAmountExtended: number;
  marginPercentage: number;
}
