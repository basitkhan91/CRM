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

export class WorkOrderQuoteLabor{
  
    WorkOrderQuoteDetailsId:number;
    WorkOrderQuoteId:number;
    ItemMasterId:number;
    BuildMethodId:number;
    SelectedId:number;
    ReferenceNo:string;
    EstCompDate:any;
    StageId:number;
    StatusId:number;
    CMMId:any;
    IsPMA:boolean;
    IsDER:boolean;
    masterCompanyId:number;
    CreatedBy: any = "admin";
    UpdatedBy: any = "admin";
    IsActive: boolean = true;
    IsDeleted: boolean = false;
    WorkOrderQuoteLaborHeader:
        {
          WorkOrderQuoteLaborHeaderId:number;
          WorkOrderQuoteDetailsId:number;
          DataEnteredBy:number;
          HoursorClockorScan:number;
          IsTaskCompletedByOne:boolean;
          WorkOrderHoursType:number;
          LabourMemo:string;
          EmployeeId:number;
          ExpertiseId:number;
          TotalWorkHours:number;
          masterCompanyId:number;
          CreatedBy: string;
          UpdatedBy: string;
          IsActive: boolean;
          IsDeleted: boolean;
          WorkOrderQuoteLabor:any[]
        }	;	

        constructor(){
          this.WorkOrderQuoteDetailsId = 0;
          this.WorkOrderQuoteId = 0;
          this.ItemMasterId = 0;
          this.BuildMethodId = 1;
          this.SelectedId = 0;
          this.ReferenceNo = "";
          this.EstCompDate = new Date()
          this.StageId = 0;
          this.StatusId = 0;
          this.CMMId = 0;
          this.IsPMA = true;
          this.IsDER = true;
          this.masterCompanyId = 0;
          this.CreatedBy = 'admin'
          this.UpdatedBy = 'admin'
          this.IsActive = true;
          this.IsDeleted = false;
          this.WorkOrderQuoteLaborHeader = {
            WorkOrderQuoteLaborHeaderId:0,
            WorkOrderQuoteDetailsId:0,
            DataEnteredBy:0,
            HoursorClockorScan:0,
            IsTaskCompletedByOne:true,
            WorkOrderHoursType:0,
            LabourMemo:'',
            EmployeeId:0,
            ExpertiseId:0,
            TotalWorkHours:0,
            masterCompanyId:0,
            CreatedBy: 'admin',
            UpdatedBy: 'admin',
            IsActive: true,
            IsDeleted: false,
            WorkOrderQuoteLabor:[]
          };
        }
}
