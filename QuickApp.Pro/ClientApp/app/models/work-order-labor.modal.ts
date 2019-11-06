export class WorkOrderLabor {
  workFlowWorkOrderId: number;
  dataEnteredBy: number;
  expertise: string;
  employeeId: null;
  isTaskCompletedByOne: false;
  workFloworSpecificTaskorWorkOrder: 'workFlow';
  hoursorClockorScan: 'labourHours';
  tasks: [
    {
      receive: AllTasks[];
      inspect: AllTasks[];
      evaluate: AllTasks[];
      tearDown: AllTasks[];
      disassemble: AllTasks[];
      assemble: AllTasks[];
      testing: AllTasks[];
      qualityControl: AllTasks[];
      ship: AllTasks[];
      clean: AllTasks[];
    }
  ];

  constructor() {
    this.workFlowWorkOrderId = null;
    this.dataEnteredBy = null;
    this.expertise = '';
    this.employeeId = null;
    this.isTaskCompletedByOne = false;
    this.workFloworSpecificTaskorWorkOrder = 'workFlow';
    this.hoursorClockorScan = 'labourHours';
    this.tasks = [
      {
        receive: [],
        inspect: [],
        evaluate: [],
        tearDown: [],
        disassemble: [],
        assemble: [],
        testing: [],
        qualityControl: [],
        ship: [],
        clean: []
      }
    ];
  }
}

export class AllTasks {
  expertise: string;
  employeeId: number;
  billableorNonBillable: string;
  startDateandTime: Date;
  startDateandTimeIsEdit: boolean;
  endDateandTimeIsEdit: boolean;
  endDateandTime: Date;
  hoursandMinutes: string;
  adjustments: string;
  adjustmentedHours: string;
  memo: string;

  constructor() {
    this.expertise = '';
    this.employeeId = null;
    this.billableorNonBillable = 'billable';
    this.startDateandTime = null;
    this.startDateandTimeIsEdit = false;
    this.endDateandTime = null;
    this.endDateandTimeIsEdit = false;
    this.hoursandMinutes = '';
    this.adjustments = '';
    this.adjustmentedHours = '';
    this.memo = '';
  }
}
