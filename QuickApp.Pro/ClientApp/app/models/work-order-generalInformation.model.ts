export class workOrderGeneralInfo {
  isSinglePN: boolean;
  customerContactId: number;
  customerId: number;
  employeeId: number;
  workOrderTypeId: string;
  openDate: Date;
  creditTermsId: number;
  creditLimit: number;
  workOrderStatusId: number;
  salesPersonId: number;
  workOrderNum: string;
  isContractAvl: boolean;
  contract: string

  // workOrderType: string;
  // workOrderDealerType: string;
  // workOrderNumber: string;
  // openDate: Date;
  // workOrderStatus: string;
  // customerId: number;
  // customerCodeId: number ;
  // customerReference: string;
  // isContract: boolean;
  // contract: string;
  // creditTerms: string;
  // creditTermsandLimitId: string;
  // employeeId: number;
  // salesPersonId: number;
  // csr: string;
  constructor() {


    this.isSinglePN = true;
    this.customerContactId = null;
    this.customerId = null;
    this.employeeId = null;
    this.workOrderTypeId = "1";
    this.openDate = new Date();
    this.creditTermsId = null;
    this.creditLimit = null;
    this.workOrderStatusId = null;
    this.salesPersonId = null;
    this.workOrderNum = '';
    this.isContractAvl = false;
    this.contract = '';

    // this.workOrderType = 'single';
    // this.workOrderDealerType = 'customer';
    // this.workOrderNumber = 'Creating';
    // this.openDate = new Date();
    // this.workOrderStatus = '';
    // this.customerId = null;
    // this.customerCodeId = null;
    // this.customerReference = '';
    // this.isContract = false;
    // this.contract = '';
    // this.creditTerms = '';
    // this.creditTermsandLimitId = '';
    // this.employeeId = null;
    // this.salesPersonId = null;
    // this.csr = '';
  }
}
