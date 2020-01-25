export class PartDetail {
  salesOrderQuotePartId: number;
  partNumber: string;
  stockLineNumber: string;
  description: string;
  conditionId: number;
  conditionDescription: string;
  classification: string;
  itemClassification: any;
  quantityRequested: number;
  quantityAlreadyQuoted: number;
  quantityToBeQuoted: number;
  quantityFromThis: number;
  uom: string;
  currency: any;
  currencyId: string;
  currencyDescription: string;
  fixRate: number;
  partType: string;
  markUpPercentage: number;
  salesDiscount: number;

  itemMasterId: number;
  stockLineId: number;
  masterCompanyId: number;
  method: string;
  methodType: string;
  serialNumber: string;
  pmaStatus: string;
  idNumber: string;

  salesPricePerUnit: number;
  markupPerUnit: number;
  salesDiscountPerUnit: number;
  netSalesPricePerUnit: number;
  unitCostPerUnit: number;
  marginAmountPerUnit: number;
  marginPercentagePerUnit: number;

  salesPriceExtended: number;
  markupExtended: number;
  salesDiscountExtended: number;
  netSalesPriceExtended: number;
  unitCostExtended: number;
  marginAmountExtended: number;
  marginPercentageExtended: number;

  constructor() {}

  get QuantityToBeQuoted(): number {
    return this.quantityToBeQuoted;
  }

  set QuantityToBeQuoted(value: number) {
    this.quantityToBeQuoted = value;
  }

  get SalesPricePerUnit(): number {
    return this.salesPricePerUnit;
  }

  set SalesPricePerUnit(value: number) {
    this.salesPricePerUnit = value;
  }

  get MarkupPerUnit(): number {
    return this.markupPerUnit;
  }

  set MarkupPerUnit(value: number) {
    this.markupPerUnit = value;
  }

  get SalesDiscountPerUnit(): number {
    return this.salesDiscountPerUnit;
  }

  set SalesDiscountPerUnit(value: number) {
    this.salesDiscountPerUnit = value;
  }

  get NetSalesPricePerUnit(): number {
    return this.netSalesPricePerUnit;
  }

  set NetSalesPricePerUnit(value: number) {
    this.netSalesPricePerUnit = value;
  }

  get UnitCostPerUnit(): number {
    return this.unitCostPerUnit;
  }

  set MarginAmountPerUnit(value: number) {
    this.marginAmountPerUnit = value;
  }

  get MarginPercentagePerUnit(): number {
    return this.marginAmountPerUnit;
  }

  set MarginPercentagePerUnit(value: number) {
    this.marginAmountPerUnit = value;
  }

  get SalesPriceExtended(): number {
    return this.salesPriceExtended;
  }

  set SalesPriceExtended(value: number) {
    this.salesDiscountExtended = value;
  }

  get MarkupExtended(): number {
    return this.markupExtended;
  }

  set MarkupExtended(value: number) {
    this.markupExtended = value;
  }

  get SalesDiscountExtended(): number {
    return this.salesDiscountExtended;
  }

  set SalesDiscountExtended(value: number) {
    this.salesDiscountExtended = value;
  }

  get NetSalesPriceExtended(): number {
    return this.netSalesPriceExtended;
  }

  set NetSalesPriceExtended(value: number) {
    this.netSalesPriceExtended = value;
  }

  get UnitCostExtended(): number {
    return this.unitCostExtended;
  }

  set UnitCostExtended(value: number) {
    this.unitCostExtended = value;
  }

  get MarginAmountExtended(): number {
    return this.marginAmountExtended;
  }

  set MarginAmountExtended(value: number) {
    this.marginAmountExtended = value;
  }

  get MarginPercentageExtended(): number {
    return this.marginPercentageExtended;
  }

  set MarginPercentageExtended(value: number) {
    this.marginPercentageExtended = value;
  }

  get MarkUpPercentage(): number {
    return this.markUpPercentage;
  }

  set MarkUpPercentage(value: number) {
    this.markUpPercentage = value;
  }

  get SalesDiscount(): number {
    return this.salesDiscount;
  }

  set SalesDiscount(value: number) {
    this.salesDiscount = value;
  }

  private setDefaults() {
    this.markUpPercentage = 10;
    this.salesDiscount = 5;
    // this.salesPricePerUnit = 0;
    // this.salesPricePerUnit = 0;
    // this.markupPerUnit = 0;
    // this.salesDiscountPerUnit = 0;
    // this.netSalesPricePerUnit = 0;
    // this.unitCostPerUnit = 0;
    // this.marginAmountPerUnit = 0
    // this.marginPercentagePerUnit = 0;
  }

  public calculate() {
    try {
      this.SalesPriceExtended = this.SalesPricePerUnit * this.quantityRequested;
      this.MarkupPerUnit =
        this.SalesPricePerUnit * (this.markUpPercentage / 100);
      this.MarkupExtended = this.markupPerUnit * this.quantityAlreadyQuoted;
      this.SalesDiscountPerUnit =
        (this.SalesDiscount / 100) *
        (this.SalesPricePerUnit + this.MarkupPerUnit);
      this.SalesDiscountExtended =
        (this.SalesDiscount / 100) * this.quantityAlreadyQuoted;
      this.NetSalesPricePerUnit =
        this.SalesPricePerUnit + this.MarkupPerUnit + this.SalesDiscountPerUnit;
      this.NetSalesPriceExtended =
        this.SalesPriceExtended +
        this.MarkupExtended +
        this.SalesDiscountExtended;
      this.MarginAmountPerUnit =
        this.NetSalesPricePerUnit - this.UnitCostPerUnit;
      this.MarginPercentagePerUnit =
        this.NetSalesPricePerUnit / this.MarginAmountPerUnit;
    } catch (e) {
      console.log(e);
    }
  }
}
