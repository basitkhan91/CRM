import { OnInit, Component, ViewChild } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService, MessageSeverity } from "../../services/alert.service";
import { NgbModalRef, NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { AircraftModel } from "../../models/aircraft-model.model";
import { AircraftModelService } from "../../services/aircraft-model/aircraft-model.service";
import { AircraftManufacturerService } from "../../services/aircraft-manufacturer/aircraftManufacturer.service";
import { AircraftType } from "../../models/AircraftType.model";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { PaginatorModule, Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from "primeng/api";
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { modelGroupProvider } from "../../../../node_modules/@angular/forms/src/directives/ng_model_group";
import { validateRecordExistsOrNot, selectedValueValidate, editValueAssignByCondition, getObjectByValue } from "../../generic/autocomplete";
import { FormBuilder } from "../../../../node_modules/@angular/forms";
import { MatDialog } from "../../../../node_modules/@angular/material";
import { Table } from "../../../../node_modules/primeng/table";
import { ConfigurationService } from "../../services/configuration.service";
@Component({
    selector: 'app-aircraft-model',
    templateUrl: './aircraft-model.component.html',
    styleUrls: ['./aircraft-model.component.scss'],
    animations: [fadeInOut]
})
/** aircraft-model component*/
export class AircraftModelComponent implements OnInit {

    originalData: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    headers = [
        { field: 'aircraftType', header: 'Aircraft Manufacturer' },
        { field: 'modelName', header: 'Model Name' },
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
    descriptionList: any;
    aircraftManufacturerList: any;
    new = {
        aircraftType: "",
        modelName: "",
        aircraftTypeId: "",
        masterCompanyId: 1,
        isActive: true,
        memo: "",
    }
    addNew = { ...this.new };
    selectedRecordForEdit: any;
    viewRowData: any;
    selectedRowforDelete: any;
    existingRecordsResponse = []
    constructor(private breadCrumb: SingleScreenBreadcrumbService,
        private authService: AuthService,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private _fb: FormBuilder,
        private alertService: AlertService,
        public aircraftmodelService: AircraftModelService, private dialog: MatDialog,
        public aicraftManufacturerService: AircraftManufacturerService,
        public configurations: ConfigurationService) {

    }


    ngOnInit(): void {
        this.getList();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-aircraft-model';
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
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=AicraftModel&fileName=aircraftmodel.xlsx`;

        window.location.assign(url);
    }

    getList() {
        this.aircraftmodelService.getAll().subscribe(res => {
            const responseData = res[0];
            this.originalData = responseData.map(x => {
                return {
                    aircraftType: x.aircraftType.description,
                    aircraftTypeId: x.aircraftType.aircraftTypeId,
                    modelName: x.modelName,
                    memo: x.memo,
                    aircraftModelId: x.aircraftModelId,
                    createdBy: x.createdBy,
                    updatedBy: x.updatedBy,
                    createdDate: x.createdDate,
                    updatedDate: x.updatedDate,
                    isActive: x.isActive
                }
            })
            this.totalRecords = responseData.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
        this.aicraftManufacturerService.getAll().subscribe(res => {
            this.aircraftManufacturerList = res[0];
        })
    }
    changePage(event: { first: any; rows: number }) {
        console.log(event);
        const pageIndex = (event.first / event.rows);
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }


    checkGroupDescriptionExists(field, value) {
        console.log(this.selectedRecordForEdit);
        const exists = validateRecordExistsOrNot(field, value, this.originalData, this.selectedRecordForEdit);
        if (exists.length > 0) {
            this.disableSaveForDescription = true;
        }
        else {
            this.disableSaveForDescription = false;
        }

    }
    filterDescription(event) {
        this.descriptionList = this.originalData;

        const descriptionData = [...this.originalData.filter(x => {
            return x.modelName.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.descriptionList = descriptionData;
    }
    selectedDescription(object) {
        const exists = selectedValueValidate('modelName', object, this.selectedRecordForEdit)

        this.disableSaveForDescription = !exists;
    }

    save() {
        const data = {
            ...this.addNew, createdBy: this.userName, updatedBy: this.userName,
            // aircraftType: editValueAssignByCondition('aircraftType', this.addNew.aircraftType),
            modelName: editValueAssignByCondition('modelName', this.addNew.modelName)
        };
        if (!this.isEdit) {
            this.aircraftmodelService.add(data).subscribe(() => {
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Aircraft Model Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            const { aircraftType, ...rest }: any = data;
            this.aircraftmodelService.update(rest).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Aircraft Model Successfully  `,
                    MessageSeverity.success
                );
            })
        }
    }

    resetForm() {
        this.isEdit = false;
        this.selectedRecordForEdit = undefined;
        this.addNew = { ...this.new };
    }


    edit(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveGroupId = false;
        this.disableSaveForDescription = false;


        this.addNew =
            {
                ...rowData,
                aircraftType: getObjectByValue('aircraftType', rowData.aircraftType, this.originalData),
                modelName: getObjectByValue('modelName', rowData.modelName, this.originalData),
            };
        this.selectedRecordForEdit = { ...this.addNew }

    }

    changeStatus(rowData) {
        console.log(rowData);
        const { aircraftType, ...rest }: any = rowData;
        this.aircraftmodelService.updateActive(rest).subscribe(() => {
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
        this.selectedRowforDelete = rowData;

    }
    deleteConformation(value) {
        if (value === 'Yes') {
            this.aircraftmodelService.remove(this.selectedRowforDelete.aircraftModelId).subscribe(() => {
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted Aircraft Model Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    getAuditHistoryById(rowData) {
        this.aircraftmodelService.getAudit(rowData.aircraftModelId).subscribe(res => {
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


    //     first: number;
    //     rows: number;
    //     paginatorState: any;
    //     actionModel: any[] = [];
    //     AuditDetails: any[];
    //     /** aircraft-model ctor */
    //     currentAircraftModelType: AircraftModel;
    //     aircraftModelTypeToUpdate: AircraftModel;
    //     aircraftModelTypeToRemove: AircraftModel;
    //     aircraftModelList: AircraftModel[];
    //     aircraftManufacturerList: AircraftType[];
    //     aircraftModelsPagination: AircraftModel[];//added
    //     modal: NgbModalRef;    
    //     selectedActionName: any;
    //     localCollection: any[] = [];
    //     disableSave: boolean = false;
    //     display: boolean = false;
    //     modelValue: boolean = false;
    //     Active: string;
    //     totelPages: number;
    //     allaircraftModels: AircraftModel[] = [];
    //     innerColumnHeader: string = "aircraftType?.description";
    //     //adding for Pagination start
    //     totalRecords: number;
    //     cols: any[];
    //     loading: boolean;
    //     isDelete: boolean = false;
    //     aircraftModelTypeToView: AircraftModel;
    //     //adding for Pagination End

    //     constructor(private breadCrumb: SingleScreenBreadcrumbService, private aircraftModelService: AircraftModelService, private aircraftManufacturerService: AircraftManufacturerService, private alertService: AlertService, private modalService: NgbModal, private authService: AuthService, ) {

    //     }

    //     ngOnInit(): void
    //     {
    //         this.breadCrumb.currentUrl = '/singlepages/singlepages/app-aircraft-model' ;
    //         this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);

    //         this.aircraftModelService.getAll().subscribe(aircraftModels => {
    //             this.aircraftModelList = aircraftModels[0];
    //             this.allaircraftModels = aircraftModels[0];
    //             this.totalRecords = this.aircraftModelList.length;//Adding for Pagination
    //             this.totelPages = Math.ceil(this.totalRecords / this.rows);
    //             this.aircraftModelList.forEach(function (model) {
    //                 model.isActive = model.isActive == false ? false : true;               
    //             });
    //         });
    //         this.currentAircraftModelType = new AircraftModel();

    //         this.aircraftManufacturerService.getAll().subscribe(aircraftManufacturer => {
    //             this.aircraftManufacturerList = aircraftManufacturer[0];
    //         });

    //         //Adding for p-table in table also we can put headers and columns manually
    //         this.cols = [

    //             { field: 'aircraftType.description', header: 'Aircraft Manufacturer' },
    //             { field: 'modelName', header: 'Model Name' },
    //             { field: 'memo', header: 'Memo'}
    //         ];
    //         this.loading = true;
    //         //P-table Code End
    //     }

    //     loadAircraftModels(event: LazyLoadEvent) //when page initilizes it will call this method
    //     {
    //         this.loading = true;
    //         this.rows = event.rows;
    //         this.first = event.first;
    //         setTimeout(() => {
    //             if (this.aircraftModelList)
    //             {
    //                 this.aircraftModelService.getServerPages(event).subscribe( //we are sending event details to service
    //                     pages => {
    //                         if (pages.length > 0)
    //                         {
    //                             this.aircraftModelsPagination = pages[0];
    //                         }
    //                     });
    //                 this.loading = false;
    //             }
    //         }, 1000);
    //     }
    //     //Pagination Code End

    //     get userName(): string {
    //         return this.authService.currentUser ? this.authService.currentUser.userName : "";
    //     }

    //     addAircraftModel(): void {
    //         if (!(this.currentAircraftModelType.aircraftTypeId && this.currentAircraftModelType.modelName)) {
    //             this.display = true;
    //             return;
    //         }
    //         this.currentAircraftModelType.createdBy = this.userName;
    //         this.currentAircraftModelType.updatedBy = this.userName;
    //         this.aircraftModelService.add(this.currentAircraftModelType).subscribe(aircraftModel => {
    //             this.alertService.showMessage("Success", 'Aircraft Model Added successfully.', MessageSeverity.success);
    //             this.updatePaginatorState(); // previously after update we used to call getAll now we can this method to get required list
    //             this.resetAddAircraftModel();
    //             this.dismissModel();
    //         });
    //     }

    //     setAircraftModelToUpdate(editAircraftModelpopup: any, id: number): void {
    //         this.aircraftModelTypeToUpdate = Object.assign({}, this.aircraftModelsPagination.filter(function (aircraftModel) {
    //             return aircraftModel.aircraftModelId == id;
    //         })[0]);
    //         this.modal = this.modalService.open(editAircraftModelpopup, { size: 'sm' });
    //     }

    //     updateAircraftModel(): void {
    //         this.currentAircraftModelType.updatedBy = this.userName;
    //         this.aircraftModelTypeToUpdate.aircraftType = null;
    //         this.aircraftModelService.update(this.aircraftModelTypeToUpdate).subscribe(aircraftModel => {
    //             this.alertService.showMessage("Success", 'Aircraft Model Updated successfully.', MessageSeverity.success);
    //             this.updatePaginatorState(); // previously after update we used to call getAll now we can this method to get required list
    //             this.resetUpdateAircraftManufacturer();
    //             this.dismissModel();//added
    //         });
    //     }

    //     removeAircraftModel(): void {
    //         this.aircraftModelService.remove(this.aircraftModelTypeToRemove.aircraftModelId).subscribe(response => {
    //             this.alertService.showMessage("Success", 'Aircraft Model Removed successfully.', MessageSeverity.success);
    //             this.updatePaginatorState(); // previously after Remove we used to call getAll now we can this method to get required list
    //             this.modal.close();
    //         });

    //     }
    //     resetAddAircraftModel(): void {
    //         this.currentAircraftModelType = new AircraftModel();
    //     }

    //     resetUpdateAircraftManufacturer(): void {
    //         this.aircraftModelTypeToUpdate = new AircraftModel();
    //     }

    //     dismissModel(): void {
    //         if (this.modal != undefined) {
    //             this.modal.close();
    //         }
    //     }

    //     confirmDelete(content, id): void {
    //         this.aircraftModelTypeToRemove = Object.assign({}, this.aircraftModelsPagination.filter(function (model) { //change
    //             return model.aircraftModelId == id;
    //         })[0]);;
    //         this.modal = this.modalService.open(content, { size: 'sm' });
    //     }
    //     openView(viewData, id): void {
    //         this.aircraftModelTypeToView = Object.assign({}, this.aircraftModelsPagination.filter(function (model) {
    //             return model.aircraftModelId == id;
    //         })[0]);;        
    //         console.log(this.aircraftModelTypeToView)
    //         this.modal = this.modalService.open(viewData, { size: 'sm' });
    //     }
    //     toggleIsActive(aircraftModels: any, event): void {
    //         this.aircraftModelTypeToUpdate = aircraftModels;
    //         this.aircraftModelTypeToUpdate.isActive = event.checked == false ? false : true;
    //         this.updateAircraftModel();
    //     }

    //     showAuditPopup(template, aircraftModelId): void {
    //         this.audit(aircraftModelId);
    //         this.modal = this.modalService.open(template, { size: 'sm' });
    //     }

    //     open(content) //added
    //     {
    //         this.currentAircraftModelType = new AircraftModel();
    //         this.modal = this.modalService.open(content, { size: 'sm' });
    //         this.modal.result.then(() => {
    //             console.log('When user closes');
    //         }, () => { console.log('Backdrop click') })
    //     }

    //     audit(aircraftModelId: number): void {
    //         this.AuditDetails = [];
    //         this.aircraftModelService.getAudit(aircraftModelId).subscribe(audits => {
    //             if (audits.length > 0) {
    //                 this.AuditDetails = audits;
    //                 this.AuditDetails[0].ColumnsToAvoid = ["aircraftModelAuditId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
    //             }
    //         });
    //     }

    //     updatePaginatorState() //need to pass this Object after update or Delete to get Server Side pagination
    //     {
    //         this.paginatorState = {
    //             rows: this.rows,
    //             first: this.first
    //         }
    //         if (this.paginatorState)
    //         {
    //             this.loadAircraftModels(this.paginatorState);
    //         }
    //     }
    //     model(event){
    //         for (let i = 0; i < this.actionModel.length; i++) {            
    //             if (event == this.actionModel[i][0].modelname) {
    //                 //alert("Action Name already Exists");
    //                 this.disableSave = true;
    //                 this.selectedActionName = event;
    //             }
    //         }
    //     }
    //     filterModelName(event) {

    //         this.localCollection = [];
    //         for (let i = 0; i < this.allaircraftModels.length; i++) {
    //             let modelname = this.allaircraftModels[i].modelName;
    //             if (modelname.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                 this.actionModel.push([{
    //                     "aircraftmodelId": this.allaircraftModels[i].aircraftModelId,
    //                     "modelname": modelname
    //                 }]),
    //                 this.localCollection.push(modelname);
    //             }
    //         }
    //     }
    //   eventHandler(event) {
    //         let value = event.target.value.toLowerCase();
    //         if (this.selectedActionName) {
    //             if (value == this.selectedActionName.toLowerCase()) {
    //                 //alert("Action Name already Exists");
    //                 this.disableSave = true;
    //             }
    //             else {
    //                 this.disableSave = false;
    //             }
    //         }
    //     }
}