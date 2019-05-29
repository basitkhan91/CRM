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
import { AuthService } from "../../../../services/auth.service";
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
    nodeSetupListData: GLAccountNodeSetup[] = [];
    updateMode: boolean;
    loadingIndicator: boolean;
    selectedCompanysData: any;
    allGLAccountClassData: any[];
    modal: NgbModalRef;
    private isDeleteMode: boolean = false;
    mainCompanylistMultiSelectData: any[] = [];
    cols: any[];
    nodeSetupUpdate: any;
    display: boolean = false;
    Active: string;
    modelValue: boolean = false;
    selectedCodeName: any;
    disablesave: boolean;
    localCollection: any[];
    codeCollection: any;
    constructor(private modalService: NgbModal, public glAccountService: GLAccountClassService, public legalEntityService: LegalEntityService, private alertService: AlertService, private nodeSetupService: NodeSetupService, private authService:AuthService )
    {
    }

    ngOnInit(): void {
        this.loadManagementdata();

        this.setManagementDesctoList();

        this.currentNodeSetup = new GLAccountNodeSetup();
       
        this.loadGlAccountClassData();
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    setManagementDesctoList() {
        this.nodeSetupService.getAll().subscribe(nodes => {
            this.nodeSetupList = nodes[0];
            this.nodeSetupListData = nodes[0];
            if (this.nodeSetupListData) {
                for (let nlength = 0; nlength < this.nodeSetupListData.length; nlength++) {
                    this.nodeSetupService.getShareWithOtherEntitysData(this.nodeSetupListData[nlength].glAccountNodeId).subscribe(msData => {
                        let companyCodes = [];
                        let string = '';
                        let companyIds = [];

                        if (msData[0].length) {
                            for (let j = 0; j < msData[0].length; j++) {

                                if (msData[0][j]) {
                                    companyCodes.push(msData[0][j].code);
                                    companyIds.push(msData[0][j].managementStructureId);
                                    string = companyCodes.join(',');

                                }
                                this.nodeSetupListData[nlength].comapnycodes = string;
                                this.nodeSetupListData[nlength].selectedCompanysData = companyIds;
                            }
                        }

                    })
                }
            }

        });
    }
    addNodeSetup(): void {
        if (!(this.currentNodeSetup.nodeName && this.currentNodeSetup.nodeCode && this.currentNodeSetup.glAccountTypeId && this.currentNodeSetup.fsType)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentNodeSetup.nodeName && this.currentNodeSetup.nodeCode && this.currentNodeSetup.glAccountTypeId && this.currentNodeSetup.fsType))
        {
            this.currentNodeSetup.createdBy = this.userName;
            this.currentNodeSetup.updatedBy = this.userName;
            this.nodeSetupService.add(this.currentNodeSetup).subscribe(node => {
                this.currentNodeSetup.glAccountNodeId = node.glAccountNodeId;
                this.addGLAccountNodeShareWithEntityMapper();
                this.alertService.showMessage('Node Setup added successfully.');
                this.nodeSetupService.getAll().subscribe(Nodes => {
                    this.nodeSetupListData = Nodes[0];
                    this.setManagementDesctoList();

                });
                this.dismissModel();
            });
        }

        
    }

    setNodeSetupToUpdate(id: number, content): void
    {
        this.open(content);
        this.updateMode = true;
        this.currentNodeSetup = Object.assign({}, this.nodeSetupListData.filter(function (node) {
            return node.glAccountNodeId == id;
        })[0]);
        this.updateMode = true;
    }

    updateNodeSetup(): void {
        this.currentNodeSetup.updatedBy = this.userName;
        this.nodeSetupService.update(this.currentNodeSetup).subscribe(node => {
            this.updateGLAccountNodeShareWithEntityMapper(node.glAccountNodeId);
            this.alertService.showMessage('Node Setup updated successfully.');
            this.nodeSetupService.getAll().subscribe(nodes => {
                this.nodeSetupListData = nodes[0];
                this.setManagementDesctoList();
            });
            this.updateMode = false;
           
        });
    }

    removeNodeSetup(nodeId: number): void {
        this.nodeSetupService.remove(nodeId).subscribe(response => {
            this.alertService.showMessage("Node Setup removed successfully.");
            //this.nodeSetupService.getAll().subscribe(nodes => {
            //    this.nodeSetupList = nodes[0];
            //});
            this.setManagementDesctoList();
        });
    }

    toggleIsDeleted(nodeId: number): void
    {
       // this.setNodeSetupToUpdate(nodeId);
        this.currentNodeSetup.isActive = !this.currentNodeSetup.isActive;
    }

    resetNodeSetup(): void
    {
        this.updateMode = false;
        this.currentNodeSetup = new GLAccountNodeSetup();
        this.dismissModel();
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

    addGLAccountNodeShareWithEntityMapper()
    {
        let data = [];
        if (this.currentNodeSetup.selectedCompanysData)
        {
            for (let i = 0; i < this.currentNodeSetup.selectedCompanysData.length;i++)
            {
                data.push({
                    "managementStructureId": this.currentNodeSetup.selectedCompanysData[i],
                    "GLAccountNodeId": this.currentNodeSetup.glAccountNodeId
                })

                this.nodeSetupService.addGLAccountNodeShareWithEntityMapper(data[i]).subscribe(Nodes => {
                    this.nodeSetupList = Nodes[0];
                });
            }
        }
    }

    updateGLAccountNodeShareWithEntityMapper(id)
    {
        this.nodeSetupService.removeNodeShareEntityMapper(id).subscribe(Nodes => {
            this.nodeSetupList = Nodes[0];

            let data = [];
            if (this.currentNodeSetup.selectedCompanysData) {
                for (let i = 0; i < this.currentNodeSetup.selectedCompanysData.length; i++) {
                    data.push({
                        "managementStructureId": this.currentNodeSetup.selectedCompanysData[i],
                        "GLAccountNodeId": this.currentNodeSetup.glAccountNodeId
                    })

                    this.nodeSetupService.addGLAccountNodeShareWithEntityMapper(data[i]).subscribe(Nodes => {
                        this.nodeSetupList = Nodes[0];
                    });
                }
            }

            this.resetNodeSetup();
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
       // this.currentNodeSetup.selectedCompanysData = [];
    }

    toggleIsActive(nodeSetup: any, e) {
        if (e.checked == false) {
            this.nodeSetupUpdate = nodeSetup;
            this.Active = "In Active";
            this.nodeSetupUpdate.isActive == false;
            this.nodeSetupService.update(this.nodeSetupUpdate).subscribe(intangibleTypes => {
                this.alertService.showMessage('Node Setup Saved successfully.');
                this.nodeSetupService.getAll().subscribe(Nodes => {
                    this.nodeSetupListData = Nodes[0];
                    this.setManagementDesctoList();
                });

            })
        }
        else {
            this.nodeSetupUpdate = nodeSetup;
            this.Active = "Active";
            this.nodeSetupUpdate.isActive == true;
            this.nodeSetupService.update(this.nodeSetupUpdate).subscribe(intangibleTypes => {
                this.alertService.showMessage('Node Setup updated successfully.');
                this.nodeSetupService.getAll().subscribe(Nodes => {
                    this.nodeSetupListData = Nodes[0];
                    this.setManagementDesctoList();
                });
            })
        }
    }

    codeHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedCodeName) {
                if (value == this.selectedCodeName.toLowerCase()) {
                    this.disablesave = true;

                }
                else {
                    this.disablesave = false;
                }
            }

        }
    }

    codeSelect(event) {
        if (this.nodeSetupListData) {

            for (let i = 0; i < this.nodeSetupListData.length; i++) {
                if (event == this.nodeSetupListData[i].nodeCode) {
                    this.currentNodeSetup.nodeCode = this.nodeSetupListData[i].nodeCode;
                    this.disablesave = true;

                    this.selectedCodeName = event;
                }
            }
        }
    }

    filterCodes(event) {

        this.localCollection = [];
        for (let i = 0; i < this.nodeSetupListData.length; i++) {
            let nodeCode = this.nodeSetupListData[i].nodeCode;

            if (nodeCode.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.localCollection.push(nodeCode);
            }
        }
    }
}