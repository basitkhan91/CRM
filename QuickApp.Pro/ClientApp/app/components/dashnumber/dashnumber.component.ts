import { OnInit, Component, ViewChild } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService, MessageSeverity } from "../../services/alert.service";
import { NgbModalRef, NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { AircraftModel } from "../../models/aircraft-model.model";
import { AircraftType } from "../../models/AircraftType.model";
import { AircraftManufacturerService } from "../../services/aircraft-manufacturer/aircraftManufacturer.service";
import { AircraftDashNumber } from "../../models/dashnumber.model";
import { DashNumberService } from "../../services/dash-number/dash-number.service";
import { AircraftModelService } from "../../services/aircraft-model/aircraft-model.service";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { PaginationService } from "../../services/pagination/pagination.service";
import { MasterComapnyService } from "../../services/mastercompany.service";
import { MasterCompany } from "../../models/mastercompany.model";
import { Table } from "../../../../node_modules/primeng/table";
import { validateRecordExistsOrNot, selectedValueValidate, editValueAssignByCondition, getObjectByValue, getObjectById } from "../../generic/autocomplete";
import { ConfigurationService } from "../../services/configuration.service";
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { FormBuilder } from "../../../../node_modules/@angular/forms";
import { MatDialog } from "../../../../node_modules/@angular/material";
@Component({
    selector: 'app-dashnumber',
    templateUrl: './dashnumber.component.html',
    styleUrls: ['./dashnumber.component.scss'],
    animations: [fadeInOut]
})
/** dashnumber component*/
export class DashnumberComponent implements OnInit {

    originalData: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    headers = [
        { field: 'aircraftType', header: 'Aircraft Manufacturer' },
        { field: 'aircraftModel', header: 'Model Name' },
        { field: 'dashNumber', header: 'Dash Number' },
        { field: 'memo', header: 'Memo' }
    ]
    selectedColumns = this.headers;
    formData = new FormData()
    @ViewChild('dt')

    private table: Table;
    auditHistory: any[] = [];
    disableSaveGroupId: boolean = false;
    PortalList: any;
    disableSaveForDescription: boolean = false;
    disableSaveWorkperformed: boolean = false
    descriptionList: any;
    workPerformedCodeList: any;

    new = {
        aircraftTypeId: "",
        aircraftModelId: "",
        dashNumber: "",
        aircraftModel: "",
        masterCompanyId: 1,
        isActive: true,
        memo: "",
    }
    addNew = { ...this.new };
    selectedRecordForEdit: any;
    viewRowData: any;
    selectedRowforDelete: any;
    existingRecordsResponse = []
    aircraftManufacturerList: any;
    aircraftModelsList: any;
    alldashnumberInfo: any;
    dashnumbers: any;

    constructor(private breadCrumb: SingleScreenBreadcrumbService,
        private authService: AuthService,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private _fb: FormBuilder,
        private alertService: AlertService,
        public dashNumberService: DashNumberService,
        private configurations: ConfigurationService,
        private dialog: MatDialog, private aircraftManufacturerService: AircraftManufacturerService,
        private aircraftModelService: AircraftModelService) {

    }


    ngOnInit(): void {
        this.getList();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-dashnumber';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);

    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();

        // this.table.sortOrder = 0;
        // this.table.sortField = '';

        this.getList();
    }

    customExcelUpload(event) {
        // const file = event.target.files;

        // console.log(file);
        // if (file.length > 0) {

        //     this.formData.append('file', file[0])
        //     this.unitofmeasureService.UOMFileUpload(this.formData).subscribe(res => {
        //         event.target.value = '';

        //         this.formData = new FormData();
        //         this.existingRecordsResponse = res;
        //         this.getList();
        //         this.alertService.showMessage(
        //             'Success',
        //             `Successfully Uploaded  `,
        //             MessageSeverity.success
        //         );

        //     })
        // }

    }
    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=DashNumber&fileName=dashnumber.xlsx`;

        window.location.assign(url);
    }

    getList() {
        this.dashNumberService.getAll().subscribe(res => {
            const responseData = res[0];
            this.originalData = responseData.map(x => {
                return {
                    dashNumberId: x.dashNumberId,
                    aircraftModelId: x.aircraftModelId,
                    aircraftTypeId: x.aircraftTypeId,
                    aircraftType: x.aircraftType.description,
                    createdBy: x.createdBy,
                    updatedBy: x.updatedBy,
                    createdDate: x.createdDate,
                    updatedDate: x.updatedDate,
                    aircraftModel: x.aircraftModel.modelName,
                    dashNumber: x.dashNumber,
                    memo: x.memo,
                    isActive: x.isActive,
                }
            })
            this.totalRecords = responseData.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
        this.aircraftManufacturerService.getAll().subscribe(aircraftManufacturer => {
            this.aircraftManufacturerList = aircraftManufacturer[0];
        });
    }
    changePage(event: { first: any; rows: number }) {
        console.log(event);
        const pageIndex = (event.first / event.rows);
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }
    aircraftManufacturerChange(typeId?) {
        const id = typeId == undefined ? this.addNew.aircraftTypeId : typeId
        console.log(id);
        this.aircraftModelService.getAircraftModelListByManufactureId(id).subscribe(dashNumbers => {
            const responseValue = dashNumbers[0];
            this.aircraftModelsList = responseValue.map(x => {
                return {
                    aircraftModel: x.modelName,
                    aircraftModelId: x.aircraftModelId
                }
            })
            //console.log(this.aircraftModelsList);
        });
    }
    getDashNumberByManfacturerandModel() {
        console.log(this.addNew)
        this.dashNumberService.getDashNumberByModelTypeId(this.addNew.aircraftModelId, this.addNew.aircraftTypeId).subscribe((dashnumberValues) => {
            const respData = dashnumberValues;
            this.alldashnumberInfo = dashnumberValues;
            console.log(this.alldashnumberInfo)
            this.dashnumbers = respData.map(x => {
                return {
                    dashNumber: x.dashNumber,
                    dashNumberId: x.dashNumberId
                }
            })

        })
    }
    checkGroupDescriptionExists(field, value) {
        console.log(this.selectedRecordForEdit);
        const exists = validateRecordExistsOrNot(field, value, this.dashnumbers, this.selectedRecordForEdit);
        if (exists.length > 0) {
            this.disableSaveForDescription = true;
        }
        else {
            this.disableSaveForDescription = false;
        }

    }
    filterDescription(event) {
        this.descriptionList = this.dashnumbers;

        const descriptionData = [...this.dashnumbers.filter(x => {
            return x.dashNumber.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.descriptionList = descriptionData;
    }
    selectedDescription(object) {
        const exists = selectedValueValidate('dashNumber', object, this.selectedRecordForEdit)

        this.disableSaveForDescription = !exists;
    }

    save() {
        console.log(this.addNew);
        const data = {
            ...this.addNew, createdBy: this.userName, updatedBy: this.userName,
            dashNumber: editValueAssignByCondition('dashNumber', this.addNew.dashNumber)
        };
        console.log(data);
        if (!this.isEdit) {
            this.dashNumberService.add(data).subscribe(() => {
                this.resetForm();
                this.getList();

                this.alertService.showMessage(
                    'Success',
                    `Added  New Dash Number Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            const { aircraftType, aircraftModel, ...rest }: any = data;
            this.dashNumberService.update(rest).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Dash Number Successfully  `,
                    MessageSeverity.success
                );
            })
        }
    }

    resetForm() {
        this.isEdit = false;
        this.selectedRecordForEdit = undefined;
        this.addNew = { ...this.new };
        this.aircraftModelsList = [];
        this.dashnumbers = [];
    }


    async edit(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveGroupId = false;
        this.disableSaveForDescription = false;
        await this.aircraftManufacturerChange(rowData.aircraftTypeId);      

        this.addNew = {
            ...rowData,
            dashNumber: getObjectById('dashNumber', rowData.dashNumber, this.originalData),
        };
        this.selectedRecordForEdit = { ...this.addNew }

    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        this.dashNumberService.updateActive(data).subscribe(() => {
            this.alertService.showMessage(
                'Success',
                `Updated Status Successfully  `,
                MessageSeverity.success
            );
        })

    }

    viewSelectedRow(rowData) {
        console.log(rowData);
        this.viewRowData = rowData;
    }
    resetViewData() {
        this.viewRowData = undefined;
    }
    delete(rowData) {
        // console.log(rowData);
        this.selectedRowforDelete = rowData;

    }
    deleteConformation(value) {
        if (value === 'Yes') {
            this.dashNumberService.remove(this.selectedRowforDelete.dashNumberId).subscribe(() => {
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted Dash Number Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    getAuditHistoryById(rowData) {
        this.dashNumberService.getDashNumberAudit(rowData.dashNumberId).subscribe(res => {
            this.auditHistory = res;
        })
    }
    getColorCodeForHistory(i, field, value) {
        const data = this.auditHistory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }
    // Title: string = "Dash Number";
    // aircraftModelsList: any;
    // /** dashnumber ctor */
    // AuditDetails: any[];
    // selectedColumn: any[];
    // selectedColumns: any[];
    // totalRecords: number;
    // currentDashNumberType: AircraftDashNumber;
    // dashNumberToUpdate: AircraftDashNumber;
    // dashNumberTypeToRemove: AircraftDashNumber;
    // dashNumberList: AircraftDashNumber[];
    // dashnumberInfo: any;
    // aircraftManufacturerList: AircraftType[];
    // selectedAircraftModel: any;
    // alldashnumberInfo: AircraftDashNumber[] = [];
    // actionDashnumber: any[] = [];
    // selectedActionName: any;
    // localCollection: any[] = [];
    // disableSave: boolean = false;
    // modal: NgbModalRef;
    // display: boolean = false;
    // modelValue: boolean = false;
    // Active: string;
    // aircrafttype: any = " ";
    // aircraft_Model: any = " ";
    // dashnumber: any = " ";
    // memo: any = " ";
    // createdBy: any = "";
    // updatedBy: any = "";
    // createdDate: any = "";
    // updatedDate: any = "";
    // selectedMemo: any;
    // selectedDashnumber: any;
    // loadingIndicator: boolean;
    // private isSaving: boolean;
    // //added for test pagination
    // messages: AircraftDashNumber[];
    // loading = false;
    // total = 20;
    // page = 3;
    // limit = 2;
    // cols: any;
    // LoadValues: any[] = [];
    // newValue: any;
    // selectedAircraftId: any;
    // dashnumbers: any;
    // public sourceAction: any;
    // tempData: any;
    // isActive: string = 'Active';
    // aircraftModelList: any;
    // allComapnies: MasterCompany[] = [];
    // //added for test pagination end
    // private isEditMode: boolean = false;
    // private isDeleted: boolean = false;
    // //Active: string = "Active";
    // constructor(private paginationService: PaginationService, private masterComapnyService: MasterComapnyService, private aircraftModelService: AircraftModelService, private aircraftManufacturerService: AircraftManufacturerService, private dashNumberService: DashNumberService, private alertService: AlertService, private modalService: NgbModal, private authService: AuthService, ) {
    //     this.sourceAction = new AircraftDashNumber();
    // }

    // ngOnInit(): void {
    //     this.currentDashNumberType = new AircraftDashNumber();
    //     this.aircraftManufacturerService.getAll().subscribe(aircraftManufacturer => {
    //         this.aircraftManufacturerList = aircraftManufacturer[0];
    //     });
    //     this.loadData();
    // }

    // get userName(): string {
    //     return this.authService.currentUser ? this.authService.currentUser.userName : "";
    // }

    // private loadData(): void {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.dashNumberService.getAll().subscribe(
    //         results => this.onDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    //     this.cols = [
    //         { field: 'dashNumberId', header: 'Dash Number ID' },
    //         { field: 'aircraftType', header: 'Aircraft Manufacturer' },
    //         { field: 'aircraftModel', header: 'Model Name' },
    //         { field: 'dashNumber', header: 'Dash Number' },
    //         { field: 'memo', header: 'Memo' }
    //     ];
    //     this.selectedColumns = this.cols;

    // }
    // private onDataLoadSuccessful(getDashnumbers: AircraftDashNumber[]) {
    //     // alert('success');
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     // this.dataSource.data = getAtaMainList;
    //     this.dashnumberInfo = getDashnumbers;
    //     console.log(this.dashnumberInfo);
    //     const response = getDashnumbers;
    //     this.dashnumberInfo = response.map(x => {
    //         return {
    //             dashNumberId: x.dashNumberId,
    //             aircraftModelId: x.aircraftModelId,
    //             aircraftTypeId: x.aircraftTypeId,
    //             aircraftType: x.aircraftType.description,
    //             createdBy: x.createdBy,
    //             updatedBy: x.updatedBy,
    //             createdDate: x.createdDate,
    //             updatedDate: x.updatedDate,
    //             aircraftModel: x.aircraftModel.modelName,
    //             dashNumber: x.dashNumber,
    //             memo: x.memo,
    //             isActive: x.isActive,
    //         }
    //     })
    // }
    // getAircraftModelByManfacturer(value) {
    //     this.newValue = value.originalEvent.target.textContent;
    //     this.aircraftModelService.getAircraftModelListByManufactureId(this.sourceAction.aircraftTypeId).subscribe(models => {
    //         const responseValue = models[0];
    //         this.LoadValues = responseValue.map(models => {
    //             return {
    //                 label: models.modelName,
    //                 value: models
    //             }
    //         });
    //     });

    // }
    // private onDataLoadFailed(error: any) {
    //     // alert(error);
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;

    // }
    // addDashNumber(): void {
    //     if (!(this.currentDashNumberType.aircraftTypeId && this.currentDashNumberType.aircraftModelId && this.currentDashNumberType.dashNumber)) {
    //         this.display = true;
    //         return;
    //     }
    //     this.currentDashNumberType.createdBy = this.userName;
    //     this.currentDashNumberType.updatedBy = this.userName;
    //     this.dashNumberService.add(this.currentDashNumberType).subscribe(dashNumber => {
    //         this.alertService.showMessage('Aircraft Model Dash Number added successfully.');
    //         this.dashNumberService.getAll().subscribe(dashNumbers => {
    //             this.dashNumberList = dashNumbers[0];

    //             this.dashNumberList.forEach(function (dashNumber) {
    //                 dashNumber.isActive = dashNumber.isActive == false ? false : true;
    //             });
    //         });
    //         this.resetAddAircraftDashNumber();
    //         this.aircraftModelsList = [];
    //     });

    // }

    // // setDashNumberToUpdate(editAircraftDashNumberpopup: any, id: number): void {
    // //    this.dashNumberToUpdate = Object.assign({}, this.dashNumberList.filter(function (aircraftDashNumber) {
    // //        return aircraftDashNumber.dashNumberId == id;
    // //    })[0]);
    // //    this.modal = this.modalService.open(editAircraftDashNumberpopup, { size: 'sm' });
    // //    if (this.dashNumberToUpdate)
    // //    {
    // //        if (this.dashNumberToUpdate.aircraftModelId)
    // //        {
    // //            //this.aircraftManufacturerChange(this.dashNumberToUpdate.aircraftTypeId);
    // //        }
    // //    }
    // // }

    // updateDashNumber(): void {
    //     this.currentDashNumberType.updatedBy = this.userName;
    //     this.dashNumberToUpdate.aircraftType = null;
    //     this.dashNumberToUpdate.aircraftModel = null;
    //     this.dashNumberService.update(this.dashNumberToUpdate).subscribe(dashNumber => {
    //         this.alertService.showMessage(this.Title, 'Aircraft Model updated successfully.', MessageSeverity.success);
    //         this.dashNumberService.getAll().subscribe(dashNumbers => {
    //             this.dashNumberList = dashNumbers[0];
    //             this.dashNumberList.forEach(function (dashNumber) {
    //                 dashNumber.isActive = dashNumber.isActive == false ? false : true;
    //             });
    //         });
    //         this.resetUpdateAircraftManufacturer();
    //         this.dismissModel();
    //     },
    //         error => {
    //             var message = '';
    //             if (error.error.constructor == Array) {
    //                 message = error.error[0].errorMessage;
    //             }
    //             else {
    //                 message = error.error.Message;
    //             }
    //             this.alertService.showMessage(this.Title, message, MessageSeverity.error);
    //         }

    //     );
    // }
    // open(content) {
    //     this.isEditMode = false;
    //     this.isDeleted = false;
    //     this.sourceAction = new AircraftDashNumber();
    //     this.sourceAction.isActive = true;
    //     this.isSaving = true;
    //     this.sourceAction.aircraftTypeId = "";
    //     this.sourceAction.aircraft_Model = "";
    //     this.selectedDashnumber = "";
    //     this.sourceAction.memo = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })

    // }

    // openDelete(content, row) {
    //     this.isEditMode = false;
    //     this.isDeleted = true;
    //     this.sourceAction = row;
    //     this.dashnumber = row.dashNumber;
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }
    // openEdit(content, row) {
    //     this.isEditMode = true;
    //     this.isDeleted = false;
    //     this.loadMasterCompanies();
    //     this.sourceAction = row;
    //     this.aircraftManufacturerChange(this.sourceAction.aircraftTypeId);
    //     this.aircraftModelService.getAircraftModelListByManufactureId(this.sourceAction.aircraftTypeId).subscribe(data => {
    //         this.aircraftModelList = data[0];
    //     })
    //     console.log(this.sourceAction);
    //    // this.selectedAircraftId = this.sourceAction.aircraftType;
    //    this.sourceAction.aircraft_Model = [this.sourceAction.aircraftModelId];
    //    this.sourceAction.dashnumber = this.sourceAction.dashNumber;
    //    this.sourceAction.memo = this.sourceAction.memo;
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openView(content, row) {
    //     this.sourceAction = row;
    //     this.aircrafttype = row.aircraftType;
    //     this.aircraft_Model = row.aircraftModel;
    //     this.dashnumber = row.dashNumber;
    //     this.memo = row.memo;
    //     this.createdBy = row.createdBy;
    //     this.updatedBy = row.updatedBy;
    //     this.createdDate = row.createdDate;
    //     this.updatedDate = row.updatedDate;

    //     this.loadMasterCompanies();
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // //removeDashNumber(): void {
    // //    this.dashNumberService.remove(this.dashNumberTypeToRemove.dashNumberId).subscribe(response => {
    // //        this.alertService.showMessage("Dash Number removed successfully.");
    // //        this.dashNumberService.getAll().subscribe(dashNumbers => {
    // //            this.dashNumberList = dashNumbers[0];
    // //            this.dashNumberList.forEach(function (dashNumber) {
    // //                dashNumber.isActive = dashNumber.isActive == false ? false : true;
    // //            });
    // //            this.modal.close();
    // //        });
    // //    });


    // resetAddAircraftDashNumber(): void {
    //     this.currentDashNumberType = new AircraftDashNumber();
    // }

    // resetUpdateAircraftManufacturer(): void {
    //     this.dashNumberToUpdate = new AircraftDashNumber();
    // }

    // dismissModel(): void {
    //     if (this.modal != undefined) {
    //         this.modal.close();
    //     }
    // }

    // // confirmDelete(content, id): void {
    // //    this.dashNumberTypeToRemove = Object.assign({}, this.dashNumberList.filter(function (dashNumber) {
    // //        return dashNumber == dashNumber;
    // //    })[0]);;
    // //    this.modal = this.modalService.open(content, { size: 'sm' });
    // // }

    // deleteItemAndCloseModel() {
    //     this.isSaving = true;
    //     this.sourceAction.updatedBy = this.userName;
    //     this.dashNumberService.remove(this.sourceAction.dashNumberId).subscribe(
    //         response => this.saveCompleted(this.sourceAction),
    //         error => this.saveFailedHelper(error));
    //     this.modal.close();
    // }


    // aircraftManufacturerChange(typeId?) {
    //     const id = typeId == undefined ? this.sourceAction.aircraftTypeId : typeId
    //     this.aircraftModelService.getAircraftModelListByManufactureId(id).subscribe(dashNumbers => {
    //         const responseValue = dashNumbers[0];
    //         this.aircraftModelsList = responseValue.map(x => {
    //             return {
    //                 label: x.modelName,
    //                 value: x.aircraftModelId
    //             }
    //         })
    //     });
    // }
    // getDashNumberByManfacturerandModel() {
    //     this.dashNumberService.getDashNumberByModelTypeId(this.sourceAction.aircraft_Model, this.sourceAction.aircraftTypeId).subscribe((dashnumberValues) => {
    //         const respData = dashnumberValues;
    //         this.alldashnumberInfo = dashnumberValues;
    //         console.log(this.alldashnumberInfo)
    //         this.dashnumbers = respData.map(x => {
    //             return {
    //                 label: x.dashNumber,
    //                 value: x.dashNumberId
    //             }
    //         })

    //     })
    // }
    // showAuditPopup(template, dashNumberId): void {
    //     this.audit(dashNumberId);
    //     this.modal = this.modalService.open(template, { size: 'sm' });
    // }

    // audit(dashNumberId: number): void {
    //     this.AuditDetails = [];
    //     this.dashNumberService.getDashNumberAudit(dashNumberId).subscribe(audits => {
    //         if (audits.length > 0) {
    //             this.AuditDetails = audits;
    //             this.AuditDetails[0].ColumnsToAvoid = ["dashNumberAuditId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
    //         }
    //     });
    // }
    // private saveCompleted(user?: AircraftDashNumber) {
    //     this.isSaving = false;

    //     if (this.isDeleted == true) {
    //         this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
    //         this.isDeleted = false;
    //     }
    //     else {
    //         this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
    //     }

    //     this.loadData();
    // }
    // private saveFailedHelper(error: any) {
    //     this.isSaving = false;
    //     this.alertService.stopLoadingMessage();
    //     this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
    //     this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    // }

    // autoCompleteBindById(field: string, id: any, originalData: any) {
    //     console.log(field, id, originalData);
    //     const data = originalData.filter(x => {
    //         if (x[field] === id) {
    //             return x;
    //         }
    //     })
    //     return data[0];
    // }
    // editItemAndCloseModel() {
    //     // debugger;
    //     this.isSaving = true;
    //     if (this.isEditMode == false) {
    //         this.sourceAction.createdBy = this.userName;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.masterCompanyId = 1;        
    //         this.dashNumberService.add({ ...this.sourceAction, isDeleted: this.isDeleted, createdDate: new Date(), UpdatedDate: new Date() }).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //     }
    //     else {

    //         this.sourceAction.createdBy = this.userName;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.sourceAction.aircraftType = this.autoCompleteBindById('aircraftTypeId', this.sourceAction.aircraftTypeId, this.aircraftManufacturerList)
    //         this.sourceAction.aircraftModel = this.autoCompleteBindById('aircraftModelId', this.sourceAction.aircraftModelId, this.aircraftModelList)
    //         console.log(this.sourceAction);
    //         this.dashNumberService.update({ ...this.sourceAction, isDelete: this.isDeleted }).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //     }

    //     this.modal.close();
    // }

    // dashNumberSelection(event) {
    //     for (let i = 0; i < this.alldashnumberInfo.length; i++) {
    //         if (event == this.alldashnumberInfo[i].dashNumber) {
    //             //alert("Action Name already Exists");
    //             this.disableSave = true;
    //             this.selectedActionName = event;
    //         }
    //     }
    // }
    // filterDashnumber(event) {

    //     this.localCollection = [];
    //     for (let i = 0; i < this.alldashnumberInfo.length; i++) {
    //         let dashnumber = this.alldashnumberInfo[i].dashNumber;

    //         this.actionDashnumber.push([{
    //             "aircraftTypeId": this.alldashnumberInfo[i].dashNumber,
    //             "dashnumber": dashnumber
    //         }]),
    //             this.localCollection.push(dashnumber);

    //     }
    // }
    // eventHandler(event) {
    //     let value = event.target.value.toLowerCase();
    //     if (this.selectedActionName) {
    //         if (value == this.selectedActionName.toLowerCase()) {
    //             //alert("Action Name already Exists");
    //             this.disableSave = true;
    //         }
    //         else {
    //             this.disableSave = false;
    //         }
    //     }
    // }
    // private loadMasterCompanies() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.masterComapnyService.getMasterCompanies().subscribe(
    //         results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    // }
    // private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
    //     // alert('success');
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.allComapnies = allComapnies;

    // }

    // handleChange(rowData, e) {
    //     if (e.checked == false) {
    //         this.sourceAction = rowData;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.Active = "In Active";
    //         this.sourceAction.isActive == false;
    //         this.loadMasterCompanies();
    //         this.sourceAction.masterCompanyId = 1;
    //         this.dashNumberService.updateActive(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //     }
    //     else {
    //         this.sourceAction = rowData;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.Active = "Active";
    //         this.sourceAction.isActive == true;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.dashNumberService.updateActive(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //         //alert(e);
    //     }

    // }

    //pagination code start
    //getMessages(): void {
    //    this.loading = true;
    //    this.dashNumberService.getServerPages({ page: this.page, limit: this.limit }).subscribe(dashNumbers =>
    //    {
    //        this.dashNumberList = dashNumbers[0];
    //        //this.total = dashNumbers.total;
    //       // this.messages = dashNumbers.messages;
    //        this.loading = false;
    //    });
    //}


    //goToPage(n: number): void {
    //    this.page = n;
    //    this.getMessages();
    //}

    //onNext(): void {
    //    this.page++;
    //    this.getMessages();
    //}

    //onPrev(): void {
    //    this.page--;
    //    this.getMessages();
    //}
    //pagination code End
}