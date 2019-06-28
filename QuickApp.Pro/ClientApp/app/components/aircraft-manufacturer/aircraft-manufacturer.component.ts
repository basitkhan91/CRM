import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService } from "../../services/alert.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { AircraftType } from "../../models/AircraftType.model";
import { AircraftManufacturerService } from "../../services/aircraft-manufacturer/aircraftManufacturer.service";
import { SingleScreenAuditDetails } from "../../models/single-screen-audit-details.model";
import { LazyLoadEvent } from "primeng/api";
@Component({
    selector: 'app-aircraft-manufacturer',
    templateUrl: './aircraft-manufacturer.component.html',
    styleUrls: ['./aircraft-manufacturer.component.scss'],
    animations: [fadeInOut]
})
/** aircraft-manufacturer component*/
export class AircraftManufacturerComponent implements OnInit{
    first: number;
    rows: number;
    paginatorState: any;

    AuditDetails: any[];
    /** aircraft-manufacturer ctor */

    currentAircraftManufacturerType: AircraftType;
    aircraftManufacturerTypeToUpdate: AircraftType;
    aircraftManufacturerTypeToRemove: AircraftType;
    aircraftManufacturerList: AircraftType[];
    aircraftManufacturerPagination: AircraftType[];//added
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;

    //adding for Pagination start
    totalRecords: number;
    cols: any[];
    loading: boolean;
    //adding for Pagination End

    constructor(private aircraftManufacurerService: AircraftManufacturerService,private alertService: AlertService, private modalService: NgbModal, private authService: AuthService,) {

    }

    ngOnInit(): void {
        this.aircraftManufacurerService.getAll().subscribe(aircraftManufacturer => {
            this.aircraftManufacturerList = aircraftManufacturer[0];
            this.totalRecords = this.aircraftManufacturerList.length;//Adding for Pagination
            this.aircraftManufacturerList.forEach(function (manufacturer) {
                manufacturer.isActive = manufacturer.isActive == false ? false : true;
            });
        });
        this.currentAircraftManufacturerType = new AircraftType();

        //Adding for p-table in table also we can put headers and columns manually
        this.cols = [
            { field: 'aircraftTypeId', header: 'ID' },
            { field: 'description', header: 'Aircraft Manufacturer Name' },
        ];
        this.loading = true;
        //P-table Code End
    }

    loadAircraftManufacturer(event: LazyLoadEvent) //when page initilizes it will call this method
    {
        this.loading = true;
        this.rows = event.rows;
        this.first = event.first;
        setTimeout(() => {
            if (this.aircraftManufacturerList) {
                this.aircraftManufacurerService.getServerPages(event).subscribe( //we are sending event details to service
                    pages => {
                        if (pages.length > 0) {
                            this.aircraftManufacturerPagination = pages[0];
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

    addAircraftManufacturer(): void {
        if (!(this.currentAircraftManufacturerType.description)) {
            this.display = true;
            return;
        }
        this.currentAircraftManufacturerType.createdBy = this.userName;
        this.currentAircraftManufacturerType.updatedBy = this.userName;
        this.aircraftManufacurerService.add(this.currentAircraftManufacturerType).subscribe(aircraftManufacturer => {
            this.alertService.showMessage('Aircraft manufacturer added successfully.');
            this.updatePaginatorState(); // previously after update we used to call getAll now we can this method to get required list
            this.resetAddAircraftManufacturer();
            this.dismissModel();
        });

    }

    setAircraftManufacturerToUpdate(editAircraftManufacturerpopup: any, id: number): void {
        this.aircraftManufacturerTypeToUpdate = Object.assign({}, this.aircraftManufacturerPagination.filter(function (aircraftManufacturer) {
            return aircraftManufacturer.aircraftTypeId == id;
        })[0]);
        this.modal = this.modalService.open(editAircraftManufacturerpopup, { size: 'sm' });
    }

    updateAircraftManufacturer(): void {
        this.currentAircraftManufacturerType.updatedBy = this.userName;
        this.aircraftManufacurerService.update(this.aircraftManufacturerTypeToUpdate).subscribe(aircraftmanufacturer => {
            this.alertService.showMessage('aircraftmanufacturer updated successfully.');
            this.updatePaginatorState(); // previously after update we used to call getAll now we can this method to get required list
            this.resetUpdateAircraftManufacturer();
            this.dismissModel();
        });
    }

    removeAircraftManufacturer(): void {
        this.aircraftManufacurerService.remove(this.aircraftManufacturerTypeToRemove.aircraftTypeId).subscribe(response => {
            this.alertService.showMessage("Aircraft manufacturer removed successfully.");
            this.updatePaginatorState(); // previously after update we used to call getAll now we can this method to get required list
            this.dismissModel();
        });

    }
    resetAddAircraftManufacturer(): void {
        this.currentAircraftManufacturerType = new AircraftType();
    }

    resetUpdateAircraftManufacturer(): void {
        this.aircraftManufacturerTypeToUpdate = new AircraftType();
    }

    dismissModel(): void {
        if (this.modal != undefined) {
            this.modal.close();
        }
    }

    confirmDelete(content, id): void {
        this.aircraftManufacturerTypeToRemove = Object.assign({}, this.aircraftManufacturerPagination.filter(function (manufacturer) {
            return manufacturer.aircraftTypeId == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }

    toggleIsActive(assetStatus: any, event): void {
        this.aircraftManufacturerTypeToUpdate = assetStatus;
        this.aircraftManufacturerTypeToUpdate.isActive = event.checked == false ? false : true;
        this.updateAircraftManufacturer();
    }

    showAuditPopup(template, manufacturerId): void {
        this.audit(manufacturerId);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    audit(manufacturerId: number): void {
        this.AuditDetails = [];
        this.aircraftManufacurerService.getAudit(manufacturerId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["AircraftTypeAuditId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }
    open(content) //added
    {
        this.currentAircraftManufacturerType = new AircraftType();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    updatePaginatorState() //need to pass this Object after update or Delete to get Server Side pagination
    {
        this.paginatorState = {
            rows: this.rows,
            first: this.first
        }
        if (this.paginatorState) {
            this.loadAircraftManufacturer(this.paginatorState);
        }
    }
}