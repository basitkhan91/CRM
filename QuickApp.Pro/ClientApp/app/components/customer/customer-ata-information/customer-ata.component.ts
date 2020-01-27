import { Component, ViewChild, OnInit, SimpleChanges, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { AtaSubChapter1Service } from '../../../services/atasubchapter1.service';
import { AtaMainService } from '../../../services/atamain.service';
import { getValueFromObjectByKey, getObjectByValue, getValueFromArrayOfObjectById } from '../../../generic/autocomplete';
import { AuthService } from '../../../services/auth.service';
import { CustomerService } from '../../../services/customer.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';

import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-customer-ata',
    templateUrl: './customer-ata.component.html',
    styleUrls: ['./customer-ata.component.scss'],

})
/** anys component*/
export class CustomerATAInformationComponent implements OnInit {
    @Input() savedGeneralInformationData;
    @Input() editGeneralInformationData;
    @Input() editMode;
    @Input() search_ataChapterList;
    @Input() ataListDataValues = [];
    @Input() contactList;
    @Output() tab = new EventEmitter();
    @Output() refreshCustomerATAMapped = new EventEmitter();
       ataChapter: any;
    atasubchapterValues: any;
    ataChapterList: { value: any; label: string; }[];
     search_SelectedATA = []
    search_SelectedContact = []
    search_SelectedATASubChapter = []
    ataHeaders = [
        { field: 'firstName', header: 'Contact' },
        { field: 'ataChapterName', header: 'ATA Chapter' },
        { field: 'ataSubChapterDescription', header: 'ATA Sub-Chapter' }

    ]
    showAdvancedSearchCard : boolean = false;
    selectedColumns = this.ataHeaders;
     ataChapterIdUrl: string;
    contactIdUrl: string;
    ataSubchapterIdUrl: any;
    search_ataSubChapterList: any;
     id: number;
    contactid: number;
    searchATAParams: string;
    customerName: any;
    customerCode: any;
    modal: NgbModalRef;
    isDeleteMode: boolean = false;
    public sourceCustomer: any = {}
    customerContactATAMappingId: number;
    selectedRowForDelete: any;
    @Input() selectedTab: string = "";
    totalRecords: number = 0;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number = 0;

      constructor(
        private atasubchapter1service: AtaSubChapter1Service,
        private atamain: AtaMainService,
        private authService: AuthService,
        public customerService: CustomerService,
        private alertService: AlertService,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
    ) {
    }

    ngOnInit() {
        if (this.editMode) {
            this.id = this.editGeneralInformationData.customerId;


            this.customerCode = this.editGeneralInformationData.customerCode;
            this.customerName = this.editGeneralInformationData.name;
            this.getMappedATAByCustomerId();
        } else {
            this.id = this.savedGeneralInformationData.customerId;
            this.customerCode = this.savedGeneralInformationData.customerCode;
            this.customerName = this.savedGeneralInformationData.name;
        }

           this.getAllATASubChapter();
    
    }
  

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

   
   

    // get all subchapters
    getAllATASubChapter() {
        this.atasubchapter1service.getAtaSubChapter1List().subscribe(res => {
            const ataSubChapter = res[0].map(x => {
                return {
                    label: x.description,
                    value: x
                }
            })
            // making copy for the subchapters in both add and seach 
                 this.search_ataSubChapterList = ataSubChapter;
        })


    }

    // get mapped ata by customer id 
    getMappedATAByCustomerId() {
        this.customerService.getATAMappedByCustomerId(this.id).subscribe(res => {
            this.ataListDataValues = res;
            console.log(res);
            if (res.length > 0) {
                this.totalRecords = res.length;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }

        })
    }

    // search URL generation 
    searchByFieldUrlCreateforATA() {
        if (this.search_SelectedContact.length > 0) {
            const contactIds = this.search_SelectedContact.reduce((acc, value) => {
                return `${acc},${value}`;
            }, '');
            this.contactIdUrl = contactIds.substr(1);
        } else {
            this.contactIdUrl = '';
        }
        if (this.search_SelectedATA.length > 0) {
            const ataIds = this.search_SelectedATA.reduce((acc, value) => {
                return `${acc},${value}`;
            }, '');
            this.ataChapterIdUrl = ataIds.substr(1);
        } else {
            this.ataChapterIdUrl = '';
        }
        if (this.search_SelectedATASubChapter.length > 0) {
            const ataSubchapterIds = this.search_SelectedATASubChapter.reduce((acc, id) => {
                return `${acc},${id}`;
            }, '');
            this.ataSubchapterIdUrl = ataSubchapterIds.substr(1);
        } else {
            this.ataSubchapterIdUrl = '';
        }
    }

