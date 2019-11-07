export class WorkOrderLabor {
  workFlowWorkOrderId: number;
  dataEnteredBy: number;
  expertiseId: null;
  employeeId: null;
  isTaskCompletedByOne: false;
  workFloworSpecificTaskorWorkOrder: 'workFlow';
  hoursorClockorScan: 'labourHours';
  workOrderLaborList: [
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
    this.expertiseId = null;
    this.employeeId = null;
    this.isTaskCompletedByOne = false;
    this.workFloworSpecificTaskorWorkOrder = 'workFlow';
    this.hoursorClockorScan = 'labourHours';
    this.workOrderLaborList = [
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
  expertiseId: string;
  employeeId: number;
  billableId: string;
  startDate: Date;
  startDateandTimeIsEdit: boolean;
  endDateandTimeIsEdit: boolean;
  endDate: Date;
  hoursandMinutes: string;
  adjustments: string;
  adjustmentedHours: string;
  memo: string;



  constructor() {
    this.expertiseId = null;
    this.employeeId = null;
    this.billableId = '';
    this.startDate = null;
    this.startDateandTimeIsEdit = false;
    this.endDate = null;
    this.endDateandTimeIsEdit = false;
    this.hoursandMinutes = '';
    this.adjustments = '';
    this.adjustmentedHours = '';
    this.memo = '';
  }
}
