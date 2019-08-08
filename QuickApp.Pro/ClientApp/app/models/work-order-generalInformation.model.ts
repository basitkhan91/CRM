export class workOrderGeneralInfo {
  workOrderType: string;
  workOrderDealerType: string;
  workOrderNumber: string;
  openDate: Date;
  workOrderStatus: string;
  customerId: string;
  customerCodeId: string;
  customerReference: string;
  isContract: boolean;
  contract: string;
  creditTerms: string;
  creditTermsandLimitId: string;
  employeeId: string;
  salesPersonId: string;
  csr: string;
  constructor() {
    this.workOrderType = 'single';
    this.workOrderDealerType = 'customer';
    this.workOrderNumber = 'Creating';
    this.openDate = new Date();
    this.workOrderStatus = '';
    this.customerId = '';
    this.customerCodeId = '';
    this.customerReference = '';
    this.isContract = false;
    this.contract = '';
    this.creditTerms = '';
    this.creditTermsandLimitId = '';
    this.employeeId = '';
    this.salesPersonId = '';
    this.csr = '';
  }
}
