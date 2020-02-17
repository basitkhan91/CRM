export class WorkOrderPartNumber {


    constructor() {
        this.workOrderScopeId = null;
        this.promisedDate = '';
        this.estimatedShipDate = '';
        this.customerRequestDate = '';
        this.estimatedCompletionDate = '';
        this.customerReference = null;
        this.nte = '';
        this.quantity = 1;
        this.stockLineId = null;
        this.cmmId = 0;
        this.workflowId = 0;
        this.workOrderStageId = 1;
        this.workOrderStatusId = 1;
        this.workOrderPriorityId = 1;
        this.isPMA = false;
        this.isDER = false;
        this.techStationId = 0;
        this.tearDownReport = 0;
        this.tatDaysStandard = 0;
        this.tatDaysCurrent = 0;
        this.technicianId = 0;
        this.mappingItemMasterId = null;
        this.conditionId = null;
        this.masterPartId = null;
        this.stockLineNumber = '';
        this.isActive = true;
        this.isDelete = false;
        this.updatedDate = new Date();
        this.createdDate = new Date();
        this.receivingDate = '';

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
    customerReference: number;
    nte: string;
    quantity: number;
    stockLineId: number;
    cmmId: number;
    workflowId: number;
    workOrderStageId: number;
    workOrderStatusId: number;
    workOrderPriorityId: number;
    isPMA: boolean;
    isDER: boolean;
    techStationId: number;
    tearDownReport: number;
    tatDaysCurrent: number;
    tatDaysStandard: number;
    technicianId: number;
    mappingItemMasterId: number;
    conditionId: number;
    receivingDate: string;
}