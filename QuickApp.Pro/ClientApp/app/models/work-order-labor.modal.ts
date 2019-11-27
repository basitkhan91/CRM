export class WorkOrderLabor {
  workFlowWorkOrderId: number;
  dataEnteredBy: number;
  expertiseId: null;
  employeeId: null;
  isTaskCompletedByOne: false;
  workFloworSpecificTaskorWorkOrder: string;
  hoursorClockorScan: 'labourHours';
  workOrderLaborList: any;

  constructor() {
    this.workFlowWorkOrderId = null;
    this.dataEnteredBy = null;
    this.expertiseId = null;
    this.employeeId = null;
    this.isTaskCompletedByOne = false;
    this.workFloworSpecificTaskorWorkOrder = 'specificTasks';
    this.hoursorClockorScan = 'labourHours';
  }
}

export class AllTasks {
  expertiseId: string;
  employeeId: number;
  billableId: number;
  startDate: Date;
  startDateandTimeIsEdit: boolean;
  endDateandTimeIsEdit: boolean;
  endDate: Date;
  hours: string;
  adjustments: string;
  adjustedHours: string;
  memo: string;



  constructor() {
    this.expertiseId = null;
    this.employeeId = null;
    this.billableId = 1;
    this.startDate = null;
    this.startDateandTimeIsEdit = false;
    this.endDate = null;
    this.endDateandTimeIsEdit = false;
    this.hours = '';
    this.adjustments = '';
    this.adjustedHours = '';
    this.memo = '';
  }
}
