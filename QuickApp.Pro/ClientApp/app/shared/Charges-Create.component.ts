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
    vendorCollection: any[] = [];
    ccRegex: RegExp = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
    vendorCodes: any[] = [];
    allVendors: any[] = [];
    @Input() workFlow: IWorkFlow;
    @Input() UpdateMode: boolean;

    @Output() notify: EventEmitter<IWorkFlow> =
        new EventEmitter<IWorkFlow>();

    chargesTypes: any[] = [];
    chargesCurrency: any[] = [];
    row: any;

    errorMessage: string;


    currentPage: number = 1;
    itemsPerPage: number = 10;
    constructor(private vendorservice: VendorService, private actionService: ActionService, private currencyService: CurrencyService, private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.row = this.workFlow.charges[0];
        if (this.row == undefined) {
            this.row = {};
        }
        this.row.taskId = this.workFlow.taskId;
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

        this.loadAllVendors();

        if (this.UpdateMode) {
            this.reCalculate();
        }

    }

    ngOnChanges(): void {

    }

    reCalculate() {
        this.calculateQtySummation();
        this.calculateExtendedCostSummation();
        this.calculateExtendedPriceSummation();
    }

    filterVendor(event) {
        this.vendorCollection = this.allVendors.filter(x => {
            if (x.vendorName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                return x;
            }
        });
    }

    onChargeTypeChange(event, charge): void {
        var isTypeExist = this.workFlow.charges.filter(x => x.workflowChargeTypeId == charge.workflowChargeTypeId && x.taskId == this.workFlow.taskId);
        if (isTypeExist.length > 1) {
            event.target.value = '0';
            charge.workflowChargeTypeId = "0";
            this.alertService.showMessage("Work Flow", "Type is already in use in Charges List.", MessageSeverity.error);

        }
    }

    private loadAllVendors() {
        this.vendorservice.getVendorsForDropdown().subscribe(
            results => {
                this.allVendors = results;
                if (this.UpdateMode) {
                    for (var charge of this.workFlow.charges) {
                        var vendor = this.allVendors.filter(x => x.vendorId == charge.vendorId)[0];
                        if (vendor != undefined) {
                            charge.vendor = {
                                vendorId: vendor.vendorId,
                                vendorName: vendor.vendorName
                            };
                        }
                    }
                }
            }
        );
    }

    onVendorSelected(charge, event) {
        if (charge.vendor != undefined) {
            charge.vendorId = charge.vendor.vendorId;
            charge.vendorName = charge.vendor.vendorName;
        }
        else {
            charge.vendorId = '';
            charge.vendorName = '';
        }
    }

    addRow(): void {
        var newRow = Object.assign({}, this.row);
        newRow.workflowChargesListId = "0";
        newRow.vendor = {};
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
        newRow.workflowChargeTypeId = "0";
        newRow.isDelete = false;
        this.workFlow.charges.push(newRow);
    }

    // calculate row wise extended cost
    calculateExtendedCost(charge): void {
        var value = Number.parseFloat(charge.quantity) * Number.parseFloat(charge.unitCost);
        if (value > 0) {
            charge.extendedCost = value;

        }
        else {
            charge.extendedCost = "";
        }
        this.calculateExtendedCostSummation();
    }
    // calculate row wise extended price
    calculateExtendedPrice(charge) {
        var value = Number.parseFloat(charge.quantity) * Number.parseFloat(charge.unitPrice);
        if (value > 0) {
            charge.extendedPrice = value;
        }
        else {
            charge.extendedPrice = "";
        }
        this.calculateExtendedPriceSummation();
    }

    // sum of the qty
    calculateQtySummation() {
        var charges = this.workFlow.charges.filter(x => x.isDelete != true);
        this.workFlow.qtySummation = charges.reduce((acc, x) => {
            return acc + parseFloat(x.quantity == undefined || x.quantity === '' ? 0 : x.quantity)
        }, 0);

    }

    // sum of extended cost 
    calculateExtendedCostSummation() {
        var charges = this.workFlow.charges.filter(x => x.isDelete != true);
        this.workFlow.extendedCostSummation = charges.reduce((acc, x) => {
            return acc + parseFloat(x.extendedCost == undefined || x.extendedCost === '' ? 0 : x.extendedCost)
        }, 0);
        //this.workFlow.totalChargesCost = this.workFlow.extendedCostSummation;
    }

    // sum of extended price
    calculateExtendedPriceSummation() {
        var charges = this.workFlow.charges.filter(x => x.isDelete != true);
        this.workFlow.totalChargesCost = charges.reduce((acc, x) => {
            return acc + parseFloat(x.extendedPrice == undefined || x.extendedPrice === '' ? 0 : x.extendedPrice)
        }, 0);
    }


    deleteRow(index): void {
        if (this.workFlow.charges[index].workflowChargesListId == undefined || this.workFlow.charges[index].workflowChargesListId == "0" || this.workFlow.charges[index].workflowChargesListId == "") {
            this.workFlow.charges.splice(index, 1);
        }
        else {
            this.workFlow.charges[index].isDelete = true;
        }
        this.reCalculate();
    }

}