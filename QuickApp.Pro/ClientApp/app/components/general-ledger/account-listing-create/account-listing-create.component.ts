import { OnInit, Component } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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
import { getValueFromObjectByKey, getObjectByValue, validateRecordExistsOrNot, editValueAssignByCondition, getObjectById, selectedValueValidate } from '../../../generic/autocomplete';


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
    entitiesObj:any[];
    accountTitle = "Create GL Accounts";
    selectedBalanceType = [];
    submittedForm = false;
    glAccountObj:any = {}
    ledgerNameObject: any[];
    accountCodeObject: any[];
    accountNameObject: any[];
    accountTypeObject: any[];
    ischeckLedgerNameExists: boolean = false;
    isAccountCodeExists: boolean = false;
    isAccountNameExists: boolean = false;
    isAccountTypeExists: boolean = false;
    submittedValue: any;

    balanceTypeCheckBox = [{
        name: 'Actual',
        value: true
      }, {
        name: 'Budget',
       value: false
      }, {
        name: 'Forecast',
        value: false
    }];

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
        this.glAccountObj.isActiveFlag = true;
        this.route.paramMap.subscribe(params => {

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
        let formatted_date = (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate() +  "/" + current_datetime.getFullYear()


        this.accountListCreateForm = this.formBuilder.group({
            ledgerName: ['', Validators.required],
            oldAccountCode: '',
            accountCode: ['', Validators.required],
            accountName: ['', Validators.required],
            accountType: ['', Validators.required],
            accountDescription: '',
            active: [true, Validators.required],
            leafNodeName: '',
            interCompany: false,
            category: null,
            entities: ['', Validators.required],
            allowManualJE: true,
            classification: [null, Validators.required],
            poroCategory: [null, Validators.required],
            createdBy: this.userName,
            createdDate: formatted_date,
            balanceTypeCheckBox: this.formBuilder.array(this.balanceTypeCheckBox.map(x => x.value))
        });

        this.getAccountObject()
        this.getLedgerObject()
        this.getLeafNodeObject()
    }

    get formdata() { return this.accountListCreateForm.controls; }

    onSubmitAccountForm(){

        console.log('accountListCreateForm values :', this.accountListCreateForm.value)
         this.submittedForm = true;

        // stop here if form is invalid
        if (this.accountListCreateForm.invalid) {
            return;
        }

        const checkboxControl = (this.accountListCreateForm.controls.balanceTypeCheckBox as FormArray);
        const formValue = {
          ...this.accountListCreateForm.value,
          BalanceTypeActual: this.accountListCreateForm.value.balanceTypeCheckBox[0],
          BalanceTypeBudget: this.accountListCreateForm.value.balanceTypeCheckBox[1],
          BalanceTypeForecast: this.accountListCreateForm.value.balanceTypeCheckBox[2]
        }
        this.submittedValue = formValue;

        if(this.editMode){
            this.accountListingService.updateGlAccount(formValue).subscribe(response => {
               console.log('update response received :', response)
               this.alertService.showMessage('GLAccount Updated successfully.');
               this.router.navigateByUrl('/generalledgermodule/generalledgerpage/app-account-listing');
            })
        }else{
            this.accountListingService.createGlAccount(formValue).subscribe(response => {
               console.log('response received :', response)
               this.alertService.showMessage('GLAccount added successfully.');
               this.router.navigateByUrl('/generalledgermodule/generalledgerpage/app-account-listing');
            })
        }
    }

    loadLedgerNames(event){

        this.ledgerNameObject = [...this.ledgerNameObject.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]
    }

    checkLedgerNameExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.ledgerNameObject)
        if (exists.length > 0) {

            this.ischeckLedgerNameExists = true;
        } else {

            this.ischeckLedgerNameExists = false;
        }

    }

    selectedLedgerName() {
        this.ischeckLedgerNameExists = true;
    }

     loadAccountCode(event){

        this.accountCodeObject = [...this.accountCodeObject.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]
    }

    checkAccountCodeExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.accountCodeObject)
        if (exists.length > 0) {

            this.isAccountCodeExists = true;
        } else {

            this.isAccountCodeExists = false;
        }

    }

    selectedAccountCode() {
        this.isAccountCodeExists = true;
    }

    loadAccountName(event){

        this.accountNameObject = [...this.accountNameObject.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]
    }

    checkAccountNameExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.accountNameObject)
        if (exists.length > 0) {

            this.isAccountNameExists = true;
        } else {

            this.isAccountNameExists = false;
        }

    }

    selectedAccountName() {
        this.isAccountNameExists = true;
    }


    loadAccountType(event){

        this.accountTypeObject = [...this.accountTypeObject.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]
    }

    checkAccountTypeExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.accountTypeObject)
        if (exists.length > 0) {

            this.isAccountTypeExists = true;
        } else {

            this.isAccountTypeExists = false;
        }

    }

    selectedAccountType() {
        this.isAccountTypeExists = true;
    }

    updateAccountData(id): void{
        this.accountListingService.getAll().subscribe(
            datalist=> {
                let data = datalist.accountList;
                let obj = {}
                const x = data.filter( (o, index) => {
                  if(o.id === 1)
                     obj = data[index]
                })

                if(Object.keys(obj).length > 0){
                    this.accountListCreateForm.valueChanges.subscribe(
                       value=> {
                          console.log(JSON.stringify(value));
                       }
                    );
                }

                this.glAccountObj = {
                    ledgerId: 1,
                    accountCodeId: 2,
                    categoryId: 3,
                    entityId: 4,
                    classificationId: 5,
                    poroCategoryId: 2
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
        this.glAccountClassService.getGlAccountClassList().subscribe(Glaccountdata => {
            this.allGLAccountClassInfo = Glaccountdata[0]['columnData'];
            console.log('loadGLAccountTypeData :', Glaccountdata)
            let accountTypeObj = {}
            let accountTypeCollection = []

            const x = this.allGLAccountClassInfo.filter( (o, index) => {
                accountTypeObj = {
                    id: this.allGLAccountClassInfo[index]['gLCID'],
                    name: this.allGLAccountClassInfo[index]['gLAccountType']
                }
                accountTypeCollection.push(accountTypeObj)
            })
            this.accountTypeObject = accountTypeCollection
        })
    }

    private loadGLCashFlowClassification() {
        this.glcashFlowClassifcationService.getWorkFlows().subscribe(cahsFlowClassdata => {
            this.allGLCashFlowClassInfo = cahsFlowClassdata[0];
        })
    }

    getAccountObject(){
         this.accountListingService.getAll().subscribe(
            datalist=> {

                console.log('datalist :', JSON.stringify(datalist))
                 let accountNameObj = {}
                 let accountCodeObj = {}

                 let accountNameCollection = []
                 let accountCodeCollection = []

                const x = datalist.filter( (o, index) => {
                  accountNameObj = {
                    id: datalist[index]['accountName'],
                    name: datalist[index]['accountName']
                  }

                  accountCodeObj = {
                    id: datalist[index]['accountCode'],
                    name: datalist[index]['accountCode']
                  }

                  accountNameCollection.push(accountNameObj)
                  accountCodeCollection.push(accountCodeObj)

                })
            this.accountNameObject = accountNameCollection
            this.accountCodeObject = accountCodeCollection
            })
    }

    getLedgerObject(){
         this.accountListingService.getLedgerData().subscribe(
            datalist=> {
                console.log('getLedgerData :', JSON.stringify(datalist))
                 let obj = {}
                 let collection = []
                const x = datalist.filter( (o, index) => {
                  obj = {
                    id: datalist[index]['ledgerName'],
                    name: datalist[index]['ledgerName']
                  }
                  collection.push(obj)
                })
            this.ledgerNameObject = collection
            })
    }

    getLeafNodeObject(){
         this.accountListingService.getLeafNodeData().subscribe(
            datalist=> {
                console.log('getLeafNodeData :', JSON.stringify(datalist))
                 let obj = {}
                 let collection = []
                const x = datalist.filter( (o, index) => {
                  obj = {
                    label: datalist[index]['nodeName'],
                    value: datalist[index]['glAccountNodeId']
                  }
                  collection.push(obj)
                })
            this.leafNodeNameObj = collection
            })
    }

    private loadCompaniesData() {
        this.legalEntityservice.getEntityList().subscribe(entitydata => {
            this.companyList = entitydata[0];
            console.log('entitydata :', entitydata)

            let entityObj = {}
            let entityCollection = []
            const x = this.companyList.filter( (o, index) => {
              entityObj = {
                label: this.companyList[index]['name'],
                value: this.companyList[index]['legalEntityId']
              }
              entityCollection.push(entityObj)
            })
            this.entitiesObj = entityCollection
            console.log('entitydata :', this.entitiesObj)

        });
    }

    private load1099Miscdata() {
        this.glAccountService.getMiscdata().subscribe(miscData => {
            this.miscData = miscData[0];
            console.log('misc :', miscData)
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

    onCheckboxChagen(event, value) {
        if (event.checked) {
          this.selectedBalanceType.push(value);
        }

        if (!event.checked) {
          let index = this.selectedBalanceType.indexOf(value);
          if (index > -1) {
            this.selectedBalanceType.splice(index, 1);
          }
        }
        console.log('array :', this.selectedBalanceType)
        console.log("Interests array => " + JSON.stringify(this.selectedBalanceType, null, 2));
  }

}