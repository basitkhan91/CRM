import { OnInit, Component, ViewChild } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService } from "../../services/alert.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
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
@Component({
    selector: 'app-aircraft-model',
    templateUrl: './aircraft-model.component.html',
    styleUrls: ['./aircraft-model.component.scss'],
    animations: [fadeInOut]
})
/** aircraft-model component*/
export class AircraftModelComponent implements OnInit{
    first: number;
    rows: number;
    paginatorState: any;
    actionModel: any[] = [];
    AuditDetails: any[];
    /** aircraft-model ctor */
    currentAircraftModelType: AircraftModel;
    aircraftModelTypeToUpdate: AircraftModel;
    aircraftModelTypeToRemove: AircraftModel;
    aircraftModelList: AircraftModel[];
    aircraftManufacturerList: AircraftType[];
    aircraftModelsPagination: AircraftModel[];//added
    modal: NgbModalRef;    
    selectedActionName: any;
    localCollection: any[] = [];
    disableSave: boolean = false;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;
    totelPages: number;
    allaircraftModels: AircraftModel[] = [];
    innerColumnHeader: string = "aircraftType?.description";
    //adding for Pagination start
    totalRecords: number;
    cols: any[];
    loading: boolean;
    isDelete: boolean = false;
    aircraftModelTypeToView: AircraftModel;
    //adding for Pagination End

    constructor(private breadCrumb: SingleScreenBreadcrumbService, private aircraftModelService: AircraftModelService, private aircraftManufacturerService: AircraftManufacturerService, private alertService: AlertService, private modalService: NgbModal, private authService: AuthService, ) {

    }

    ngOnInit(): void
    {
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-aircraft-model' ;
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);

        this.aircraftModelService.getAll().subscribe(aircraftModels => {
            this.aircraftModelList = aircraftModels[0];
            this.allaircraftModels = aircraftModels[0];
            this.totalRecords = this.aircraftModelList.length;//Adding for Pagination
            this.totelPages = Math.ceil(this.totalRecords / this.rows);
            this.aircraftModelList.forEach(function (model) {
                model.isActive = model.isActive == false ? false : true;               
            });
        });
        this.currentAircraftModelType = new AircraftModel();

        this.aircraftManufacturerService.getAll().subscribe(aircraftManufacturer => {
            this.aircraftManufacturerList = aircraftManufacturer[0];
        });

