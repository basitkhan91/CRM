import { OnInit, Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { fadeInOut } from "../../../services/animations";
import { AlertService } from "../../../services/alert.service";
import { GlAccount } from "../../../models/GlAccount.model";
import { GlAccountService } from "../../../services/glAccount/glAccount.service";
import { CurrencyService } from "../../../services/currency.service";
import { GLAccountClassService } from "../../../services/glaccountclass.service";
import { GlCashFlowClassificationService } from "../../../services/gl-cash-flow-classification.service";
import { LegalEntityService } from "../../../services/legalentity.service";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { NodeSetupService } from "../../../services/node-setup/node-setup.service";
import { POROCategoryService } from "../../../services/porocategory/po-ro-category.service";
import { GlCashFlowClassification } from "../../../models/glcashflowclassification.model";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalService } from "../../../services/Index";
import { AccountListingService } from '../../../services/account-listing/account-listing.service'


@Component({
    selector: 'app-account-listing-create',
    templateUrl: './account-listing-create.component.html',
    styleUrls: ['./account-listing-create.component.scss'],
    animations: [fadeInOut]
})
/** Account List component*/
export class AccountListingCreateComponent implements OnInit {

 currentGLAccount: GlAccount;
    glAccountList: GlAccount[];
    updateMode: boolean;
    allCurrencyInfo: any[] = [];
    allGLAccountClassInfo: any[] = [];
    allGLCashFlowClassInfo: any[] = [];
    allManagemtninfo: any[] = [];
    companyList: any[] = [];
    miscData: any[] = [];
    nodeSetupList: any[] = [];
    poroCategoryList: any[] = [];
    modal: NgbModalRef;
    disableSave: boolean;
    loadingIndicator: boolean;
    GLClassFlowClassificationName: string;
    public sourceglcashflowclassification: any = {}
    isEditMode: boolean;
    isSaving: boolean;
    isDeleteMode: boolean;
    display: boolean = false; 
    accountListCreateForm: FormGroup;
    accountId:any;
    editMode = false;
    accountData:any[];
    leafNodeNameObj:any[];
    accountTitle = "Create GL Accounts";

    constructor(private route: ActivatedRoute, 
        private accountListingService: AccountListingService,
        private formBuilder: FormBuilder, private legalEntityservice: LegalEntityService, private modalService: NgbModal, private poroCategoryService: POROCategoryService, private nodeSetupService: NodeSetupService, private router: Router, private authService: AuthService, private glcashFlowClassifcationService: GlCashFlowClassificationService, private alertService: AlertService, private glAccountService: GlAccountService, private currencyService: CurrencyService, public glAccountClassService: GLAccountClassService) {
        if (this.glAccountService.glAccountEditCollection) {
            this.currentGLAccount = this.glAccountService.glAccountEditCollection;
        }      
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {
            //console.log('params :', params)
             this.accountId = params.get("id")
             if(this.accountId){
                this.editMode = true
                this.accountTitle = "Edit GL Accounts"
                this.updateAccountData(this.accountId)

             }
        })

        if (this.glAccountService.glAccountEditCollection == null) {
            this.currentGLAccount = new GlAccount();
        }
        this.glAccountService.getAll().subscribe(glAccountData => {
            this.glAccountList = glAccountData[0];
        });
        this.loadcurrencyData();
        this.loadGLAccountTypeData();
        this.loadCompaniesData();
        this.load1099Miscdata();
        this.loadGLCashFlowClassification();
        this.loadNodeSetup();
        this.loadPOCategory();
        if (this.glAccountService.glAccountEditCollection == null) {
            this.currentGLAccount.activeFlag = true;
            this.currentGLAccount.allowManualJE = true;
        }

        let current_datetime = new Date()
        let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
        
        this.leafNodeNameObj = [
            {label:'Select City', value:null},
            {label: 'abc', value: '1'},
            {label: 'sass', value: '2'},
            {label: 'gtll', value: '3'},
            {label: 'years', value: '4'},
            {label: 'opo', value: '5'},
            {label: 'wqw', value: '6'},
            {label: 'sas', value: '7'}            
        ];

