import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../../../services/animations";
import { AlertService } from "../../../../services/alert.service";
import { GLAccountNodeSetup } from "../../../../models/node-setup.model";
import { NodeSetupService } from "../../../../services/node-setup/node-setup.service";
import { LegalEntityService } from "../../../../services/legalentity.service";

@Component({
    selector: 'app-node-setup',
    templateUrl: './node-setup.component.html',
    styleUrls: ['./node-setup.component.scss'],
    animations: [fadeInOut]
})
/** node-setup component*/
export class NodeSetupComponent implements OnInit {
    maincompanylist: any;
    allManagemtninfoData: any[];
    currentNodeSetup: GLAccountNodeSetup;
    nodeSetupList: GLAccountNodeSetup[];
    updateMode: boolean;
    loadingIndicator: boolean;

    constructor(public legalEntityService: LegalEntityService,private alertService: AlertService, private nodeSetupService: NodeSetupService )
    {
    }

    ngOnInit(): void {
        this.nodeSetupService.getAll().subscribe(nodes => {
            this.nodeSetupList = nodes[0];
        });
        this.currentNodeSetup = new GLAccountNodeSetup();
        this.loadManagementdata();
    }

    addNodeSetup(): void {
        this.nodeSetupService.add(this.currentNodeSetup).subscribe(node => {
            this.currentNodeSetup = node;
            this.alertService.showMessage('Asset Status added successfully.');
            this.nodeSetupService.getAll().subscribe(Nodes => {
                this.nodeSetupList = Nodes[0];
            });
        });
    }

    setNodeSetupToUpdate(id: number): void {
        this.currentNodeSetup = Object.assign({}, this.nodeSetupList.filter(function (node) {
            return node.GLAccountNodeId == id;
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
        this.currentNodeSetup.IsDelete = !this.currentNodeSetup.IsDelete;
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
    }

    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
    }

    saveOrEditItemAndCloseModel()
    {
    }

}