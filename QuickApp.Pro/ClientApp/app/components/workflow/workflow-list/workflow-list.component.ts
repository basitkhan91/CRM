import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatIcon } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { fadeInOut } from '../../../services/animations';
import { AuthService } from '../../../services/auth.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { WorkFlowtService } from '../../../services/workflow.service';
import { ActionService } from '../../../Workflow/ActionService';
import { CustomerService } from '../../../services/customer.service';
import { CurrencyService } from '../../../services/currency.service';
import { ItemMasterService } from '../../../services/itemMaster.service';
import { AssetService } from '../../../services/asset/Assetservice';
import { VendorService } from '../../../services/vendor.service';
import { ConditionService } from '../../../services/condition.service';
import { UnitOfMeasureService } from '../../../services/unitofmeasure.service';
import { ItemClassificationService } from '../../../services/item-classfication.service';
import { AircraftManufacturerService } from '../../../services/aircraft-manufacturer/aircraftManufacturer.service';
import { AircraftModelService } from '../../../services/aircraft-model/aircraft-model.service';
import { DashNumberService } from '../../../services/dash-number/dash-number.service';
import { PublicationService } from '../../../services/publication.service';

@Component({
    selector: 'app-workflow-list',
    templateUrl: './workflow-list.component.html',
    styleUrls: ['./workflow-list.component.scss'],
    animations: [fadeInOut]
})


export class WorkflowListComponent implements OnInit {
    sourceWorkFlow: any;
    title: string = "Work Flow";
    workFlowGridSource: MatTableDataSource<any>;
    gridColumns: any[];
    selectedGridColumn: any[];
    selectedGridColumns: any[];
    selectedWorflow: any[];
    workflowList: any[];
    modal: NgbModalRef;
    currentWorkflow: any;
    allCustomers: any[];
    allCurrencyData: any[];
    assets: any[];
    toggle_wf_header: boolean = false;
    displayAccord1: boolean = false;

    toggle_detailhistory: boolean = false;
    currentWFList: any;
    MaterialCost: number;
    TotalCharges: number;
    TotalExpertiseCost: number;
    Total: number;
    PercentBERThreshold: number;
    tasks: any[];
    addedTasks: any[];
    allParts: any[];
    expertiseTypes: any[];
    assetTypes: any[];
    chargesTypes: any[];
    vendors: any[];
    materialCondition: any[];
    materialUOM: any[];
    materialMandatory: any[];
    itemClassification: any[];
    publications: any[];
    allVendors: any[];

    constructor(private actionService: ActionService,
        private router: ActivatedRoute,
        private route: Router,
        private authService: AuthService,
        private modalService: NgbModal,
        private alertService: AlertService,
        public workFlowtService: WorkFlowtService,
        private customerService: CustomerService,
        private currencyService: CurrencyService,
        private itemMasterService: ItemMasterService,
        private assetService: AssetService,
        private vendorservice: VendorService,
        private conditionService: ConditionService,
        private unitofmeasureService: UnitOfMeasureService,
        private itemClassificationService: ItemClassificationService,
        private aircraftManufacturerService: AircraftManufacturerService,
        private aircraftmodelService: AircraftModelService,
        private dashNumberService: DashNumberService,
        private publicationService: PublicationService,
    ) {
        this.workFlowGridSource = new MatTableDataSource();
        this.workFlowtService.listCollection = null;
    }

    ngOnInit() {
        this.getAllWorkflows();
        this.getWorkFlowActions();
        this.LoadParts();
    }

    public allWorkFlows: any[] = [];

    private getAllWorkflows() {
        this.alertService.startLoadingMessage();
        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onWorkflowLoadSuccessful(results[0]),
            error => { }
        );

        this.gridColumns = [
            { field: 'workOrderNumber', header: 'Work Flow ID' },
            { field: 'partNumber', header: 'Part Number' },
            { field: 'partDescription', header: 'PN Description' },
            { field: 'description', header: 'Work Scope' },
            { field: 'name', header: 'Customer Name' },
            { field: 'workflowCreateDate', header: 'Created Date' },
            { field: 'workflowExpirationDate', header: 'Expiration Date' },

        ];

