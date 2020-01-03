import { OnInit, Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { fadeInOut } from "../../../services/animations";
import { AlertService, MessageSeverity } from "../../../services/alert.service";
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
    poroCategoryReq: boolean;
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
    balanceTypeCheckBoxReq = false;
    glAccountObj:any = {}
    ledgerNameObject: any[];
    accountCodeObject: any[];
    accountNameObject: any[];
    accountTypeObject: any[];

    ledgerNameObjectData: any[];
    accountCodeObjectData: any[];
    accountNameObjectData: any[];
    accountTypeObjectData: any[];

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
       // this.loadCompaniesData();
        this.load1099Miscdata();
        this.loadGLCashFlowClassification();
        this.loadNodeSetup();
        this.loadPOCategory();
        if (this.glAccountService.glAccountEditCollection == null) {
            this.currentGLAccount.activeFlag = true;
            this.currentGLAccount.allowManualJE = true;
        }
        
        let formatted_date = this.formatDateTime(null)

        this.accountListCreateForm = this.formBuilder.group({
            ledgerName: ['', Validators.required],
            oldAccountCode: '',
            accountCode: ['', Validators.required],
            accountName: ['', Validators.required],
            glAccountTypeId: ['', Validators.required],
            accountDescription: '',
            activeFlag: [true, Validators.required],
            leafNodeName: '',
            interCompany: false,
            category: null,
            entities: null,
            allowManualJE: true,
            classification: [null, Validators.required],
            poroCategory: null,
            createdBy: this.userName,
            createdDate: formatted_date,
            balanceTypeCheckBox: this.formBuilder.array(this.balanceTypeCheckBox.map(x => x.value))
        });

        this.getAccountObject()
        this.getLedgerObject()
        this.getLeafNodeObject()
        this.onFormDataChanges()
    }

    onFormDataChanges(): void {        
      
        this.accountListCreateForm.get('glAccountTypeId').valueChanges
        .subscribe(value => {           
            this.accountListCreateForm.get('poroCategory').disable();
            if (value != 1 || value != 5) {                
                this.accountListCreateForm.get('poroCategory').disable();
            } else {
                if(this.accountListCreateForm.get('accountCode').value){
                    this.accountListCreateForm.get('poroCategory').enable()
                }                           
            }
        });
    }

    get formdata() { return this.accountListCreateForm.controls; }

    onSubmitAccountForm(){

         this.submittedForm = true;
         this.balanceTypeCheckBoxReq = false;
        // stop here if form is invalid
        if (this.accountListCreateForm.invalid) {
            return;
        }

        const checkboxControl = (this.accountListCreateForm.controls.balanceTypeCheckBox as FormArray);
        
        if(!this.accountListCreateForm.value.balanceTypeCheckBox[0] && !this.accountListCreateForm.value.balanceTypeCheckBox[1] && !this.accountListCreateForm.value.balanceTypeCheckBox[2]){
            this.balanceTypeCheckBoxReq = true;
            return;
        }

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
               this.alertService.showMessage("Success", 'GLAccount Created successfully.', MessageSeverity.success);
               this.router.navigateByUrl('/generalledgermodule/generalledgerpage/app-account-listing');
            })
        }
    }

    formatDateTime(dateTime){
        let formattedDateTime;
        if(dateTime){
            dateTime = new Date(dateTime)           
            if(dateTime instanceof Date)
                formattedDateTime = (dateTime.getMonth() + 1) + "/" + dateTime.getDate() +  "/" + dateTime.getFullYear()
            else
                this.formatDateTime(null)
        }else{
            dateTime = new Date()
            formattedDateTime = (dateTime.getMonth() + 1) + "/" + dateTime.getDate() +  "/" + dateTime.getFullYear()
        }
        return formattedDateTime
    }

    loadLedgerNames(event){
        this.ledgerNameObject = [...this.ledgerNameObjectData.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]
    }

    checkLedgerNameExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.ledgerNameObjectData)
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

        this.accountCodeObject = [...this.accountCodeObjectData.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]
    }

    checkAccountCodeExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.accountCodeObjectData)
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
        
        this.accountNameObject = [...this.accountNameObjectData.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]
    }

    checkAccountNameExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.accountNameObjectData)
        if (exists.length > 0) {

            this.isAccountNameExists = true;
        } else {

            this.isAccountNameExists = false;
        }

    }

    selectedAccountName() {       
        //this.accountListCreateForm.get('accountName').patchValue(this.glAccountObj.accountCodeName);
        this.isAccountNameExists = true;
    }


    loadAccountType(event){
        
        this.accountTypeObject = [...this.accountTypeObjectData.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]
    }

    checkAccountTypeExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.accountTypeObjectData)
        if (exists.length > 0) {

            this.isAccountTypeExists = true;
        } else {

            this.isAccountTypeExists = false;
        }

    }

    selectedAccountType() {
        this.isAccountTypeExists = true;
    }

    updateAccountData(id:Number): void{
        //this.poroCategoryDisable: boolean = true

        this.accountListingService.getGlAccountById(id).subscribe(
            glAccountData => {
                const data = glAccountData[0];                             
                if(data && Object.keys(data).length > 0){                   
                    Object.keys(data).forEach(key => {
                        let formControl = <FormControl>this.accountListCreateForm.controls[key];
                        if(formControl){
                            formControl.setValue(data[key]);
                            if(key === "createdDate"){
                                const format_date = this.formatDateTime(data[key])
                                formControl.setValue(format_date);
                            }
                        }
                    });

                    this.glAccountObj = {
                        ledgername: {
                            id: data.ledgerName,
                            name: data.ledgerName
                        },
                        accountCodeId: {
                            id: data.accountCode,
                            name: data.accountCode
                        },
                        accountCodeName: {
                            id : data.accountName,
                            name : data.accountName
                        },
                        accountTypeId: data.glAccountTypeId,
                        leafNodeName: data.leafNodeName,                                             
                        poroCategoryId: data.poroCategoryId,
                        classificationId: data.glClassFlowClassificationId                       
                    }
                    this.accountListCreateForm.get('balanceTypeCheckBox').patchValue([data.balanceTypeActual, data.balanceTypeBudget, data.balanceTypeForecast])

                }
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
            //this.allGLAccountClassInfo = Glaccountdata[0]['columnData'];
            this.allGLAccountClassInfo = Glaccountdata[0];            
            let accountTypeObj = {}
            let accountTypeCollection = []

            const x = this.allGLAccountClassInfo.filter( (o, index) => {               
                accountTypeObj = {
                    id: this.allGLAccountClassInfo[index]['glcid'],
                    name: this.allGLAccountClassInfo[index]['glAccountClassName']
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
                this.accountNameObjectData = accountNameCollection           
                this.accountCodeObjectData = accountCodeCollection
           
            })
    }

    getLedgerObject(){
         this.accountListingService.getLedgerData().subscribe(
            datalist=> {
                console.log('getLedgerData :', JSON.stringify(datalist))
                 let obj = {}
                 let collection = []
                const x = datalist.filter((o, index) => {
                    if (datalist[index]['ledgerName'] && datalist[index]['parentId']) {
                        obj = {
                            id: datalist[index]['parentId'],
                            name: datalist[index]['ledgerName']
                        }
                        collection.push(obj)
                    }                  
                })
            this.ledgerNameObjectData = collection
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
            

        });
    }

    private load1099Miscdata() {
        this.glAccountService.getMiscdata().subscribe(miscData => {
            console.log('misc 1 :', miscData)
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

    loadEntityByParentId(event) {       
        if (Object.keys(event).length) {            
            this.accountListingService.getEntitiesByParentId(event.id).subscribe(entitydata => {
                if (entitydata) {
                    var entityObj = {}
                    var entityCollection = []
                    const x = entitydata.filter((o, index) => {
                        entityObj = {
                            label: entitydata[index]['name'],
                            value: entitydata[index]['legalEntityId']
                        }
                        entityCollection.push(entityObj)
                    })
                    this.entitiesObj = entityCollection
                }
            });
        }        
    }

}