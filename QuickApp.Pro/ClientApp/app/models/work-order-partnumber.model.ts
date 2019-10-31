export class WorkOrderPartNumber {


    constructor() {
        this.workOrderScopeId = 0;
        this.promisedDate = new Date();
        this.estimatedShipDate = new Date();
        this.customerRequestDate = new Date();
        this.estimatedCompletionDate = new Date();
        this.nTE = '';
        this.quantity = 1;
        this.stockLineId = 0;
        this.cMMId = 0;
        this.workflowId = 0;
        this.workOrderStageId = 0;
        this.workOrderStatusId = 0;
        this.workOrderPriorityId = 0;
        this.isPMA = false;
        this.isDER = false;
        this.techStationId = 0;
        this.tearDownReport = 0;
        this.tATDaysStandard = 0;
        this.technicianId = 0;
        this.mappingItemMasterId = 0;
        this.conditionId = 0;
        this.masterPartId = 0;
        this.stockLineNumber = '';
        this.isActive = true;
        this.isDelete = false;
        this.updatedDate = new Date();
        this.createdDate = new Date();

    }

    updatedDate : Date;
    createdDate : Date;
    isActive: boolean
    isDelete: boolean
    stockLineNumber: string;
    masterPartId: number;
    workOrderScopeId: number;
    promisedDate: Date;
    estimatedShipDate: Date;
    customerRequestDate: Date;
    estimatedCompletionDate: Date;
    nTE: string;
    quantity: number;
    stockLineId: number;
    cMMId: number;
    workflowId: number;
    workOrderStageId: number;
    workOrderStatusId: number;
    workOrderPriorityId: number;
    isPMA: boolean;
    isDER: boolean;
    techStationId: number;
    tearDownReport: number;
    tATDaysStandard: number;
    technicianId: number;
    mappingItemMasterId: number;
    conditionId: number;
}