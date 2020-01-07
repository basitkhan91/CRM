

export class Freight{

    carrierId: null;
    shipViaId: null;
    length: string;
    width : string;
    height : string;
    weight : string;
    memo : string;
    amount: null;
    isFixedFreight: boolean
    fixedAmount:null;
    constructor(){
        this.carrierId =  null;
        this.shipViaId = null;
        this.length = '';
        this.width = ''
        this.height = ''
        this.weight = ''
        this.memo = ''
        this.amount = null;
        this.isFixedFreight = false;
        this.fixedAmount =null;
    }

}