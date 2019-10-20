import { Component, ViewChild, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { AtaSubChapter1Service } from '../../../services/atasubchapter1.service';
import { AtaMainService } from '../../../services/atamain.service';
import { getValueFromObjectByKey, getObjectByValue, getValueFromArrayOfObjectById } from '../../../generic/autocomplete';
import { AuthService } from '../../../services/auth.service';
import { CustomerService } from '../../../services/customer.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';

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
    @Output() tab = new EventEmitter();
    // LoadAtachapter: any = [];
    // ataMainchapter: any;
    // atasubchapter: any;
    // add_ataSubChapterList: any;
    ataChapter: any;
    atasubchapterValues: any;
    ataChapterList: { value: any; label: string; }[];
    // add_SelectedModels: any;
    // add_SelectedId: any;
    search_SelectedATA = []
    search_SelectedATASubChapter = []
    ataHeaders = [
        { field: 'ataChapterName', header: 'ATA Chapter' },
        { field: 'ataSubChapterDescription', header: 'ATA Sub-Chapter' }
    ]
    ataListDataValues: any;
    ataChapterIdUrl: string;
    ataSubchapterIdUrl: any;
    search_ataSubChapterList: any;
    // search_ataChapterList: { value: number; label: string; }[];
    id: number;
    searchATAParams: string;
    customerName: any;
    customerCode: any;


    constructor(
        private atasubchapter1service: AtaSubChapter1Service,
        private atamain: AtaMainService,
        private authService: AuthService,
        public customerService: CustomerService,
        private alertService: AlertService,
    ) { }

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

        // this.getAllATAChapter();
        this.getAllATASubChapter();

        // this.ataChapter = this.LoadAtachapter;

    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    // getAllATAChapter() {
    //     this.atamain.getAtaMainList().subscribe(res => {
    //         const responseData = res[0];
    //         // used to get the complete object in the value 
    //         this.ataChapterList = responseData.map(x => {
    //             return {
    //                 value: x,
    //                 label: x.ataChapterName
    //             }

    //         })
    //         // used to get the id for the value 
    //         this.search_ataChapterList = responseData.map(x => {
    //             return {
    //                 value: x.ataChapterId,
    //                 label: x.ataChapterName
    //             }
    //         })
    //     });
    // }

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
            // this.add_ataSubChapterList = ataSubChapter;
            this.search_ataSubChapterList = ataSubChapter;
        })


    }

    // // get subchapter by Id in the add ATA Mapping
    // getATASubChapterByATAChapter() {
    //     const selectedATAId = getValueFromObjectByKey('ataChapterId', this.add_SelectedId)
    //     this.atasubchapter1service.getATASubChapterListByATAChapterId(selectedATAId).subscribe(atasubchapter => {
    //         const responseData = atasubchapter[0];
    //         this.add_ataSubChapterList = responseData.map(x => {
    //             return {
    //                 label: x.description,
    //                 value: x
    //             }
    //         })
    //     })
    // }
    // // post the ata Mapping 
    // async addATAMapping() {
    //     // const id = this.savedGeneralInformationData.customerId;
    //     const ataMappingData = this.add_SelectedModels.map(x => {
    //         return {
    //             CustomerId: this.id,
    //             ATAChapterId: getValueFromObjectByKey('ataChapterId', this.add_SelectedId),
    //             ATASubChapterId: x.ataSubChapterId,
    //             ATAChapterCode: getValueFromObjectByKey('ataChapterCode', this.add_SelectedId),
    //             ATAChapterName: getValueFromObjectByKey('ataChapterName', this.add_SelectedId),
    //             ATASubChapterDescription: x.description,
    //             MasterCompanyId: x.masterCompanyId,
    //             CreatedBy: this.userName,
    //             UpdatedBy: this.userName,
    //             CreatedDate: new Date(),
    //             UpdatedDate: new Date(),
    //             IsDeleted: false,
    //         }
    //     })

    //     this.customerService.postCustomerATAs(ataMappingData).subscribe(res => {
    //         this.add_SelectedModels = undefined;
    //         this.add_SelectedId = undefined;
    //         this.alertService.showMessage(
    //             'Success',
    //             'Saved ATA Mapped Data Successfully ',
    //             MessageSeverity.success
    //         );
    //         this.getMappedATAByCustomerId();
    //     })

    // }
    // get mapped ata by customer id 
    getMappedATAByCustomerId() {
        // const id = this.savedGeneralInformationData.customerId;
        this.customerService.getATAMappedByCustomerId(this.id).subscribe(res => {
            this.ataListDataValues = res;
            console.log(res);

        })
    }

    // search URL generation 
    searchByFieldUrlCreateforATA() {

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


    async searchATA() {
        await this.searchByFieldUrlCreateforATA();
        this.searchATAParams = '';
        // checks where multi select is empty or not and calls the service
        if (this.ataChapterIdUrl !== '' && this.ataSubchapterIdUrl !== '') {
            this.searchATAParams = `ataChapterId=${
                this.ataChapterIdUrl
                }&ataSubChapterId=${this.ataSubchapterIdUrl}`;
        }
        else if (this.ataChapterIdUrl !== '') {
            this.searchATAParams = `ataChapterId=${this.ataChapterIdUrl}`;
        }
        else if (this.ataSubchapterIdUrl !== '') {
            this.searchATAParams = `ataSubChapterId=${this.ataSubchapterIdUrl}`;
        }

        console.log(this.searchATAParams);
        // const ItemMasterID = this.isEdit === true ? this.itemMasterId : this.collectionofItemMaster.itemMasterId;
        this.customerService
            .searchATAMappedByMultiATAIDATASUBIDByCustomerId(
                this.id,
                this.searchATAParams,
            )
            .subscribe(res => {
                this.ataListDataValues = res;
                // .map(x => {
                //     return {
                //         ataChapterName: x.ataChapterName,
                //         ataSubChapterDescription: x.ataSubChapterDescription,
                //         ataChapterCode: x.ataChapterCode,
                //         ataSubChapterId: x.ataSubChapterId,
                //         ataChapterId: x.ataChapterId
                //     };
                // });
            });
    }





    deleteATAMapping(rowData) {
        this.customerService.deleteATAMappedByContactId(rowData.customerContactATAMappingId).subscribe(res => {
            this.alertService.showMessage(
                'Success',
                'Successfully Deleted ATA Mapped Data',
                MessageSeverity.success
            );
            this.getMappedATAByCustomerId();
        })
    }

    nextClick() {
        this.tab.emit('Financial');
    }
    backClick() {
        this.tab.emit('AircraftInfo');
    }

}