    // get sub chapter by multiple ids in the search
    getSubChapterByATAChapter() {

        console.log(this.search_SelectedATA);
        this.searchByFieldUrlCreateforATA();

        if (this.ataChapterIdUrl !== '') {
            this.atamain
                .getMultiATASubDesc(this.ataChapterIdUrl)
                .subscribe(atasubchapter => {

                    const responseData = atasubchapter;

                    this.search_ataSubChapterList = responseData.map(x => {
                        return {
                            label: x.description,
                            value: x.ataSubChapterId
                        };
                    });
                });

        } else {
            this.getAllATASubChapter();
        }
    }

    getContactsByCustomerId() {
         this.customerService.getContactsByCustomerId(this.id).subscribe(res => {
            const responseData: any = res;
                this.contactList = responseData.map(x => {
                    return {
                        label: x.firstName, value: x.contactId
                    }
                })

                
            
            })
        
    }

    async searchATA() {
        await this.searchByFieldUrlCreateforATA();
        this.searchATAParams = '';
        // checks where multi select is empty or not and calls the service
        if (this.ataChapterIdUrl !== '' && this.ataSubchapterIdUrl !== '' && this.contactIdUrl!=='') {
          
            this.searchATAParams = `contactId=${this.contactIdUrl}&ataChapterId=${
                this.ataChapterIdUrl
                }&ataSubChapterId=${this.ataSubchapterIdUrl}`;
        }
        else if (this.ataChapterIdUrl !== '' && this.contactIdUrl !== '') {

            this.searchATAParams = `contactId=${this.contactIdUrl}&ataChapterId=${this.ataChapterIdUrl}`;
        }
        else if (this.ataSubchapterIdUrl !== ''  && this.contactIdUrl !== '') {
            this.searchATAParams = `contactId=${this.contactIdUrl}&ataSubChapterId=${this.ataSubchapterIdUrl}`;
        }
        else if (this.ataSubchapterIdUrl !== '' && this.ataChapterIdUrl !== '') {
            this.searchATAParams = `ataChapterId=${this.ataChapterIdUrl}&ataSubChapterId=${this.ataSubchapterIdUrl}`;
        }

        else if (this.ataChapterIdUrl !== '') {

            this.searchATAParams = `ataChapterId=${this.ataChapterIdUrl}`;
        }
        else if (this.ataSubchapterIdUrl !== '') {
            this.searchATAParams = `ataSubChapterId=${this.ataSubchapterIdUrl}`;
        }

        else if (this.contactIdUrl !== '') {
            this.searchATAParams = `contactId=${this.contactIdUrl}`;
        }

        console.log(this.searchATAParams);
         this.customerService
            .searchATAMappedByMultiATAIDATASUBIDByCustomerId(
                this.id,
                this.searchATAParams,
            )
            .subscribe(res => {
                this.ataListDataValues = res;
                if (res.length > 0) {
                    this.totalRecords = res.length;
                    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
                }

                this.contactIdUrl = '';
                this.ataSubchapterIdUrl = '';
                this.ataChapterIdUrl = '';
                // this.search_SelectedContact = [];
                // this.search_SelectedATASubChapter = [];
                // this.search_SelectedATA = [];
                        });
    }



    nextClick() {
        this.tab.emit('Financial');
    }
    backClick() {
        this.tab.emit('AircraftInfo');
    }


    dismissModel() {
        this.modal.close();
    }
    deleteATAMapping(content, rowData) {
        this.selectedRowForDelete = rowData;
        this.isDeleteMode = true;


        this.customerContactATAMappingId = rowData.customerContactATAMappingId
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    deleteItemAndCloseModel() {

        let airCraftingMappingId = this.customerContactATAMappingId;
        if (airCraftingMappingId > 0) {

            this.customerService.deleteATAMappedByContactId(airCraftingMappingId).subscribe(
                response => this.saveCompleted(this.sourceCustomer),
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
        this.getMappedATAByCustomerId();
    }
    private saveFailedHelper(error: any) {

        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }
    enableDisableAdvancedSearch (val){        
        this.showAdvancedSearchCard = val;
        this.search_SelectedContact = [];
        this.search_SelectedATA = [];
        this.search_SelectedATASubChapter = [];
        this.getMappedATAByCustomerId();
    }


}