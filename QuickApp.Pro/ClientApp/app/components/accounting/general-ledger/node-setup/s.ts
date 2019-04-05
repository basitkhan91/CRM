import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../../../services/animations";
import { AlertService } from "../../../../services/alert.service";
import { GLAccountNodeSetup } from "../../../../models/node-setup.model";
import { NodeSetupService } from "../../../../services/node-setup/node-setup.service";
import { LegalEntityService } from "../../../../services/legalentity.service";
import { GLAccountClassService } from "../../../../services/glaccountclass.service";
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MenuItem } from 'primeng/api';//bread crumb
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
@Component({
    selector: 'app-node-setup',
    templateUrl: './node-setup.component.html',
    styleUrls: ['./node-setup.component.scss'],
    animations: [fadeInOut]
})
/** node-setup component*/
export class NodeSetupComponent implements OnInit {
    maincompanylist: any[] = [];
    allManagemtninfoData: any[];
    currentNodeSetup: GLAccountNodeSetup;
    nodeSetupList: GLAccountNodeSetup[] = [];
    updateMode: boolean;
    loadingIndicator: boolean;
    selectedCompanysData: any;
    allGLAccountClassData: any[];
    modal: NgbModalRef;
    private isDeleteMode: boolean = false;
    mainCompanylistMultiSelectData: any[] = [];
    cols: any[];
    afterSavingNodeShareWithEntity: any;
    constructor(private modalService: NgbModal,public glAccountService: GLAccountClassService,public legalEntityService: LegalEntityService,private alertService: AlertService, private nodeSetupService: NodeSetupService )
    {
    }

    ngOnInit(): void {
        this.nodeSetupService.getAll().subscribe(nodes => {
            this.nodeSetupList = nodes[0];
        });
        this.cols = [
            { field: 'ledgerName', header: 'Ledgere Name' },
            { field: 'memo', header: 'Share with the Other Entities' },
            { field: 'nodeCode', header: 'Node Code' },
            { field: 'nodeName', header: 'Node Name' },
            { field: 'description', header: 'Description' },
            { field: 'leafNodeCheck', header: 'Leaf Node' },
            { field: 'fsType', header: 'Node Type' },

        ];
        this.currentNodeSetup = new GLAccountNodeSetup();
        this.loadManagementdata();
        this.loadGlAccountClassData();
    }

    addNodeSetup(): void {
        this.nodeSetupService.add(this.currentNodeSetup).subscribe(node => {
            this.currentNodeSetup = node;
            this.saveNodeShareWithEntityMapper();
            this.alertService.showMessage('Asset Status added successfully.');
            this.nodeSetupService.getAll().subscribe(Nodes => {
                this.nodeSetupList = Nodes[0];
            });
        });
    }
 
    setNodeSetupToUpdate(id: number): void {
        this.currentNodeSetup = Object.assign({}, this.nodeSetupList.filter(function (node) {
            return node.glAccountNodeId == id;
        })[0]);
        this.updateMode = true;
    }

    updateNodeSetup(): void {
        this.nodeSetupService.update(this.currentNodeSetup).subscribe(node => {
            this.alertService.showMessage('Node Setup updated successfully.');
            this.nodeSetupService.getAll().subscribe(nodes => {
                this.nodeSetupList = nodes[0];
            });
            this.updateMode = false;
            this.resetAssetStatus();
        });
    }

    removeNodeSetup(nodeId: number): void {
        this.nodeSetupService.remove(nodeId).subscribe(response => {
            this.alertService.showMessage("Asset Status removed successfully.");
            this.nodeSetupService.getAll().subscribe(nodes => {
                this.nodeSetupList = nodes[0];
            });
        });
    }

    toggleIsDeleted(nodeId: number): void
    {
        this.setNodeSetupToUpdate(nodeId);
        this.currentNodeSetup.isDelete = !this.currentNodeSetup.isDelete;
    }

    resetAssetStatus(): void
    {
        this.updateMode = false;
        this.currentNodeSetup = new GLAccountNodeSetup();
    }
    //end
    private loadManagementdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.legalEntityService.getManagemententity().subscribe(
            results => this.onManagemtntdataLoadDataList(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onManagemtntdataLoadDataList(getAtaMainList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allManagemtninfoData = getAtaMainList;

        for (let i = 0; i < this.allManagemtninfoData.length; i++) {
            if (this.allManagemtninfoData[i].parentId == null) {
                this.maincompanylist.push(this.allManagemtninfoData[i]);
            }
        }

        if (this.maincompanylist) {
            if (this.maincompanylist.length > 0) {
                for (let i = 0; i < this.maincompanylist.length; i++)
                    this.mainCompanylistMultiSelectData.push(
                        { value: this.maincompanylist[i].managementStructureId, label: this.maincompanylist[i].code },

                    );
            }
        }
    }

    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
    }

    private loadGlAccountClassData() {
        this.alertService.startLoadingMessage();
        this.glAccountService.getWorkFlows().subscribe(
            results => this.onDataLoadGlDataSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    onDataLoadGlDataSuccessful(allWorkFlows: any[])
    {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allGLAccountClassData = allWorkFlows;
    }
    saveNodeShareWithEntityMapper()
    {
        if (this.selectedCompanysData)
        {
            for (let i = 0; i < this.selectedCompanysData.length;i++)
            {

            }
        }
        this.nodeSetupService.addGLAccountNodeShareWithEntityMapper(this.selectedCompanysData).subscribe(ShareWithEntity => {
            this.afterSavingNodeShareWithEntity = ShareWithEntity[0];
        });
    }

    open(content) {

        this.updateMode = false;
        this.isDeleteMode = false;
        this.currentNodeSetup = new GLAccountNodeSetup();
        this.currentNodeSetup.isActive = true;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    dismissModel() {
        this.isDeleteMode = false;
        this.updateMode = false;
        this.modal.close();
    }
}