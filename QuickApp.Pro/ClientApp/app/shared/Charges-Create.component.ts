import { Component, Input, OnChanges, OnInit, EventEmitter, Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { ActionService } from "../Workflow/ActionService"
import { ICharges } from "../Workflow/Charges";
import { IChargesCurrency } from "../Workflow/ChargesCurrency";
import { IChargesType } from "../Workflow/ChargesType";
import { CurrencyService } from "../services/currency.service";
import { VendorService } from "../services/vendor.service";
import { AlertService, MessageSeverity } from "../services/alert.service";

@Component({
    selector: 'grd-charges',
    templateUrl: './Charges-Create.component.html',
    styleUrls: ['./Charges-Create.component.css']
})
export class ChargesCreateComponent implements OnInit, OnChanges {
    VendorCodesColl: any[] = [];
    ccRegex: RegExp = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
    vendorCodes: any[] = [];
    allActions: any[] = [];
    @Input() workFlow: IWorkFlow;
    @Input() UpdateMode: boolean;

    @Output() notify: EventEmitter<IWorkFlow> =
        new EventEmitter<IWorkFlow>();

    chargesTypes: any[] = [];
    chargesCurrency: any[] = [];
    row: any;
   
    errorMessage: string;
    qtySummation: number = 0;
    extendedCostSummation: number = 0;
 
    currentPage : number = 1;
    itemsPerPage : number = 10;
    constructor(private vendorservice: VendorService, private actionService: ActionService, private currencyService: CurrencyService, private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.row = this.workFlow.charges[0];
        this.actionService.getChargesType().subscribe(
            chargesTypes => {
                this.chargesTypes = chargesTypes;
            },
            error => this.errorMessage = <any>error
        );

        this.currencyService.getCurrencyList().subscribe(
            chargesCurrencies => {
                this.chargesCurrency = chargesCurrencies[0];
            },
            error => this.errorMessage = <any>error
        );
        this.loadData();

         // summation of all values in edit mode 
        if(this.UpdateMode){
            this.reCalculate();

        }
    }

    ngOnChanges(): void {

    }
   reCalculate(){
    this.calculateQtySummation();
    this.calculateExtendedCostSummation();
    this.calculateExtendedPriceSummation();
   }

    filterVendorCodes(event) {

        this.vendorCodes = [];
        for (let i = 0; i < this.allActions.length; i++) {
            let vendorCode = this.allActions[i].vendorCode;

            if (vendorCode.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.VendorCodesColl.push([{
                    "vendorId": this.allActions[i].vendorClassificationId,
                    "vendorCode": vendorCode
                }]);
                this.vendorCodes.push(vendorCode);

            }
        }
    }

    onChargeTypeChange(charge): void {
        var isTypeExist = this.workFlow.charges.filter(x => x.workflowChargeTypeId == charge.workflowChargeTypeId && x.taskId == this.workFlow.taskId);
        if (isTypeExist.length > 1) {
            charge.workflowChargeTypeId = "";
            this.alertService.showMessage("Workflow", "Type is already in use in Charges List.", MessageSeverity.error);
        }
    }

    private loadData() {
        this.vendorservice.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0])
        );


    }
    private onDataLoadSuccessful(allWorkFlows: any[]) {
        this.allActions = allWorkFlows;
    }

    onVendorCodeselected(charge, event) {
        for (let i = 0; i < this.VendorCodesColl.length; i++) {
            if (event == this.VendorCodesColl[i][0].vendorCode) {
                charge.vendorName = this.VendorCodesColl[i][0].vendorCode;
                charge.vendorId = this.VendorCodesColl[i][0].vendorId;
            }
        }
    }

    addRow(): void {
        var newRow = Object.assign({}, this.row);
        newRow.workflowChargesListId = "0";
        newRow.taskId = this.workFlow.taskId;
        newRow.currencyId = "0";
        newRow.description = "";
        newRow.extendedCost = "";
        newRow.extendedPrice = "";
        newRow.forexRate = "";
        newRow.quantity = "";
        newRow.unitCost = "";
        newRow.unitPrice = "";
        newRow.vendorUnitPrice = "";
        newRow.vendorId = "";
        newRow.vendorName = "";
        newRow.workflowChargeTypeId = "";
        newRow.isDelete = false;
        this.workFlow.charges.push(newRow);
    }

    // calculate row wise extended cost
    calculateExtendedCost(charge): void {
        var value = Number.parseFloat(charge.quantity) * Number.parseFloat(charge.unitCost);
        if (value > 0) {
            charge.extendedCost = value;
            this.calculateExtendedCostSummation();
        }
        else {
            charge.extendedCost = "";
        }

    }
     // calculate row wise extended price
    calculateExtendedPrice(charge){
        var value = Number.parseFloat(charge.quantity) * Number.parseFloat(charge.unitPrice);
        if (value > 0) {
            charge.extendedPrice = value;
            this.calculateExtendedPriceSummation()
        }
        else {
            charge.extendedPrice = "";
        }
    }
    
    // sum of the qty
    calculateQtySummation(){
        this.qtySummation = this.workFlow.charges.reduce((acc, x) => {
            return acc + parseFloat(x.quantity == undefined || x.quantity === '' ? 0 : x.quantity)
        }, 0);

    }

    // sum of extended cost 
    calculateExtendedCostSummation(){
        this.extendedCostSummation = this.workFlow.charges.reduce((acc, x) => {
            return acc + parseFloat(x.extendedCost == undefined || x.extendedCost === '' ? 0 : x.extendedCost)
        }, 0);
        this.workFlow.totalChargesCost = this.extendedCostSummation;
    }
    // sum of extended price
    calculateExtendedPriceSummation(){
        this.workFlow.totalChargesCost = this.workFlow.charges.reduce((acc, x) => {
            return acc + parseFloat(x.extendedPrice == undefined || x.extendedPrice === '' ? 0 : x.extendedPrice)
        }, 0);
    }

 // Unused Function in both ts and html 
    // calculateTotalCostCharges(): void {
    //     this.workFlow.totalChargesCost = 0;
    //     for (let charge of this.workFlow.charges) {
    //         var value = charge.extendedCost;
    //         if (value > 0) {
    //             this.workFlow.totalChargesCost += value;
    //         }
    //         else {
    //             this.workFlow.totalChargesCost = 0;
    //         }
    //     }
    // }

    deleteRow(index): void {
        if (this.workFlow.charges[index].workflowChargesListId == "0" || this.workFlow.charges[index].workflowChargesListId == "") {
            this.workFlow.charges.splice(index, 1);
        }
        else {
            this.workFlow.charges[index].isDelete = true;
        }
        this.reCalculate();
    }

}