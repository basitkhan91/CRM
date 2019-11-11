export class WorkOrderPartNumber {


    constructor() {
        this.workOrderScopeId = 0;
        this.promisedDate = '';
        this.estimatedShipDate = '';
        this.customerRequestDate = '';
        this.estimatedCompletionDate = '';
        this.nTE = '';
        this.quantity = 1;
        this.stockLineId = 0;
        this.cMMId = 0;
        this.workflowId = 0;
        this.workOrderStageId = 1;
        this.workOrderStatusId = 1;
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

    updatedDate: Date;
    createdDate: Date;
    isActive: boolean
    isDelete: boolean
    stockLineNumber: string;
    masterPartId: any;
    workOrderScopeId: number;
    promisedDate: string;
    estimatedShipDate: string;
    customerRequestDate: string;
    estimatedCompletionDate: string;
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