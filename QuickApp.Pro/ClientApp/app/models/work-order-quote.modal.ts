export class WorkOrderQuote {
  quoteNumber: string;
  openDate: string;
  quoteDueDate: string;
  validForDays: null;
  expirationDate: Date;
  expirationDateStatus: string;
  workOrderNumber: string;
  customerId: string;
  customerCodeId: null;
  customerReference: string;
  isContract: boolean;
  contract: string;
  quantity: null;
  customerRequestDate: Date;
  promiseDate: Date;
  estCompletionDate: Date;
  estShipDate: Date;
  creditTerms: string;
  creditTermsandLimit: string;
  itemCount: null;
  currency: string;
  dso: string;
  accountsReceivableBalance: string;


  constructor() {
    this.quoteNumber = '';
    this.openDate = '';
    this.quoteDueDate = '';
    this.validForDays = null;
    this.expirationDate = new Date();
    this.expirationDateStatus = '';
    this.workOrderNumber = '';
    this.customerId = '';
    this.customerCodeId = null;
    this.customerReference = '';
    this.isContract = true;
    this.contract = '';
    this.quantity = null;
    this.customerRequestDate = new Date();
    this.promiseDate = new Date();
    this.estCompletionDate = new Date();
    this.estShipDate = new Date();
    this.creditTerms = '';
    this.creditTermsandLimit = '';
    this.itemCount = null;
    this.currency = '';
    this.dso = '';
    this.accountsReceivableBalance = '';

  }
}
