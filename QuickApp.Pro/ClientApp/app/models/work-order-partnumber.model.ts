export class WorkOrderPartNumber {


    constructor() {
        this.iD = 0;
        this.description = '',
            this.workOrderId = 0;
        this.itemMasterId = 0;
        this.workOrderScopeId = 0;
        this.nTE = "";
        this.quantity = 0;
        this.stockLineId = 0;
        this.cMMId = 0;
        this.workflowId = 0;
        this.workOrderStageId = 0;
        this.workOrderStatusId = 0;
        this.workOrderPriorityId = 0;
        this.customerRequestDate = new Date();
        this.promisedDate = new Date();
        this.estimatedCompletionDate = new Date();
        this.estimatedShipDate = new Date();
        this.isPMA = false;
        this.isDER = false;
        this.technicianName = "";
        this.techStationId = 0;
        this.tearDownReport = 0;
        this.tATDaysStandard = 0;
        this.masterCompanyId = 1;
        this.createdBy = "Admin";
        this.updatedBy = "";
        this.createdDate = new Date();
        this.updatedDate = new Date();
        this.isActive = true;
        this.isDelete = false;

    }


    public iD: number;
    public description: string
    public workOrderId: number;
    public itemMasterId: number;
    public workOrderScopeId: number;
    public nTE: string;
    public quantity: number
    public stockLineId: number;
    public cMMId: number;
    public workflowId: number;
    public workOrderStageId: number;
    public workOrderStatusId: number;
    public workOrderPriorityId: number;
    public customerRequestDate: Date;
    public promisedDate: Date;
    public estimatedCompletionDate: Date;
    public estimatedShipDate: Date;
    public isPMA: boolean;
    public isDER: boolean;
    public technicianName: string;
    public techStationId: number;
    public tearDownReport: number;
    public tATDaysStandard: number
    public masterCompanyId: number
    public createdBy: string;
    public updatedBy: string;
    public createdDate: Date;
    public updatedDate: Date;
    public isActive: boolean;
    public isDelete: boolean;
}