        this.selectedGridColumns = this.gridColumns;
    }

    public applyFilter(filterValue: string) {
        this.workFlowGridSource.filter = filterValue;
    }

    private refresh() {
        this.applyFilter(this.workFlowGridSource.filter);
    }

    private onWorkflowLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.workFlowGridSource.data = allWorkFlows;
        this.workflowList = allWorkFlows;
    }

    confirmDelete(confirmDeleteTemplate, rowData) {
        this.currentWorkflow = rowData;
        this.modal = this.modalService.open(confirmDeleteTemplate, { size: 'sm' });
    }

    removeWorkFlow(): void {
        this.actionService.RemoveWorkFlow(this.currentWorkflow.workflowId).subscribe(
            result => {
                this.alertService.showMessage(this.title, "ACC" + this.currentWorkflow.workflowId + ' deleted successfully.', MessageSeverity.success);
                this.getAllWorkflows();
            },
            error => {
                var message = '';
                if (error.error.constructor == Array) {
                    message = error.error[0].errorMessage;
                }
                else {
                    message = error.error.Message;
                }
                this.alertService.showMessage(this.title, message, MessageSeverity.error);
            });
        this.dismissModel();
    }

    toggleIsActive(workflow: any, event): void {
        this.actionService.toggleState(workflow.workflowId).subscribe(
            result => {
                this.alertService.showMessage(this.title, "Workflow updated successfully.", MessageSeverity.success);
            },
            error => {
                var message = '';
                if (error.error.constructor == Array) {
                    message = error.error[0].errorMessage;
                }
                else {
                    message = error.error.Message;
                }
                this.alertService.showMessage(this.title, message, MessageSeverity.error);
            }
        )

    }

    AddPage() {
        this.route.navigateByUrl('/workflowmodule/workflowpages/wf-create');
    }

    openEdit(row) {
        this.workFlowtService.listCollection = row;
        this.workFlowtService.enableUpdateMode = true;
        this.workFlowtService.currentWorkFlowId = row.workflowId;
        this.route.navigateByUrl('/workflowmodule/workflowpages/wf-create');
    }

    dismissModel() {
        if (this.modal != undefined)
            this.modal.close();
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    onOpenAll() {
        for (let task of this.addedTasks) {
            task.selected = true;
        }
    }

    onCloseAll() {
        for (let task of this.addedTasks) {
            task.selected = false;
        }
    }

    publicationTypes: any[];

    private loadPublicationTypes(): void {
        this.actionService.GetPublicationType().subscribe(
            type => {
                this.publicationTypes = type;
                for (var task of this.addedTasks) {
                    for (var publication of task.publication) {
                        var selectectedPublicationType = this.publicationTypes.filter(x => x.publicationTypeId == publication.publicationType);
                        if (selectectedPublicationType.length > 0) {
                            publication.publicationTypeName = selectectedPublicationType[0].name;
                        }
                    }
                }
            },
            error => {

            }
        );
    }

    onAccordTabClick1(task: any) {
        task.selected = !task.selected;
    }

    onViewWFDetails(rowData): void {
        this.sourceWorkFlow = undefined;
        this.actionService.getWorkFlow(rowData.workflowId).subscribe(
            workflow => {
                this.sourceWorkFlow = workflow[0];
                var part = this.allParts.filter(x => x.itemMasterId == rowData.changedPartNumberId)[0];
                this.sourceWorkFlow.changedPartNumber = part != undefined ? part.partNumber : '';
                this.sourceWorkFlow.workflowCreateDate = new Date(this.sourceWorkFlow.workflowCreateDate).toLocaleDateString();
                this.sourceWorkFlow.workflowExpirationDate = this.sourceWorkFlow.workflowExpirationDate != null && this.sourceWorkFlow.workflowExpirationDate != '' ? new Date(this.sourceWorkFlow.workflowExpirationDate).toLocaleDateString() : '';

                this.calculatePercentOfNew(workflow[0].costOfNew, workflow[0].percentageOfNew);
                this.calculatePercentOfReplacement(workflow[0].costOfReplacement, workflow[0].percentageOfReplacement);
                this.loadcustomerData();
                this.loadCurrencyData();
                this.calculateTotalWorkFlowCost();
                this.getAllTasks();

            },
            error => {
            });
    }

    onViewMaterialList(rowData): void {
        this.sourceWorkFlow = undefined;
        this.actionService.getWorkFlowWithMaterialList(rowData.workflowId).subscribe(
            workflow => {
                this.sourceWorkFlow = workflow[0];
                this.calculateWorkFlowTotalMaterialCost();
                this.getAllTasks();
            },
            error => {
            });
    }

    getWorkFlowActions() {
        this.workFlowtService.getWorkFlowMaterial().subscribe(
            results => { },
            error => { }
        );
    }

    private setPublicationData(selectedPublication: any, row: any) {
        if (selectedPublication != null) {
            row.publicationName = selectedPublication.publicationId;
            row.publicationDescription = selectedPublication.description != null ? selectedPublication.description : '';
            row.revisionDate = selectedPublication.revisionDate != null ? new Date(selectedPublication.revisionDate).toLocaleDateString() : '';
            row.publicationType = selectedPublication.publicationTypeId != null ? selectedPublication.publicationTypeId : '';
            row.sequence = selectedPublication.sequence != null ? selectedPublication.sequence : '';
            row.itemMasterAircraftMapping = selectedPublication.itemMasterAircraftMapping;
            row.source = selectedPublication.asd != null ? selectedPublication.asd : '';
            row.location = selectedPublication.location != null ? selectedPublication.location : '';
            row.verifiedBy = selectedPublication.verifiedBy != null ? selectedPublication.verifiedBy : '';
            row.status = selectedPublication.isActive != null ? selectedPublication.isActive : '';
            row.verifiedDate = selectedPublication.verifiedDate != undefined ? new Date(selectedPublication.verifiedDate).toLocaleDateString() : '';
            row.attachmentURL = selectedPublication.attachmentDetails != null ? selectedPublication.attachmentDetails.link : '';
        }
        else {
            row.publicationDescription = '';
            row.revisionDate = '';
            row.publicationType = 0;
            row.sequence = '';
            row.source = '';
            row.location = '';
            row.verifiedBy = '';
            row.status = 0;
            row.verifiedDate = '';
            row.attachmentURL = '';
        }
    }

    private loadcustomerData() {
        this.customerService.getWorkFlows().subscribe(data => {
            this.allCustomers = data[0];
            var selectectedCustomer = this.allCustomers.filter(x => x.customerId == this.sourceWorkFlow.customerId);
            if (selectectedCustomer.length > 0) {
                this.sourceWorkFlow.customerName = selectectedCustomer[0].name;
            }

        });
    }

    private calculatePercentOfNew(myValue, percentValue) {
        this.sourceWorkFlow.percentOfNew = "";
        if (myValue && percentValue) {
            this.sourceWorkFlow.percentOfNew = (myValue / 100) * percentValue;
        }
        this.berDetermination();
    }

    private calculatePercentOfReplacement(myValue, percentValue) {
        this.sourceWorkFlow.percentOfReplacement = "";
        if (myValue && percentValue) {
            let afterpercent = myValue / 100;
            this.sourceWorkFlow.percentOfReplacement = afterpercent * percentValue;

        }
        this.berDetermination();
    }

    private berDetermination(): any {
        if (this.sourceWorkFlow.fixedAmount !== undefined) {
            this.sourceWorkFlow.berThresholdAmount = this.sourceWorkFlow.fixedAmount;
        }
        // check on is percentOfNew enable
        if (this.sourceWorkFlow.percentOfNew !== undefined) {
            this.sourceWorkFlow.berThresholdAmount = this.sourceWorkFlow.percentOfNew;
        }
        // check on is .percentOfReplacement enable
        if (this.sourceWorkFlow.percentOfReplacement !== undefined) {
            this.sourceWorkFlow.berThresholdAmount = this.sourceWorkFlow.percentOfReplacement;
        }


        // 1 and 2 check box 
        if (this.sourceWorkFlow.fixedAmount !== undefined && this.sourceWorkFlow.percentOfNew !== undefined) {
            this.sourceWorkFlow.berThresholdAmount = Math.min(this.sourceWorkFlow.fixedAmount, this.sourceWorkFlow.percentOfNew);
        }

        // 2 and 3  check box 
        if (this.sourceWorkFlow.percentOfNew !== undefined && this.sourceWorkFlow.percentOfReplacement !== undefined) {
            this.sourceWorkFlow.berThresholdAmount = Math.min(this.sourceWorkFlow.percentOfNew, this.sourceWorkFlow.percentOfReplacement);
        }
        // 1 and 3  check box 
        if (this.sourceWorkFlow.fixedAmount !== undefined && this.sourceWorkFlow.percentOfReplacement !== undefined) {
            this.sourceWorkFlow.berThresholdAmount = Math.min(this.sourceWorkFlow.fixedAmount, this.sourceWorkFlow.percentOfReplacement);
        }


        //1 and 2 and 3 check box
        if (this.sourceWorkFlow.fixedAmount !== undefined && this.sourceWorkFlow.percentOfNew !== undefined && this.sourceWorkFlow.percentOfReplacement !== undefined) {
            this.sourceWorkFlow.berThresholdAmount = Math.min(this.sourceWorkFlow.fixedAmount, this.sourceWorkFlow.percentOfNew, this.sourceWorkFlow.percentOfReplacement);
        }
        //1 and 2 and 3 check box all uncheck 
        if (this.sourceWorkFlow.fixedAmount == undefined && this.sourceWorkFlow.percentOfNew == undefined && this.sourceWorkFlow.percentOfReplacement == undefined) {
            this.sourceWorkFlow.berThresholdAmount = 0;
        }
    }

    private loadCurrencyData() {
        this.currencyService.getCurrencyList().subscribe(currencydata => {
            this.allCurrencyData = currencydata[0];

            var selectectedCurrency = this.allCurrencyData.filter(x => x.currencyId == this.sourceWorkFlow.currencyId);
            if (selectectedCurrency.length > 0) {
                this.sourceWorkFlow.currencySymbol = selectectedCurrency[0].symbol;
                this.sourceWorkFlow.currencyText = selectectedCurrency[0].displayName;
            }
        })
    }

    private calculateTotalWorkFlowCost(): void {
        this.MaterialCost = 0;
        this.TotalCharges = 0;
        this.TotalExpertiseCost = 0;

        for (let charges of this.sourceWorkFlow.charges) {
            this.TotalCharges += charges.extendedCost != undefined ? charges.extendedCost : 0;
        }

        for (let material of this.sourceWorkFlow.materialList) {
            this.MaterialCost += material.extendedCost != undefined ? material.extendedCost : 0;
        }

        for (let expertise of this.sourceWorkFlow.expertise) {
            this.TotalExpertiseCost += expertise.laborOverheadCost != undefined ? expertise.laborOverheadCost : 0;
        }

        this.TotalCharges = parseFloat((this.TotalCharges).toFixed(2));
        this.MaterialCost = parseFloat((this.MaterialCost).toFixed(2));
        this.TotalExpertiseCost = parseFloat((this.TotalExpertiseCost).toFixed(2));

        this.Total = parseFloat((this.MaterialCost + this.TotalCharges + this.TotalExpertiseCost + parseFloat(((this.sourceWorkFlow.otherCost == undefined || this.sourceWorkFlow.otherCost == '') ? 0 : this.sourceWorkFlow.otherCost).toFixed(2))).toFixed(2));

        if (this.sourceWorkFlow.berThresholdAmount != 0)
            this.PercentBERThreshold = parseFloat((this.Total / this.sourceWorkFlow.berThresholdAmount).toFixed(2));
    }

    private calculateWorkFlowTotalMaterialCost(): void {
        this.MaterialCost = 0;

        for (let material of this.sourceWorkFlow.materialList) {
            this.MaterialCost += material.extendedCost != undefined ? material.extendedCost : 0;
        }

        this.MaterialCost = parseFloat((this.MaterialCost).toFixed(2));
    }

    private getUniqueTask(): any[] {
        var tasks = [];

        var taskIds = [];
        if (this.sourceWorkFlow.charges.length > 0) {
            for (var item of this.sourceWorkFlow.charges) {
                if (taskIds.indexOf(item.taskId) == -1) {
                    var task = this.tasks.filter(x => x.Id == item.taskId);
                    if (task.length > 0) {
                        task[0].selected = false;
                        taskIds.push(task[0].Id);
                        tasks.push(task[0]);
                    }
                }
            }
        }
        if (this.sourceWorkFlow.directions.length > 0) {
            for (var item of this.sourceWorkFlow.directions) {
                if (taskIds.indexOf(item.taskId) == -1) {
                    var task = this.tasks.filter(x => x.Id == item.taskId);
                    if (task.length > 0) {
                        task[0].selected = false;
                        taskIds.push(task[0].Id);
                        tasks.push(task[0]);
                    }
                }
            }
        }
        if (this.sourceWorkFlow.equipments.length > 0) {
            for (var item of this.sourceWorkFlow.equipments) {
                if (taskIds.indexOf(item.taskId) == -1) {
                    var task = this.tasks.filter(x => x.Id == item.taskId);
                    if (task.length > 0) {
                        task[0].selected = false;
                        taskIds.push(task[0].Id);
                        tasks.push(task[0]);
                    }
                }
            }
        }
        if (this.sourceWorkFlow.exclusions.length > 0) {
            for (var item of this.sourceWorkFlow.exclusions) {
                if (taskIds.indexOf(item.taskId) == -1) {
                    var task = this.tasks.filter(x => x.Id == item.taskId);
                    if (task.length > 0) {
                        task[0].selected = false;
                        taskIds.push(task[0].Id);
                        tasks.push(task[0]);
                    }
                }
            }
        }
        if (this.sourceWorkFlow.expertise.length > 0) {
            for (var item of this.sourceWorkFlow.expertise) {
                if (taskIds.indexOf(item.taskId) == -1) {
                    var task = this.tasks.filter(x => x.Id == item.taskId);
                    if (task.length > 0) {
                        task[0].selected = false;
                        taskIds.push(task[0].Id);
                        tasks.push(task[0]);
                    }
                }
            }
        }
        if (this.sourceWorkFlow.materialList.length > 0) {
            for (var item of this.sourceWorkFlow.materialList) {
                if (taskIds.indexOf(item.taskId) == -1) {
                    var task = this.tasks.filter(x => x.Id == item.taskId);
                    if (task.length > 0) {
                        task[0].selected = false;
                        taskIds.push(task[0].Id);
                        tasks.push(task[0]);
                    }
                }
            }
        }
        if (this.sourceWorkFlow.measurements.length > 0) {
            for (var item of this.sourceWorkFlow.measurements) {
                if (taskIds.indexOf(item.taskId) == -1) {
                    var task = this.tasks.filter(x => x.Id == item.taskId);
                    if (task.length > 0) {
                        task[0].selected = false;
                        taskIds.push(task[0].Id);
                        tasks.push(task[0]);
                    }
                }
            }
        }
        if (this.sourceWorkFlow.publication.length > 0) {
            for (var item of this.sourceWorkFlow.publication) {
                if (taskIds.indexOf(item.taskId) == -1) {
                    var task = this.tasks.filter(x => x.Id == item.taskId);
                    if (task.length > 0) {
                        task[0].selected = false;
                        taskIds.push(task[0].Id);
                        tasks.push(task[0]);
                    }
                }
            }
        }

        return tasks;
    }

    private getAllTasks(): void {

        this.actionService.getActions().subscribe(
            actions => {
                this.tasks = [];
                for (let attr of actions) {
                    this.tasks.push({ Id: attr.taskId, Name: attr.description, Description: "", Memo: "" })
                }
                this.organiseTaskAndTaskAttributes();
                this.loadPublicationTypes();
            },
            error => { }
        );
    }

    private organiseTaskAndTaskAttributes() {
        this.addedTasks = this.getUniqueTask();
        for (let task of this.addedTasks) {

            var chargesTotalQty = 0;
            var chargesTotalExtendedCost = 0;
            var chargesTotalChargesCost = 0;

            task.charges = this.sourceWorkFlow.charges.filter(x => {
                if (x.taskId == task.Id) {
                    this.LoadChargesDropDownValues(x);
                    chargesTotalQty += x.quantity == undefined || x.quantity == '' ? 0 : x.quantity;
                    chargesTotalExtendedCost += x.extendedCost == undefined || x.extendedCost == '' ? 0 : x.extendedCost;
                    chargesTotalChargesCost += x.extendedPrice == undefined || x.extendedPrice == '' ? 0 : x.extendedPrice;
                }
                return x.taskId == task.Id
            });

            task.chargesTotalQty = chargesTotalQty;
            task.chargesTotalExtendedCost = chargesTotalExtendedCost;
            task.chargesTotalChargesCost = chargesTotalChargesCost;

            task.directions = this.sourceWorkFlow.directions.filter(x => {
                return x.taskId == task.Id
            });

            task.equipments = this.sourceWorkFlow.equipments.filter(x => {
                if (x.taskId == task.Id) {
                    this.LoadAllAsset(x);
                }
                return x.taskId == task.Id
            });

            var qty = 0;
            var extendedQty = 0
            task.exclusions = this.sourceWorkFlow.exclusions.filter(x => {
                if (x.taskId == task.Id) {
                    qty += x.quantity == undefined || x.quantity == '' ? 0 : x.quantity;
                    extendedQty += x.extendedCost == undefined || x.extendedCost == '' ? 0 : x.extendedCost;
                }
                return x.taskId == task.Id
            });
            task.exclusionQty = qty;
            task.exclusionextendedQty = extendedQty;

            var totalEstimatedHours = 0;
            var totalDirectLaborCost = 0;
            var totalOHCost = 0;
            var totalDirectLabourAndOHCost = 0;

            task.expertise = this.sourceWorkFlow.expertise.filter(x => {
                if (x.taskId == task.Id) {
                    this.LoadExpertise(x);
                    totalEstimatedHours += x.estimatedHours == undefined && x.estimatedHours == '' ? 0 : x.estimatedHours;
                    totalDirectLaborCost += x.directLaborRate == undefined && x.directLaborRate == '' ? 0 : x.directLaborRate;
                    totalOHCost += x.overheadCost == undefined && x.overheadCost == '' ? 0 : x.overheadCost;
                    totalDirectLabourAndOHCost += x.laborOverheadCost == undefined && x.laborOverheadCost == '' ? 0 : x.laborOverheadCost;
                }
                return x.taskId == task.Id;
            });

            task.expertiseTotalEstimatedHours = totalEstimatedHours;
            task.expertiseTotalDirectLaborCost = totalDirectLaborCost;
            task.expertiseTotalOHCost = totalOHCost;
            task.expertiseTotalDirectLabourAndOHCost = totalDirectLabourAndOHCost;

            var materialTotalQty = 0;
            var materialTotalExtendedCost = 0;
            var materialTotalPrice = 0;
            var materialTotalExtendedPrice = 0;

            task.materialList = this.sourceWorkFlow.materialList.filter(x => {
                if (x.taskId == task.Id) {
                    this.loadConditionData(x);
                    this.loadUOMData(x);
                    this.loadMaterialMandatoryData(x);
                    this.loadItemClassification(x);
                    materialTotalQty += x.quantity == undefined || x.quantity == '' ? 0 : x.quantity;
                    materialTotalExtendedCost += x.extendedCost == undefined || x.extendedCost == '' ? 0 : x.extendedCost;
                    materialTotalPrice += x.price == undefined || x.price == '' ? 0 : x.price;
                    materialTotalExtendedPrice += x.extendedPrice == undefined || x.extendedPrice == '' ? 0 : x.extendedPrice;
                }
                return x.taskId == task.Id;
            });

            task.materialTotalQty = materialTotalQty;
            task.materialTotalExtendedCost = materialTotalExtendedCost;
            task.materialTotalPrice = materialTotalPrice;
            task.materialTotalExtendedPrice = materialTotalExtendedPrice;

            task.measurements = this.sourceWorkFlow.measurements.filter(x => {
                this.setMeasurementDropdownText(x);
                return x.taskId == task.Id
            });

            task.publication = this.sourceWorkFlow.publication.filter(x => {
                return x.taskId == task.Id
            });

            for (var pub of task.publication) {
                if (pub.aircraftManufacturer != null && pub.aircraftManufacturer != '') {

                    this.aircraftManufacturerService.getById(pub.aircraftManufacturer).subscribe(
                        result => {
                            for (var task of this.addedTasks) {
                                for (var publication of task.publication) {
                                    if (publication.aircraftManufacturer == result[0][0].aircraftTypeId) {
                                        publication.aircraftManufacturerName = result[0][0].description;
                                    }
                                }
                            }
                        },
                        error => {

                        }
                    );

                    if (pub.model != null && pub.model != '') {
                        this.aircraftmodelService.getById(pub.model).subscribe(
                            result => {
                                for (var publication of task.publication) {
                                    if (publication.model == result[0][0].aircraftModelId) {
                                        publication.modelName = result[0][0].modelName;
                                    }
                                }
                            },
                            error => {

                            }
                        );

                        this.dashNumberService.getDashNumberByModelTypeId(pub.model.toString(), pub.aircraftManufacturer.toString()).subscribe((dashnumberValues) => {
                            for (var publication of task.publication) {
                                if (dashnumberValues.length > 0 && dashnumberValues[0].aircraftModelId == publication.model && dashnumberValues[0].aircraftTypeId == publication.aircraftManufacturer) {
                                    publication.allDashNumbers = '';

                                    for (var dashNum of dashnumberValues) {
                                        var workFlowDashNumber = publication.workflowPublicationDashNumbers.filter(x => x.aircraftDashNumberId == dashNum.dashNumberId);
                                        if (workFlowDashNumber.length > 0) {
                                            publication.allDashNumbers += dashNum.dashNumber.toString() + ', ';
                                        }
                                    }
                                }

                            }
                        });
                    }

                }

                if (this.publications != undefined) {
                    var selectedPublication = this.publications.filter(function (publication) {
                        return publication.publicationRecordId == pub.publicationId;
                    });
                    if (selectedPublication.length == 0) {
                        this.loadPublicationById(pub);
                    }
                    else {
                        this.setPublicationData(selectedPublication[0], pub);
                    }
                }
                else {
                    this.publications = [];
                    this.loadPublicationById(pub);
                }
            }
        }
    }

    private loadPublicationById(wfPublication: any) {
        this.publicationService.getPublicationForWorkFlow(wfPublication.publicationId).subscribe(
            result => {
                if (result[0] != undefined && result[0] != null) {
                    this.publications.push(result[0]);
                    this.setPublicationData(result[0], wfPublication);
                }
            }
        );
    }

    private setChargesTypeDropdownText(charge: any): void {
        var chargesType = this.chargesTypes.filter(x => x.id == charge.workflowChargeTypeId);
        if (chargesType.length > 0) {
            charge.chargesTypeName = chargesType[0].name;
        }
    }

    private setChargesVendorDropdownText(charge: any): void {
        var vendor = this.vendors.filter(x => x.vendorId == charge.vendorId)[0];
        if (vendor != undefined) {
            charge.vendorName = vendor != undefined ? vendor.vendorName : '';
        }
    }

    private setEquipmentAssetDropdownText(equipment: any): void {
        var asset = this.assets.filter(x => x.assetRecordId == equipment.assetId);
        if (asset.length > 0) {
            equipment.assetName = asset[0].assetId;
        }
    }

    private setEquipmentAssetTypeDropdownText(equipment: any): void {
        var assetType = this.assetTypes.filter(x => x.id == equipment.assetTypeId);
        if (assetType.length > 0) {
            equipment.assetTypeName = assetType[0].name;
        }
    }

    private setMeasurementDropdownText(measurement: any): void {
        var part = this.allParts.filter(x => x.itemMasterId == measurement.partNumber);
        if (part.length > 0) {
            measurement.PartName = part[0].partNumber;
        }
    }

    private setExpertiseDropdownText(expertise: any): void {
        var expertiseType = this.expertiseTypes.filter(x => x.expertiseTypeId == expertise.expertiseTypeId);
        if (expertiseType.length > 0) {
            expertise.expetiseTypeName = expertiseType[0].description;
        }
    }

    private setMaterialConditionDropdown(material: any): void {
        var condition = this.materialCondition.filter(x => x.conditionId == material.conditionCodeId);

        if (condition.length > 0) {
            material.conditionName = condition[0].description;
        }
    }

    private setMaterialUOMDropdownText(material): void {
        var uom = this.materialUOM.filter(x => x.unitOfMeasureId == material.unitOfMeasureId);

        if (uom.length > 0) {
            material.uomName = uom[0].description;
        }
    }

    private setMaterialMandatoryText(material): void {
        var mandatory = this.materialMandatory.filter(x => x.name == material.mandatoryOrSupplemental);
        if (mandatory.length > 0) {
            material.mandatoryOrSupplementalName = mandatory[0].name;
        }
    }

    private setMaterialItemClassificationName(material: any): void {
        var itemClassification = this.itemClassification.filter(x => x.itemClassificationId == material.itemClassificationId);
        if (itemClassification.length > 0) {
            material.itemClassificationName = itemClassification[0].description;
        }
    }

    private LoadParts(): void {
        this.itemMasterService.getPartDetailsDropdown().subscribe(
            results => {
                this.allParts = results;
            },
            error => { }
        );
    }

    private LoadAllAsset(equipment: any): void {
        if (this.assets == undefined || this.assets.length == 0) {
            this.assetService.getAllAssetList().subscribe(results => {
                this.assets = results[0];
                this.setEquipmentAssetDropdownText(equipment);
            });
        }
        else {
            this.setEquipmentAssetDropdownText(equipment);
        }

        if (this.assetTypes == undefined || this.assetTypes.length == 0) {
            this.actionService.getEquipmentAssetType().subscribe(
                allAssetTypes => {
                    this.assetTypes = allAssetTypes;
                    this.setEquipmentAssetTypeDropdownText(equipment);
                },
                error => {
                }
            );
        }
        else {
            this.setEquipmentAssetTypeDropdownText(equipment);
        }
    }

    private LoadExpertise(expertise: any): void {
        if (this.expertiseTypes == undefined || this.expertiseTypes.length == 0) {
            this.actionService.GetExpertiseType().subscribe(
                expertiseTypes => {
                    this.expertiseTypes = expertiseTypes;
                    this.setExpertiseDropdownText(expertise);
                },
                error => { }
            );
        }
        else {
            this.setExpertiseDropdownText(expertise);
        }

    }

    private LoadChargesDropDownValues(charges: any): void {
        if (this.chargesTypes == undefined || this.chargesTypes.length == 0) {
            this.actionService.getChargesType().subscribe(
                chargesTypes => {
                    this.chargesTypes = chargesTypes;
                    this.setChargesTypeDropdownText(charges);
                }
                ,
                error => {
                }
            );
        }
        else {
            this.setChargesTypeDropdownText(charges);
        }
        if (this.vendors == undefined || this.vendors.length == 0) {
            this.vendorservice.getWorkFlows().subscribe(
                results => {
                    this.vendors = results[0];
                    this.setChargesVendorDropdownText(charges);
                },
                error => {

                }
            );
        }
        else {
            this.setChargesVendorDropdownText(charges);
        }
    }

    private loadConditionData(material: any) {
        if (this.materialCondition == undefined || this.materialCondition.length == 0) {
            this.conditionService.getConditionList().subscribe(data => {
                this.materialCondition = data[0];
                this.setMaterialConditionDropdown(material);
            });
        }
        else {
            this.setMaterialConditionDropdown(material);
        }
    }

    private loadUOMData(material: any): void {
        if (this.materialUOM == undefined || this.materialUOM.length == 0) {
            this.unitofmeasureService.getUnitOfMeasureList().subscribe(uomdata => {
                this.materialUOM = uomdata[0];
                this.setMaterialUOMDropdownText(material);
            });
        }
        else {
            this.setMaterialUOMDropdownText(material);
        }
    }

    private loadMaterialMandatoryData(material: any) {
        if (this.materialMandatory == undefined || this.materialMandatory.length == 0) {
            this.actionService.GetMaterialMandatory().subscribe(
                mandatory => {
                    this.materialMandatory = mandatory;
                    this.setMaterialMandatoryText(material);
                },
                error => {
                }
            );
        }
        else {
            this.setMaterialMandatoryText(material);
        }
    }

    private loadItemClassification(material: any) {
        if (this.itemClassification == undefined || this.itemClassification.length == 0) {
            this.itemClassificationService.getWorkFlows().subscribe(result => {
                this.itemClassification = result[0];
                this.setMaterialItemClassificationName(material);
            });
        }
        else {
            this.setMaterialItemClassificationName(material);
        }

    }

    private loadDashNumberByManfacturerandModel(publication: any, airCraftTypeId: number, aircraftModelId: number) {

    }
}