import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService, MessageSeverity } from "../../services/alert.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { AircraftModel } from "../../models/aircraft-model.model";
import { AircraftType } from "../../models/AircraftType.model";
import { AircraftManufacturerService } from "../../services/aircraft-manufacturer/aircraftManufacturer.service";
import { AircraftDashNumber } from "../../models/dashnumber.model";
import { DashNumberService } from "../../services/dash-number/dash-number.service";
import { AircraftModelService } from "../../services/aircraft-model/aircraft-model.service";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { PaginationService } from "../../services/pagination/pagination.service";
@Component({
    selector: 'app-dashnumber',
    templateUrl: './dashnumber.component.html',
    styleUrls: ['./dashnumber.component.scss'],
    animations: [fadeInOut]
})
/** dashnumber component*/
export class DashnumberComponent implements OnInit{
    Title: string = "Dash Number";
    aircraftModelsList: AircraftModel[];
    /** dashnumber ctor */
    AuditDetails: any[];
    currentDashNumberType: AircraftDashNumber;
    dashNumberToUpdate: AircraftDashNumber;
    dashNumberTypeToRemove: AircraftDashNumber;
    dashNumberList: AircraftDashNumber[];

    aircraftManufacturerList: AircraftType[];
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;

    //added for test pagination
    messages: AircraftDashNumber[];
    loading = false;
    total = 20;
    page = 3;
    limit = 2;
    //added for test pagination end

    constructor(private paginationService: PaginationService,private aircraftModelService: AircraftModelService, private aircraftManufacturerService: AircraftManufacturerService, private dashNumberService: DashNumberService, private alertService: AlertService, private modalService: NgbModal, private authService: AuthService, ) {

    }

    ngOnInit(): void {
        //this.dashNumberService.getAll().subscribe(dashNumbers => {
        //    this.dashNumberList = dashNumbers[0];
        //    this.dashNumberList.forEach(function (dashNumber) {
        //        dashNumber.isActive = dashNumber.isActive == false ? false : true;
        //    });
        //});

        this.getMessages();

        this.currentDashNumberType = new AircraftDashNumber();

        this.aircraftManufacturerService.getAll().subscribe(aircraftManufacturer => {
            this.aircraftManufacturerList = aircraftManufacturer[0];
        });
    }


    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    addDashNumber(): void {
        if (!(this.currentDashNumberType.aircraftTypeId && this.currentDashNumberType.aircraftModelId && this.currentDashNumberType.dashNumber)) {
            this.display = true;
            return;
        }
        this.currentDashNumberType.createdBy = this.userName;
        this.currentDashNumberType.updatedBy = this.userName;
        this.dashNumberService.add(this.currentDashNumberType).subscribe(dashNumber => {
            this.alertService.showMessage('Aircraft Model Dash Number added successfully.');
            this.dashNumberService.getAll().subscribe(dashNumbers => {
                this.dashNumberList = dashNumbers[0];
                this.dashNumberList.forEach(function (dashNumber) {
                    dashNumber.isActive = dashNumber.isActive == false ? false : true;
                });
            });
            this.resetAddAircraftDashNumber();
            this.aircraftModelsList = [];
        });

    }

    setDashNumberToUpdate(editAircraftDashNumberpopup: any, id: number): void {
        this.dashNumberToUpdate = Object.assign({}, this.dashNumberList.filter(function (aircraftDashNumber) {
            return aircraftDashNumber.dashNumberId == id;
        })[0]);
        this.modal = this.modalService.open(editAircraftDashNumberpopup, { size: 'sm' });
        if (this.dashNumberToUpdate)
        {
            if (this.dashNumberToUpdate.aircraftModelId)
            {
                this.aircraftManufacturerChange(this.dashNumberToUpdate.aircraftTypeId);
            }
        }
    }

    updateDashNumber(): void {
        this.currentDashNumberType.updatedBy = this.userName;
        this.dashNumberToUpdate.aircraftType = null;
        this.dashNumberToUpdate.aircraftModel = null;
        this.dashNumberService.update(this.dashNumberToUpdate).subscribe(dashNumber => {
            this.alertService.showMessage(this.Title, 'Aircraft Model updated successfully.', MessageSeverity.success);
            this.dashNumberService.getAll().subscribe(dashNumbers => {
                this.dashNumberList = dashNumbers[0];
                this.dashNumberList.forEach(function (dashNumber) {
                    dashNumber.isActive = dashNumber.isActive == false ? false : true;
                });
            });
            this.resetUpdateAircraftManufacturer();
            this.dismissModel();
        },
            error => {
                var message = '';
                if (error.error.constructor == Array) {
                    message = error.error[0].errorMessage;
                }
                else {
                    message = error.error.Message;
                }
                this.alertService.showMessage(this.Title, message, MessageSeverity.error);
            }
        
        );
    }

    removeDashNumber(): void {
        this.dashNumberService.remove(this.dashNumberTypeToRemove.dashNumberId).subscribe(response => {
            this.alertService.showMessage("Dash Number removed successfully.");
            this.dashNumberService.getAll().subscribe(dashNumbers => {
                this.dashNumberList = dashNumbers[0];
                this.dashNumberList.forEach(function (dashNumber) {
                    dashNumber.isActive = dashNumber.isActive == false ? false : true;
                });
                this.modal.close();
            });
        });

    }
    resetAddAircraftDashNumber(): void {
        this.currentDashNumberType = new AircraftDashNumber();
    }

    resetUpdateAircraftManufacturer(): void {
        this.dashNumberToUpdate = new AircraftDashNumber();
    }

    dismissModel(): void {
        if (this.modal != undefined) {
            this.modal.close();
        }
    }

    confirmDelete(content, id): void {
        this.dashNumberTypeToRemove = Object.assign({}, this.dashNumberList.filter(function (dashNumber) {
            return dashNumber.dashNumberId == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }

    toggleIsActive(assetStatus: any, event): void {
        this.dashNumberToUpdate = assetStatus;
        this.dashNumberToUpdate.isActive = event.checked == false ? false : true;
        this.updateDashNumber();
    }

    aircraftManufacturerChange(aircraftManufacturerId)
    {
        this.aircraftModelService.getAircraftModelListByManufactureId(aircraftManufacturerId).subscribe(dashNumbers => {
            this.aircraftModelsList = dashNumbers[0]; 
        });
    }

    showAuditPopup(template, dashNumberId): void {
        this.audit(dashNumberId);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    audit(dashNumberId: number): void {
        this.AuditDetails = [];
        this.dashNumberService.getDashNumberAudit(dashNumberId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["dashNumberAuditId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }

    //pagination code start
    getMessages(): void {
        this.loading = true;
        this.dashNumberService.getServerPages({ page: this.page, limit: this.limit }).subscribe(dashNumbers =>
        {
            this.dashNumberList = dashNumbers[0];
            //this.total = dashNumbers.total;
           // this.messages = dashNumbers.messages;
            this.loading = false;
        });
    }


    goToPage(n: number): void {
        this.page = n;
        this.getMessages();
    }

    onNext(): void {
        this.page++;
        this.getMessages();
    }

    onPrev(): void {
        this.page--;
        this.getMessages();
    }
    //pagination code End
}