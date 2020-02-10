import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { legalEntityBillingAddressModel } from '../../../../models/legalEntity-billing-address.model';
import { AuthService } from '../../../../services/auth.service';
import { getValueFromObjectByKey, getObjectByValue, editValueAssignByCondition } from '../../../../generic/autocomplete';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuditHistory } from '../../../../models/audithistory.model';
import * as $ from 'jquery';
import { ConfigurationService } from '../../../../services/configuration.service';
import { CommonService } from '../../../../services/common.service';
import { LegalEntityService } from '../../../../services/legalentity.service';

@Component({
    selector: 'app-legal-entity-billing',
    templateUrl: './legal-entity-billing.component.html',
    styleUrls: ['./legal-entity-billing.component.scss'],

})
/** anys component*/
export class EntityBillingComponent {
	@Input() savedGeneralInformationData;
	@Input() countryListOriginal;
	@Input() editGeneralInformationData;
	@Input() editMode;
	@Output() tab = new EventEmitter<any>();
	@Input() selectedlegalEntityTab: string = "";

	countryList: any[];
    selectedRowForDelete: any;
	billingInfo = new legalEntityBillingAddressModel()
	billingInfoList: any;
	billingInfoTableHeaders = [
		{ field: 'siteName', header: 'Site Name' },
		{ field: 'address1', header: 'Address1' },
		{ field: 'address2', header: 'Address2' },
		{ field: 'city', header: 'City' },
		{ field: 'stateOrProvince', header: 'State / Prov' },
		{ field: 'postalCode', header: 'Postal Code' },
		{ field: 'countryName', header: 'Country' }
    ]
    selectedColumns = this.billingInfoTableHeaders;
	viewData: any;
	id: number;
	legalEntityCode: any;
	legalEntityName: any;
	isEditMode: boolean = false;
    billingHistoryData: Object;
    modal: NgbModalRef;
    isDeleteMode: boolean = false;
    legalEntityBillingAddressId: number;
    public sourcelegalEntity: any = {}
    public auditHisory: AuditHistory[] = [];
    billingauditHisory: any[];
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    formData = new FormData();
	

    constructor(public legalEntityService: LegalEntityService, private authService: AuthService, private alertService: AlertService, private modalService: NgbModal, private configurations: ConfigurationService,
        private activeModal: NgbActiveModal, private commonService: CommonService, public workFlowtService: LegalEntityService,) {

    }


	ngOnInit(): void {

		if (this.editMode) {
            this.id = this.editGeneralInformationData.legalEntityId;
			this.getBillingDataById()
		} else {
            this.id = this.savedGeneralInformationData.legalEntityId;
            this.getBillingDataById()
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		for (let property in changes) {
            if (property == 'selectedlegalEntityTab') {
				if(changes[property].currentValue == "Billing"){
					this.getBillingDataById()
				}
			 }
		} 

      }

	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}

	filtercountry(event) {
		this.countryList = this.countryListOriginal;
		const countryData = [...this.countryListOriginal.filter(x => {
			return x.countries_name.toLowerCase().includes(event.query.toLowerCase())
		})]
		this.countryList = countryData;

	}
    saveBillingInformation() {
            const data = {
                ...this.billingInfo,
                createdBy: this.userName,
                updatedBy: this.userName,
                country: getValueFromObjectByKey('countries_id', this.billingInfo.country),
	      masterCompanyId: 1,
                isActive: true,
                legalEntityId: this.id
             
            }
            if (!this.isEditMode) {
                this.legalEntityService.newBillingAdd(data).subscribe(() => {
                    this.billingInfo = new legalEntityBillingAddressModel();
                    this.alertService.showMessage(
                        'Success',
                        `Saved  Billing Information Sucessfully `,
                        MessageSeverity.success
                    );
                    this.getBillingDataById();
                })
            } else {
                // update shipping 
                this.legalEntityService.updateBillinginfo(data).subscribe(() => {
                    this.billingInfo = new legalEntityBillingAddressModel();
                    this.alertService.showMessage(
                        'Success',
                        `Updated  Billing Information Sucessfully `,
                        MessageSeverity.success
                    );
                    this.getBillingDataById();
                })
            }
        }

	
    addBillingIfo() {
        this.isEditMode = false;
        this.billingInfo = new legalEntityBillingAddressModel();
    }
	getBillingDataById() {
        this.workFlowtService.getEntityBillViaDetails(this.id).subscribe(res => {
            this.billingInfoList = res[0]


            if (res.length > 0) {
                this.totalRecords = this.billingInfoList.length;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }

		})
	}

	openBillingView(data) {
		console.log(data);
        this.viewData = data;
    }
    toggledbldisplay(data) {
        this.viewData = data;
            $('#view').modal('show');
    }
	nextClick() {
		this.tab.emit('Shipping');
	}
	backClick() {
		this.tab.emit('Financial');
	}
    openEdit(rowData) {
        
      	this.isEditMode = true;
        this.billingInfo = { ...rowData, country: getObjectByValue('countries_id', rowData.country, this.countryListOriginal) };
	}

  
    getlegalEntityBillingHistory(content, row) {
        const { legalEntityBillingAddressId } = row;
        this.alertService.startLoadingMessage();
     
        this.legalEntityService.getlegalEntityBillingHistory(this.id, legalEntityBillingAddressId).subscribe(
            results => this.onAuditHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    private onAuditHistoryLoadSuccessful(auditHistory, content) {
        this.alertService.stopLoadingMessage();

        
        this.billingauditHisory = auditHistory;
      
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    getColorCodeForHistory(i, field, value) {
        const data = this.billingauditHisory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }

 
    async updateActiveorInActiveForBilling(rowData) {
  
        console.log(rowData);

        await this.legalEntityService.legalEntitysBillingUpdateforActive(rowData.legalEntityBillingAddressId, rowData.isActive, this.userName).subscribe(res => {

            this.getBillingDataById();
            this.alertService.showMessage(
                'Success',
                `Sucessfully Updated  Billing Status`,
                MessageSeverity.success
            );
        })
    }

    dismissModel() {
        this.modal.close();
    }
    deleteBillingInfo(content, rowData) {

        this.selectedRowForDelete = rowData;
        this.isDeleteMode = true;

     
        this.legalEntityBillingAddressId = rowData.legalEntityBillingAddressId
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    deleteItemAndCloseModel() {
        const obj = {
            isActive: false,
            addressStatus: false,
            updatedBy: this.userName,
            legalEntityBillingAddressId: this.legalEntityBillingAddressId
        }
      
        if (this.legalEntityBillingAddressId>0) {

            this.legalEntityService.updateDeleteBillinginfo(obj).subscribe(
                response => this.saveCompleted(this.sourcelegalEntity),
                error => this.saveFailedHelper(error));
        }
        this.modal.close();
    }
    private saveCompleted(user?: any) {

        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
            this.saveCompleted
        }
        this.getBillingDataById();
    }
    private saveFailedHelper(error: any) {

        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }


    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=legalEntityBillingAddress&fileName=legalEntityBillingAddress.xlsx`;
        window.location.assign(url);
    }
    customExcelUpload(event) {
        const file = event.target.files;
        console.log(file);
        if (file.length > 0) {
            this.formData.append('file', file[0])
            this.legalEntityService.BillingFileUpload(this.formData, this.id).subscribe(res => {
                event.target.value = '';

                this.formData = new FormData();
                this.getBillingDataById();
                this.alertService.showMessage(
                    'Success',
                    `Successfully Uploaded  `,
                    MessageSeverity.success
                );
            })
        }

    }
}











