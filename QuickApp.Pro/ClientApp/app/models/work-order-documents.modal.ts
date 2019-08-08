export class Documents {
  workOrderId: string;
  company: string;
  businessUnit: string;
  divison: string;
  department: string;
  documentCode: string;
  description: string;
  docLink: string;
  isActive: boolean;
  constructor() {
    this.workOrderId = '';
    this.company = '';
    this.businessUnit = '';
    this.divison = '';
    this.department = '';
    this.documentCode = '';
    this.description = 'Contract';
    this.docLink = '';
    this.isActive = false;
  }
}