        //Adding for p-table in table also we can put headers and columns manually
        this.cols = [
            { field: 'aircraftModelId', header: 'ID' },
            { field: 'aircraftType.description', header: 'Aircraft Manufacturer' },
            { field: 'modelName', header: 'Model Name' },
            { field: 'memo', header: 'Memo'}
        ];
        this.loading = true;
        //P-table Code End
    }
     
    loadAircraftModels(event: LazyLoadEvent) //when page initilizes it will call this method
    {
        this.loading = true;
        this.rows = event.rows;
        this.first = event.first;
        setTimeout(() => {
            if (this.aircraftModelList)
            {
                this.aircraftModelService.getServerPages(event).subscribe( //we are sending event details to service
                    pages => {
                        if (pages.length > 0)
                        {
                            this.aircraftModelsPagination = pages[0];
                        }
                    });
                this.loading = false;
            }
        }, 1000);
    }
    //Pagination Code End

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    addAircraftModel(): void {
        if (!(this.currentAircraftModelType.aircraftTypeId && this.currentAircraftModelType.modelName)) {
            this.display = true;
            return;
        }
        this.currentAircraftModelType.createdBy = this.userName;
        this.currentAircraftModelType.updatedBy = this.userName;
        this.aircraftModelService.add(this.currentAircraftModelType).subscribe(aircraftModel => {
            this.alertService.showMessage('Aircraft Model added successfully.');
            this.updatePaginatorState(); // previously after update we used to call getAll now we can this method to get required list
            this.resetAddAircraftModel();
            this.dismissModel();
        });
    }

    setAircraftModelToUpdate(editAircraftModelpopup: any, id: number): void {
        this.aircraftModelTypeToUpdate = Object.assign({}, this.aircraftModelsPagination.filter(function (aircraftModel) {
            return aircraftModel.aircraftModelId == id;
        })[0]);
        this.modal = this.modalService.open(editAircraftModelpopup, { size: 'sm' });
    }

    updateAircraftModel(): void {
        this.currentAircraftModelType.updatedBy = this.userName;
        this.aircraftModelTypeToUpdate.aircraftType = null;
        this.aircraftModelService.update(this.aircraftModelTypeToUpdate).subscribe(aircraftModel => {
            this.alertService.showMessage('aircraft Model updated successfully.');
            this.updatePaginatorState(); // previously after update we used to call getAll now we can this method to get required list
            this.resetUpdateAircraftManufacturer();
            this.dismissModel();//added
        });
    }

    removeAircraftModel(): void {
        this.aircraftModelService.remove(this.aircraftModelTypeToRemove.aircraftModelId).subscribe(response => {
            this.alertService.showMessage("Model removed successfully.");
            this.updatePaginatorState(); // previously after Remove we used to call getAll now we can this method to get required list
            this.modal.close();
        });

    }
    resetAddAircraftModel(): void {
        this.currentAircraftModelType = new AircraftModel();
    }

    resetUpdateAircraftManufacturer(): void {
        this.aircraftModelTypeToUpdate = new AircraftModel();
    }

    dismissModel(): void {
        if (this.modal != undefined) {
            this.modal.close();
        }
    }

    confirmDelete(content, id): void {
        this.aircraftModelTypeToRemove = Object.assign({}, this.aircraftModelsPagination.filter(function (model) { //change
            return model.aircraftModelId == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }
    openView(viewData, id): void {
        this.aircraftModelTypeToView = Object.assign({}, this.aircraftModelsPagination.filter(function (model) {
            return model.aircraftModelId == id;
        })[0]);;        
        console.log(this.aircraftModelTypeToView)
        this.modal = this.modalService.open(viewData, { size: 'sm' });
    }
    toggleIsActive(aircraftModels: any, event): void {
        this.aircraftModelTypeToUpdate = aircraftModels;
        this.aircraftModelTypeToUpdate.isActive = event.checked == false ? false : true;
        this.updateAircraftModel();
    }

    showAuditPopup(template, aircraftModelId): void {
        this.audit(aircraftModelId);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    open(content) //added
    {
        this.currentAircraftModelType = new AircraftModel();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    audit(aircraftModelId: number): void {
        this.AuditDetails = [];
        this.aircraftModelService.getAudit(aircraftModelId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["aircraftModelAuditId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }

    updatePaginatorState() //need to pass this Object after update or Delete to get Server Side pagination
    {
        this.paginatorState = {
            rows: this.rows,
            first: this.first
        }
        if (this.paginatorState)
        {
            this.loadAircraftModels(this.paginatorState);
        }
    }
    model(event){
        for (let i = 0; i < this.actionModel.length; i++) {            
            if (event == this.actionModel[i][0].modelname) {
                //alert("Action Name already Exists");
                this.disableSave = true;
                this.selectedActionName = event;
            }
        }
    }
    filterModelName(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allaircraftModels.length; i++) {
            let modelname = this.allaircraftModels[i].modelName;
            if (modelname.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.actionModel.push([{
                    "aircraftmodelId": this.allaircraftModels[i].aircraftModelId,
                    "modelname": modelname
                }]),
                this.localCollection.push(modelname);
            }
        }
    }
  eventHandler(event) {
        let value = event.target.value.toLowerCase();
        if (this.selectedActionName) {
            if (value == this.selectedActionName.toLowerCase()) {
                //alert("Action Name already Exists");
                this.disableSave = true;
            }
            else {
                this.disableSave = false;
            }
        }
    }
}