import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService } from "../../services/alert.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { AircraftModel } from "../../models/aircraft-model.model";
import { AircraftModelService } from "../../services/aircraft-model/aircraft-model.service";
import { AircraftManufacturerService } from "../../services/aircraft-manufacturer/aircraftManufacturer.service";
import { AircraftType } from "../../models/AircraftType.model";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { PaginatorModule } from 'primeng/paginator';
import { LazyLoadEvent } from "primeng/api";
@Component({
    selector: 'app-aircraft-model',
    templateUrl: './aircraft-model.component.html',
    styleUrls: ['./aircraft-model.component.scss'],
    animations: [fadeInOut]
})
/** aircraft-model component*/
export class AircraftModelComponent implements OnInit{
    AuditDetails: any[];
    /** aircraft-model ctor */

    currentAircraftModelType: AircraftModel;
    aircraftModelTypeToUpdate: AircraftModel;
    aircraftModelTypeToRemove: AircraftModel;
    aircraftModelList: AircraftModel[];
    aircraftManufacturerList: AircraftType[];
    aircraftModelsPagination: AircraftModel[];
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;

    //adding for Pagination start
    totalRecords: number;
    cols: any[];
    loading: boolean;
    //adding for Pagination End

    constructor(private aircraftModelService: AircraftModelService, private aircraftManufacturerService: AircraftManufacturerService, private alertService: AlertService, private modalService: NgbModal, private authService: AuthService, ) {

    }

    ngOnInit(): void {
        this.aircraftModelService.getAll().subscribe(aircraftModels => {
            this.aircraftModelList = aircraftModels[0];
            this.totalRecords = this.aircraftModelList.length;//Adding for Pagination
            this.aircraftModelList.forEach(function (model) {
                model.isActive = model.isActive == false ? false : true;
            });
        });
        this.currentAircraftModelType = new AircraftModel();

        this.aircraftManufacturerService.getAll().subscribe(aircraftManufacturer => {
            this.aircraftManufacturerList = aircraftManufacturer[0];
        });

        //Adding for Pagination start
        this.cols = [
            { field: 'aircraftModelId', header: 'ID' },
            { field: 'aircraftType?.description', header: 'Aircraft Manufacturer' },
            { field: 'modelName', header: 'Model Name' },
        ];

        this.loading = true;
        //Pagination Code End
    }

     //Adding for Pagination start
    loadAircraftModels(event: LazyLoadEvent)
    {
        this.loading = true;
        setTimeout(() => {
            if (this.aircraftModelList)
            {
                this.aircraftModelService.getServerPages(event).subscribe(
                    pages => {
                        if (pages.length > 0)
                        {
                            this.aircraftModelsPagination = pages[0];
                        }
                    });
                this.aircraftModelsPagination = this.aircraftModelList.slice(event.first, (event.first + event.rows));
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
            this.aircraftModelService.getAll().subscribe(aircraftModels => {
                this.aircraftModelList = aircraftModels[0];
                this.aircraftModelList.forEach(function (models) {
                    models.isActive = models.isActive == false ? false : true;
                });
            });
            this.resetAddAircraftModel();
        });

    }

    setAircraftModelToUpdate(editAircraftModelpopup: any, id: number): void {
        this.aircraftModelTypeToUpdate = Object.assign({}, this.aircraftModelList.filter(function (aircraftModel) {
            return aircraftModel.aircraftModelId == id;
        })[0]);
        this.modal = this.modalService.open(editAircraftModelpopup, { size: 'sm' });
    }

    updateAircraftModel(): void {
        this.currentAircraftModelType.updatedBy = this.userName;
        this.aircraftModelTypeToUpdate.aircraftType = null;
        this.aircraftModelService.update(this.aircraftModelTypeToUpdate).subscribe(aircraftModel => {
            this.alertService.showMessage('aircraft Model updated successfully.');
            this.aircraftModelService.getAll().subscribe(aircraftModels => {
                this.aircraftModelList = aircraftModels[0];
                this.aircraftModelList.forEach(function (model) {
                    model.isActive = model.isActive == false ? false : true;
                });
            });
            this.resetUpdateAircraftManufacturer();
            this.dismissModel();
        });
    }

    removeAircraftModel(): void {
        this.aircraftModelService.remove(this.aircraftModelTypeToRemove.aircraftModelId).subscribe(response => {
            this.alertService.showMessage("Model removed successfully.");
            this.aircraftModelService.getAll().subscribe(aircraftModels => {
                this.aircraftModelList = aircraftModels[0];
                this.aircraftModelList.forEach(function (model) {
                    model.isActive = model.isActive == false ? false : true;
                });
                this.modal.close();
            });
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
        this.aircraftModelTypeToRemove = Object.assign({}, this.aircraftModelList.filter(function (model) {
            return model.aircraftModelId == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }

    toggleIsActive(assetStatus: any, event): void {
        this.aircraftModelTypeToUpdate = assetStatus;
        this.aircraftModelTypeToUpdate.isActive = event.checked == false ? false : true;
        this.updateAircraftModel();
    }

    showAuditPopup(template, aircraftModelId): void {
        this.audit(aircraftModelId);
        this.modal = this.modalService.open(template, { size: 'sm' });
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

    paginate(paginatioDetails)
    {
        console.log(paginatioDetails);
        this.aircraftModelService.getServerPages(paginatioDetails).subscribe(
            pages => {
                if (pages.length > 0)
                {

                }
            });
    }
}