        this.accountListCreateForm = this.formBuilder.group({
            ledgerName: ['', Validators.required],
            oldAccountCode: ['', Validators.required],
            accountCode: ['', Validators.required],
            accountName: ['', Validators.required],
            accountType: ['', Validators.required],
            accountDescription: ['', Validators.required],
            active: [true, Validators.required],
            leafNodeName: '',
            interCompany: false,
            balanceType: '',
            category: '',
            entities: '',
            allowManual: '',
            classification: '',
            poCategory: '',
            createdBy: this.userName,
            createdDate: formatted_date
        });
    }

    get formdata() { return this.accountListCreateForm.controls; }

    onSubmitAccountForm(){
        console.log('form controls data :', this.formdata)
    }

    updateAccountData(id): void{
        console.log('id :', id) 
        this.accountListingService.getAll().subscribe(
            datalist=> {
                let data = datalist.accountList;
                let obj = {}    
                const x = data.filter( (o, index) => {
                  if(o.id === 1)
                     obj = data[index]  
                })
                console.log('obj 12 :', obj)
                if(Object.keys(obj).length > 0){
                    this.accountListCreateForm.setValue({
                        ledgerName: obj['ledgerName'],
                        accountName: obj['accountName'],
                        description: obj['description']
                    })
                }
                
                console.log('obj :', obj)

            },
            error => {
                console.log('error in getting information')
            }
        );
    }

    addGLAccount(): void {
        if (!(this.currentGLAccount.accountCode && this.currentGLAccount.accountName && this.currentGLAccount.glAccountTypeId && this.currentGLAccount.glAccountNodeId && this.currentGLAccount.glClassFlowClassificationId && this.currentGLAccount.poroCategoryId && (this.currentGLAccount.balanceTypeActual || this.currentGLAccount.balanceTypeBudget || this.currentGLAccount.balanceTypeForecast )
        )) {
            this.display = true;
        }
        if (!this.display) { 
        this.currentGLAccount.createdBy = this.userName;
        this.currentGLAccount.updatedBy = this.userName;
        if (!this.currentGLAccount.glAccountId) {
            this.glAccountService.add(this.currentGLAccount).subscribe(glData => {
                this.currentGLAccount = glData;
                this.alertService.showMessage('GLAccount added successfully.');
                this.glAccountService.getAll().subscribe(glAccountData => {
                    this.glAccountList = glAccountData[0];
                    this.router.navigateByUrl('/generalledgermodule/generalledgerpage/app-glaccount-list');
                });
            });
        }
        else {
            this.currentGLAccount.updatedBy = this.userName;
            this.glAccountService.update(this.currentGLAccount).subscribe(glAccount => {
                this.alertService.showMessage('GLAccount updated successfully.');
                this.glAccountService.getAll().subscribe(glAccounts => {
                    this.glAccountList = glAccounts[0];
                });
                this.updateMode = false;
            });
        }
    }
    }
    private loadNodeSetup() {
        this.nodeSetupService.getAll().subscribe(nodes => {
            this.nodeSetupList = nodes[0];
        })
    }
    private loadPOCategory() {
    
        let poroCategoryList = [];
        this.poroCategoryService.getAll().subscribe(poroCategory => {
            this.poroCategoryList = poroCategory[0];
            
        })
    }
    private loadcurrencyData() {
        this.currencyService.getCurrencyList().subscribe(currencydata => {
            this.allCurrencyInfo = currencydata[0];
        });
    }

    private loadGLAccountTypeData() {
        this.glAccountClassService.getWorkFlows().subscribe(Glaccountdata => {
            this.allGLAccountClassInfo = Glaccountdata[0];
        })
    }

    private loadGLCashFlowClassification() {
        this.glcashFlowClassifcationService.getWorkFlows().subscribe(cahsFlowClassdata => {
            this.allGLCashFlowClassInfo = cahsFlowClassdata[0];
        })
    }

    private loadCompaniesData() {
        this.legalEntityservice.getEntityList().subscribe(entitydata => {
            this.companyList = entitydata[0];
        });
    }

    private load1099Miscdata() {
        this.glAccountService.getMiscdata().subscribe(miscData => {
            this.miscData = miscData[0];
        });
    } 

   
    resetAssetStatus(): void {
        this.updateMode = false;
        this.currentGLAccount = new GlAccount();
    }

    // get userName(): string {
    //     return this.authService.currentUser ? this.authService.currentUser.userName : "";
    // }
    open(content) {
        this.sourceglcashflowclassification = new GlCashFlowClassification();
        this.GLClassFlowClassificationName = "";
        this.sourceglcashflowclassification.isActive = true;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    saveGlcahsFlow() {
        this.isSaving = true;
        if (!this.sourceglcashflowclassification.glCashFlowClassificationId) {

            this.sourceglcashflowclassification.createdBy = this.userName;
            this.sourceglcashflowclassification.updatedBy = this.userName;
            this.sourceglcashflowclassification.masterCompanyId = 1;
            this.glcashFlowClassifcationService.newGlCashFlowClassification(this.sourceglcashflowclassification).subscribe(cashFlow => {
                this.loadGLCashFlowClassification();
                this.currentGLAccount.glClassFlowClassificationId = cashFlow.glClassFlowClassificationId;
                this.alertService.showMessage('C-Flow added successfully.');
            }
            );
        }
        else {

            this.sourceglcashflowclassification.updatedBy = this.userName;
            this.sourceglcashflowclassification.masterCompanyId = 1;
            this.glcashFlowClassifcationService.updateCashFlowClassification(this.sourceglcashflowclassification).subscribe(cashFlow => {
                this.alertService.showMessage('C-Flow Updated successfully.');
            }
            );
        }
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

}