import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService } from "../../services/alert.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { AircraftType } from "../../models/AircraftType.model";
import { AircraftManufacturerService } from "../../services/aircraft-manufacturer/aircraftManufacturer.service";

@Component({
    selector: 'app-aircraft-manufacturer',
    templateUrl: './aircraft-manufacturer.component.html',
    styleUrls: ['./aircraft-manufacturer.component.scss'],
    animations: [fadeInOut]
})
/** aircraft-manufacturer component*/
export class AircraftManufacturerComponent implements OnInit{
    /** aircraft-manufacturer ctor */

    currentAircraftManufacturerType: AircraftType;
    aircraftManufacturerTypeToUpdate: AircraftType;
    aircraftManufacturerTypeToRemove: AircraftType;
    aircraftManufacturerList: AircraftType[];
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;

    constructor(private aircraftManufacurerService: AircraftManufacturerService,private alertService: AlertService, private modalService: NgbModal, private authService: AuthService,) {

    }

    ngOnInit(): void {
        this.aircraftManufacurerService.getAll().subscribe(aircraftManufacturer => {
            this.aircraftManufacturerList = aircraftManufacturer[0];
            this.aircraftManufacturerList.forEach(function (manufacturer) {
                manufacturer.isActive = manufacturer.isActive == false ? false : true;
            });
        });
        this.currentAircraftManufacturerType = new AircraftType();
    }


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
            this.aircraftManufacurerService.getAll().subscribe(aircraftManufacturers => {
                this.aircraftManufacturerList = aircraftManufacturers[0];
                this.aircraftManufacturerList.forEach(function (manufacturer) {
                    manufacturer.isActive = manufacturer.isActive == false ? false : true;
                });
            });
            this.resetAddAircraftManufacturer();
        });

    }

    setAircraftManufacturerToUpdate(editAircraftManufacturerpopup: any, id: number): void {
        this.aircraftManufacturerTypeToUpdate = Object.assign({}, this.aircraftManufacturerList.filter(function (aircraftManufacturer) {
            return aircraftManufacturer.aircraftTypeId == id;
        })[0]);
        this.modal = this.modalService.open(editAircraftManufacturerpopup, { size: 'sm' });
    }

    updateAircraftManufacturer(): void {
        this.currentAircraftManufacturerType.updatedBy = this.userName;
        this.aircraftManufacurerService.update(this.aircraftManufacturerTypeToUpdate).subscribe(aircraftmanufacturer => {
            this.alertService.showMessage('aircraftmanufacturer updated successfully.');
            this.aircraftManufacurerService.getAll().subscribe(aircraftManufacturers => {
                this.aircraftManufacturerList = aircraftManufacturers[0];
                this.aircraftManufacturerList.forEach(function (manufacturer) {
                    manufacturer.isActive = manufacturer.isActive == false ? false : true;
                });
            });
            this.resetUpdateAircraftManufacturer();
            this.dismissModel();
        });
    }

    removeAircraftManufacturer(): void {
        this.aircraftManufacurerService.remove(this.aircraftManufacturerTypeToRemove.aircraftTypeId).subscribe(response => {
            this.alertService.showMessage("Aircraft manufacturer removed successfully.");
            this.aircraftManufacurerService.getAll().subscribe(aircraftManufacturers => {
                this.aircraftManufacturerList = aircraftManufacturers[0];
                this.aircraftManufacturerList.forEach(function (manufacturer) {
                    manufacturer.isActive = manufacturer.isActive == false ? false : true;
                });
                this.modal.close();
            });
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
        this.aircraftManufacturerTypeToRemove = Object.assign({}, this.aircraftManufacturerList.filter(function (asset) {
            return asset.aircraftTypeId == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }

    toggleIsActive(assetStatus: any, event): void {
        this.aircraftManufacturerTypeToUpdate = assetStatus;
        this.aircraftManufacturerTypeToUpdate.isActive = event.checked == false ? false : true;
        this.updateAircraftManufacturer();
    }
}