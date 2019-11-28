export class WorkOrderLabor {
    workOrderLaborHeaderId: number;
  workFlowWorkOrderId: number;
  dataEnteredBy: number;
  expertiseId: null;
  employeeId: null;
  isTaskCompletedByOne: false;
  workFloworSpecificTaskorWorkOrder: string;
  hoursorClockorScan: 'labourHours';
  workOrderLaborList: any;

    constructor() {
        this.workOrderLaborHeaderId = null;
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
    workOrderLaborHeaderId: number;
    workOrderLaborId: number;
  expertiseId: string;
  employeeId: number;
  billableId: number;
  startDate: Date;
  startDateandTimeIsEdit: boolean;
  endDateandTimeIsEdit: boolean;
  endDate: Date;
  hours: number;
    adjustments: number;
    adjustedHours: number;
    memo: string;
    taskId: number;



    constructor() {
        this.workOrderLaborHeaderId = 0;
        this.workOrderLaborId = 0;
    this.expertiseId = null;
    this.employeeId = null;
    this.billableId = 1;
    this.startDate = null;
    this.startDateandTimeIsEdit = false;
    this.endDate = null;
    this.endDateandTimeIsEdit = false;
    this.hours = 0;
    this.adjustments = 0;
    this.adjustedHours = 0;
        this.memo = '';
        this.taskId = 0;
  }
}
