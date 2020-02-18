

export class Freight {
    taskId: number;
    carrierId: number;
    shipViaId: null;
    length: string;
    width: string;
    height: string;
    weight: string;
    memo: string;
    amount: number;
    isFixedFreight: boolean;
    fixedAmount: number;
    constructor() {
        this.taskId = null;
        this.carrierId = null;
        this.shipViaId = null;
        this.length = '';
        this.width = ''
        this.height = ''
        this.weight = ''
        this.memo = ''
        this.amount = null;
        this.isFixedFreight = false;
        this.fixedAmount = null;
    }

}