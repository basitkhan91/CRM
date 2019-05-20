import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../../../../services/animations";
import { AlertService } from "../../../../../services/alert.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { forEach } from "@angular/router/src/utils/collection";
import { SingleScreenAuditDetails, AuditChanges } from "../../../../../models/single-screen-audit-details.model";
import { AuthService } from "../../../../../services/auth.service";
import { JournalBatch } from "../../../../../models/JournalBatch";
import { JournelService } from "../../../../../services/journals/journals.service";

@Component({
    selector: 'app-create-batch',
    templateUrl: './create-batch.component.html',
    animations: [fadeInOut]
    //styleUrls: ['./create-batch.component.scss']
})
/** create-batch component*/
export class CreateBatchComponent implements OnInit
{
    currentJournelBatch: JournalBatch;
    journelBatchToUpdate: JournalBatch;
    journelBatchToRemove: JournalBatch;
    journelBatchList: JournalBatch[];
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;

    constructor(private alertService: AlertService, private journelService: JournelService, private modalService: NgbModal, private authService: AuthService)
    {

    }

    ngOnInit(): void
    {
        this.journelService.getAllBatch().subscribe(journelBatch => {
            this.journelBatchList = journelBatch[0];
            this.journelBatchList.forEach(function (journelBatch) {
                journelBatch.isActive = journelBatch.isActive == false ? false : true;
            });
        });
        this.currentJournelBatch = new JournalBatch();
    }


    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    addJournelBatch(): void {
        this.currentJournelBatch.createdBy = this.userName;
        this.currentJournelBatch.updatedBy = this.userName;
        this.journelService.addBatch(this.currentJournelBatch).subscribe(batch => {
            this.alertService.showMessage('Batch added successfully.');
            this.journelService.getAllBatch().subscribe(batch => {
                this.journelBatchList = batch[0];
            });
            this.resetAddBatch();
        });

    }

    setJournelBatchToUpdate(editBatchPopup: any, id: number): void {
        this.journelBatchToUpdate = Object.assign({}, this.journelBatchList.filter(function (batch) {
            return batch.id == id;
        })[0]);
        this.modal = this.modalService.open(editBatchPopup, { size: 'sm' });
    }

    updateBatch(): void {
        this.currentJournelBatch.updatedBy = this.userName;
        this.journelService.updateBatch(this.journelBatchToUpdate).subscribe(batch => {
            this.alertService.showMessage('Batch updated successfully.');
            this.journelService.getAllBatch().subscribe(batches => {
                this.journelBatchList = batches[0];
            });
            this.resetUpdateBatch();
            this.dismissModel();
        });
    }

    removeBatch(): void {
        this.journelService.removeBatch(this.journelBatchToRemove.id).subscribe(response => {
            this.alertService.showMessage("Batch removed successfully.");
            this.journelService.getAllBatch().subscribe(batches => {
                this.journelBatchList = batches[0];
                this.modal.close();
            });
        });

    }
    resetAddBatch(): void {
        this.currentJournelBatch = new JournalBatch();
    }

    resetUpdateBatch(): void {
        this.journelBatchToUpdate = new JournalBatch();
    }

    dismissModel(): void {
        if (this.modal != undefined) {
            this.modal.close();
        }
    }

    confirmDelete(content, id): void {
        this.journelBatchToRemove = Object.assign({}, this.journelBatchList.filter(function (batch) {
            return batch.id == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }

    toggleIsActive(assetStatus: any, event): void {
        this.journelBatchToUpdate = assetStatus;
        this.journelBatchToUpdate.isActive = event.checked == false ? false : true;
        this.updateBatch();
    }

    //showAuditPopup(template, id): void {
    //    this.auditAssetStatus(id);
    //    this.modal = this.modalService.open(template, { size: 'sm' });
    //}

    //auditAssetStatus(assetStatusId: number): void {
    //    this.AuditDetails = [];
    //    this.journelService.getAssetAudit(assetStatusId).subscribe(audits => {
    //        if (audits.length > 0) {
    //            this.AuditDetails = audits;
    //            this.AuditDetails[0].ColumnsToAvoid = ["assetStatusAuditId", "id", "createdBy", "createdDate", "updatedDate"];
    //        }
    //    });
    //}
}