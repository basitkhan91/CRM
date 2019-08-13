export class workOrderGeneralInfo {
  workOrderType: string;
  workOrderDealerType: string;
  workOrderNumber: string;
  openDate: Date;
  workOrderStatus: string;
  customerId: number;
  customerCodeId: number ;
  customerReference: string;
  isContract: boolean;
  contract: string;
  creditTerms: string;
  creditTermsandLimitId: string;
  employeeId: number;
  salesPersonId: number;
  csr: string;
  constructor() {
    this.workOrderType = 'single';
    this.workOrderDealerType = 'customer';
    this.workOrderNumber = 'Creating';
    this.openDate = new Date();
    this.workOrderStatus = '';
    this.customerId = null;
    this.customerCodeId = null;
    this.customerReference = '';
    this.isContract = false;
    this.contract = '';
    this.creditTerms = '';
    this.creditTermsandLimitId = '';
    this.employeeId = null;
    this.salesPersonId = null;
    this.csr = '';
  }
}
