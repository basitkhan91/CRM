import { Component, Input, OnChanges, OnInit, EventEmitter, Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { ActionService } from "../Workflow/ActionService"
import { ICharges } from "../Workflow/Charges";
import { IChargesCurrency } from "../Workflow/ChargesCurrency";
import { IChargesType } from "../Workflow/ChargesType";
import { CurrencyService } from "../services/currency.service";
import { VendorService } from "../services/vendor.service";
@Component({
    selector: 'grd-charges',
    templateUrl: './Charges-Create.component.html',
    styleUrls: ['./Charges-Create.component.css']
})
export class ChargesCreateComponent implements OnInit, OnChanges {
    VendorCodesColl: any[] = [];
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
    constructor(private vendorservice: VendorService, private actionService: ActionService, private currencyService: CurrencyService) {
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
    }

    ngOnChanges(): void {

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


    private loadData() {
        this.vendorservice.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0])
        );


    }
    private onDataLoadSuccessful(allWorkFlows: any[]) {
        this.allActions = allWorkFlows;
    }

    onVendorCodeselected(event) {
        for (let i = 0; i < this.VendorCodesColl.length; i++) {
            if (event == this.VendorCodesColl[i][0].vendorCode) {

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
        newRow.vendorName = "";
        newRow.workflowChargeTypeId = "";
        newRow.isDelete = false;
        this.workFlow.charges.push(newRow);
    }

    deleteRow(index): void {
        if (this.workFlow.charges[index].workflowChargesListId == "0" || this.workFlow.charges[index].workflowChargesListId == "") {
            this.workFlow.charges.splice(index, 1);
        }
        else {
            this.workFlow.exclusions[index].isDelete = true;
        }
    }

}