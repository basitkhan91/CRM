import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { PageHeaderComponent } from '../../../../shared/page-header.component';
import * as $ from 'jquery';
import { EmployeeService } from '../../../../services/employee.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuItem } from 'primeng/api';//bread crumb
import { Charge } from '../../../../models/charge.model';
import { MasterCompany } from '../../../../models/mastercompany.model';
import { AuditHistory } from '../../../../models/audithistory.model';
import { AuthService } from '../../../../services/auth.service';
import { ReceivingCustomerWorkService } from '../../../../services/receivingcustomerwork.service';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { CustomerService } from '../../../../services/customer.service';
import { Condition } from '../../../../models/condition.model';
import { ConditionService } from '../../../../services/condition.service';
import { VendorService } from '../../../../services/vendor.service';
import { BinService } from '../../../../services/bin.service';
import { SiteService } from '../../../../services/site.service';
import { Site } from '../../../../models/site.model';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { Router, ActivatedRoute } from '@angular/router';
import { getValueFromObjectByKey, getObjectByValue, getValueFromArrayOfObjectById, getObjectById, editValueAssignByCondition } from '../../../../generic/autocomplete';
import { CommonService } from '../../../../services/common.service';
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { StocklineService } from '../../../../services/stockline.service';
import { ConfigurationService } from '../../../../services/configuration.service';

@Component({
    selector: 'app-customer-work-setup',
    templateUrl: './customer-work-setup.component.html',
    styleUrls: ['./customer-work-setup.component.scss'],
    animations: [fadeInOut],
	providers: [DatePipe]
})

export class CustomerWorkSetupComponent implements OnInit {

    receivingForm: any = {};
    isEditMode: boolean = false;
    private onDestroy$: Subject<void> = new Subject<void>();
    breadcrumbs: MenuItem[] = [
        { label: 'Receiving' },
        { label: 'Customer Work' },
        { label: 'Create Customer Work' }
    ];
    allCustomersList: any = [];
    allVendorsList: any = [];
    allCompanyList: any = [];
    customersList: any = [];
    vendorsList: any = [];
    companyList: any = [];
    allEmployeeList: any = [];
    employeeNames: any = [];
    allCustomersInfo: any = [];
    customerNamesInfo: any = [];
    customerCodesInfo: any = [];
    allPartnumbersList: any = [];
    partNumbersInfo: any = [];
    allWareHouses: any = [];
    allLocations: any = [];
    allShelfs: any = [];
	allBins: any = [];
    allSites: any = [];
    managementStructure = {
        companyId: 0,
        buId: 0,
        divisionId: 0,
        departmentId: 0,
    }
    legalEntityList: any = [];	
	businessUnitList: any = [];
    divisionList: any = [];
    departmentList: any = [];
    allConditionInfo: any = [];
    customerContactList: any = [];
    customerContactInfo: any = [];
    customerPhoneInfo: any = [];
    allTagTypes: any = [];
    currentDate = new Date();
    disableMagmtStruct: boolean = true;
    textAreaInfo: string;
	textAreaLabel: string;
	receivingCustomerWorkId: number;
	workOrderId: number;
    sourceTimeLife: any = {};
    customerId: number;    
    timeLifeCyclesId: number;    
    disableCondition: boolean = true;
    disableSite: boolean = true;
    loadingIndicator: boolean;
    formData = new FormData();
    customerWorkDocumentsList: any = [];

    // firstCollection: any[];
	// allEmployeeinfo: any[] = [];
    // loadingIndicator: boolean;
    // dataSource: any;
    // disableSavepartNumber: boolean;
    // selectedActionName: any;
	// itemclaColl: any[]=[];
    // allPartnumbersInfo: any[] =[];
    // partCollection: any[];
    // isSaving: boolean;
	// isDeleteMode: boolean;
	// isEditMode: boolean = false;
    // modal: any;
    // Active: string;
    // allComapnies: MasterCompany[];
    // auditHisory: any[];
    // allRecevinginfo: any[]=[];
	// allActions: any[] = [];
	// customerId: any;
    // customerNames: any[];
    // partListData: any[] = [];
    // custcodes: { customerId: any; name: any; }[];
    // customerNamecoll: any;
    // selectedColumns: any;
    // cols: any;
    // disableSavepartDescription: boolean;
    // disableSavemanufacturer: boolean;
    // descriptionbyPart: any[]=[];
    // allConditionInfo: Condition[];
    // sourceTimeLife: any = {};
    // allCustomer: any[];
    // allVendorList: any[];
    // chargeName: any;
    // allEmpActions: any[]=[];
    // sourceAction: any;
    // showRestrictQuantity: boolean;
    // showFreeQuantity: boolean;
    // showNormalQuantity: boolean = true;
    // allWareHouses: any[];
    // allLocations: any[];
    // allShelfs: any[];
	// allBins: any[];
	// allSites: Site[];
	// allManagemtninfo: any[] = [];
	// maincompanylist: any[] = [];
    // disableSaveCusCode: boolean;
    // CustomerInfoByName: any[] = [];
    // disableSaveCusName: boolean;
    // display: boolean;
    // modelValue: boolean;
    // alldata: any;
    // firstNames: any[];
    // workPhone: any[]=[];
    // local: any;
    // collectionofstockLineTimeLife: any;
    // value: number;
    // collectionofstockLine: any;
    // showLable: boolean;
    // showCustomer: boolean;
    // showOther: boolean;
    // showVendor: boolean;
    // showCompany: boolean;
    // showCustomer1: boolean;
    // showOther1: boolean;
    // showVendor1: boolean;
    // showCompany1: boolean;
    // showCustomer2: boolean;
    // showOther2: boolean;
    // showVendor2: boolean;
    // showCompany2: boolean;
    // obtainFrom: string;
    // alllegalEntityInfo: any[] = [];
    // departmentList: any[] = [];
    // bulist: any[] = [];
    // divisionlist: any[] = [];
    // updateMode: boolean = false;
    // managementStructureData: any[];
    // parentManagementInfo: any[] = [];
    // childManagementInfo: any[] = [];
    // customerReferenceNames: any[];
    // customerContactList: any[];
    // tempPOHeaderAddress: any = {};
    // sourcePoApproval: any = {};
    // receivingForm: any = {};
    // public allWorkFlows: any[] = [];

    constructor(private commonService: CommonService, private customerService: CustomerService, private binService: BinService, private siteService: SiteService, private conditionService: ConditionService, private datePipe: DatePipe, private _actRoute: ActivatedRoute, private receivingCustomerWorkService: ReceivingCustomerWorkService, private authService: AuthService, private router: Router, private alertService: AlertService, private stocklineService: StocklineService, private configurations: ConfigurationService) {
        this.receivingForm.receivingNumber = 'Creating';
        this.receivingForm.conditionId = 0;
        this.receivingForm.siteId = 0;
        this.receivingForm.warehouseId = 0;
        this.receivingForm.locationId = 0;
        this.receivingForm.shelfId = 0;
        this.receivingForm.binId = 0;
        this.receivingForm.obtainFromTypeId = 0;
        this.receivingForm.ownerTypeId = 0;
        this.receivingForm.traceableToTypeId = 0;
        this.receivingForm.tagTypeId = 0;
        this.receivingForm.isCustomerStock = true;
        this.receivingForm.receivedDate = new Date();
    }

    ngOnInit() {
        this.loadPartNumData();
        this.loadEmployeeData();
        this.loadCustomerData();
        this.loadVendorData();
        this.loadCompanyData();
        this.customerList();
        this.loadSiteData();
        this.getLegalEntity();
        this.loadConditionData();
        this.loadTagTypes();

        this.receivingCustomerWorkId = this._actRoute.snapshot.params['id'];
        if(this.receivingCustomerWorkId) {
            this.isEditMode = true;
            this.getReceivingCustomerDataonEdit(this.receivingCustomerWorkId);
            this.toGetDocumentsList(this.receivingCustomerWorkId);
            this.breadcrumbs = [
                { label: 'Receiving' },
                { label: 'Customer Work' },
                { label: 'Edit Customer Work' }
            ];
        }
    }

    get userName(): string {
        return this.authService.currentUser
          ? this.authService.currentUser.userName
          : '';
      }

    private loadPartNumData() {
		this.commonService.smartDropDownList('ItemMaster', 'ItemMasterId', 'partnumber').subscribe(response => {
			this.allPartnumbersList = response;
		});
	}

    loadEmployeeData() {
		this.commonService.smartDropDownList('Employee', 'employeeId', 'firstName').subscribe(res => {
            this.allEmployeeList = res;
            if(this.isEditMode) {
                this.receivingForm.employeeId = getObjectById('value', this.receivingForm.employeeId, this.allEmployeeList);
                // this.receivingForm.certifiedById = getObjectById('value', this.receivingForm.certifiedById, this.allEmployeeList);
            }
		})
	}

    loadCustomerData() {
        this.commonService.smartDropDownList('Customer', 'CustomerId', 'Name').subscribe(response => {
            this.allCustomersList = response;
            // if(this.isEditMode) {
            //     this.receivingForm.referenceId = getObjectById('value', this.receivingForm.referenceId, this.allCustomersList);
            // }
        });
    }
    
    private customerList() {
		this.customerService.getWorkFlows().subscribe(res => {
            this.allCustomersInfo = res[0];
            if(this.isEditMode) {
                this.onSelectCustomeronEdit(this.customerId);
            }
        });
    }

	loadVendorData() {
		this.commonService.smartDropDownList('Vendor', 'VendorId', 'VendorName').subscribe(response => {
			this.allVendorsList = response;
		});
	}

	loadCompanyData() {
		this.commonService.smartDropDownList('LegalEntity', 'LegalEntityId', 'Name').subscribe(res => {
			this.allCompanyList = res;
		})
    }

    private loadSiteData() {
		this.siteService.getSiteList().subscribe(res => {
            this.allSites = res[0];
        });
    }

    private loadConditionData() {
		this.conditionService.getConditionList().subscribe(res => {
            this.allConditionInfo = res[0];
        });
	}
    
    getLegalEntity() {
        this.commonService.getLegalEntityList().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.legalEntityList = res;
        })
    }

    loadTagTypes() {
		this.stocklineService.getAllTagTypes().subscribe(res => {
			this.allTagTypes = res;
		});
	}

     getReceivingCustomerDataonEdit(id) {
        this.receivingCustomerWorkService.getCustomerWorkdataById(id).subscribe(res => {
            console.log(res);
            this.customerId = res.customerId;
            this.receivingForm = {
                ...res,
                //employeeId: getObjectById('value', res.employeeId, this.allEmployeeList),
                //certifiedById: getObjectById('value', res.certifiedById, this.allEmployeeList),
                itemMasterId: getObjectById('value', res.itemMasterId, this.allPartnumbersList),
                //referenceId: getObjectById('value', res.referenceId, this.allCustomersList),
                tagDate: res.tagDate ? new Date(res.tagDate) : '',
                mfgDate: res.mfgDate ? new Date(res.mfgDate) : '',
                expDate: res.expDate ? new Date(res.expDate) : '',
                timeLifeDate: res.timeLifeDate ? new Date(res.timeLifeDate) : '',
            };
            //this.onSelectCustomeronEdit(res.customerId);            
            this.onPartNumberSelected(res.itemMasterId);
            this.getManagementStructureOnEdit(res.managementStructureId);
            this.getSiteDetailsOnEdit(res);
            this.getObtainOwnerTraceOnEdit(res);
            if(res.timeLifeCyclesId != null  || res.timeLifeCyclesId != 0) {
                this.timeLifeCyclesId = res.timeLifeCyclesId;
                this.getTimeLifeOnEdit(res.timeLifeCyclesId);
            }            
            this.customerList();
            this.loadEmployeeData();
            this.onChangeSiteName();
            this.onSelectCondition();
        });
    }

    getManagementStructureOnEdit(managementStructureId) {
        this.commonService.getManagementStructureDetails(managementStructureId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.selectedLegalEntity(res.Level1);
            this.selectedBusinessUnit(res.Level2);
            this.selectedDivision(res.Level3);
            this.selectedDepartment(res.Level4);
            this.managementStructure = {
                companyId: res.Level1 !== undefined ? res.Level1 : 0,
                buId: res.Level2 !== undefined ? res.Level2 : 0,
                divisionId: res.Level3 !== undefined ? res.Level3 : 0,
                departmentId: res.Level4 !== undefined ? res.Level4 : 0,
            }
        })
    }

    getSiteDetailsOnEdit(res) {
        this.siteValueChange(res.siteId);
        this.wareHouseValueChange(res.warehouseId);
        this.locationValueChange(res.locationId);
        this.shelfValueChange(res.binId);
        this.receivingForm.warehouseId = res.warehouseId;
        this.receivingForm.locationId = res.locationId;
        this.receivingForm.shelfId = res.shelfId;
        this.receivingForm.binId = res.binId;        
    }

    getObtainOwnerTraceOnEdit(res) {
        //obtain from
        if(res.obtainFromTypeId == 1) {
            this.receivingForm.obtainFrom = getObjectById('value', res.obtainFrom, this.allCustomersList);
        }
        else if(res.obtainFromTypeId == 2) {
            this.receivingForm.obtainFrom = getObjectById('value', res.obtainFrom, this.allVendorsList);
        }
        else if(res.obtainFromTypeId == 3) {
            this.receivingForm.obtainFrom = getObjectById('value', res.obtainFrom, this.allCompanyList);
        }
        else if(res.obtainFromTypeId == 4) {
            this.receivingForm.obtainFrom = res.obtainFrom;
        }

        //owner
        if(res.ownerTypeId == 1) {
            this.receivingForm.owner = getObjectById('value', res.owner, this.allCustomersList);
        }
        else if(res.ownerTypeId == 2) {
            this.receivingForm.owner = getObjectById('value', res.owner, this.allVendorsList);
        }
        else if(res.ownerTypeId == 3) {
            this.receivingForm.owner = getObjectById('value', res.owner, this.allCompanyList);
        }
        else if(res.ownerTypeId == 4) {
            this.receivingForm.owner = res.owner;
        }

        //traceable to
        if(res.traceableToTypeId == 1) {
            this.receivingForm.traceableTo = getObjectById('value', res.traceableTo, this.allCustomersList);
        }
        else if(res.traceableToTypeId == 2) {
            this.receivingForm.traceableTo = getObjectById('value', res.traceableTo, this.allVendorsList);
        }
        else if(res.traceableToTypeId == 3) {
            this.receivingForm.traceableTo = getObjectById('value', res.traceableTo, this.allCompanyList);
        }
        else if(res.traceableToTypeId == 4) {
            this.receivingForm.traceableTo = res.traceableTo;
        }
    }

    getTimeLifeOnEdit(timeLifeId) {
        this.stocklineService.getStockLineTimeLifeList(timeLifeId).subscribe(res => {
            console.log(res);
            this.sourceTimeLife = res[0];
        });
    }
    
    selectedLegalEntity(legalEntityId) {
		this.businessUnitList = [];
		this.divisionList = [];
		this.departmentList = [];
		this.managementStructure.buId = 0;
		this.managementStructure.divisionId = 0;
		this.managementStructure.departmentId = 0;

        if (legalEntityId != 0 && legalEntityId != null && legalEntityId != undefined) {
            this.receivingForm.managementStructureId = legalEntityId;
            this.commonService.getBusinessUnitListByLegalEntityId(legalEntityId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
                this.businessUnitList = res;
			});
			this.disableMagmtStruct = false;
		} else {
			this.disableMagmtStruct = true;
		}
    }
    selectedBusinessUnit(businessUnitId) {
		this.divisionList = [];
		this.departmentList = [];
		this.managementStructure.divisionId = 0;
		this.managementStructure.departmentId = 0;

        if (businessUnitId != 0 && businessUnitId != null && businessUnitId != undefined) {
            this.receivingForm.managementStructureId = businessUnitId;
            this.commonService.getDivisionListByBU(businessUnitId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
                this.divisionList = res;
            })
        }
    }
    selectedDivision(divisionUnitId) {
		this.departmentList = [];
		this.managementStructure.departmentId = 0;

        if (divisionUnitId != 0 && divisionUnitId != null && divisionUnitId != undefined) {
            this.receivingForm.managementStructureId = divisionUnitId;
            this.commonService.getDepartmentListByDivisionId(divisionUnitId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
                this.departmentList = res;
            })
        }
    }
    selectedDepartment(departmentId) {
        if (departmentId != 0 && departmentId != null && departmentId != undefined) {
            this.receivingForm.managementStructureId = departmentId;
        }
	}

    filterPartNumbers(event) {
		this.partNumbersInfo = this.allPartnumbersList;
		if (event.query !== undefined && event.query !== null) {
			const partNumberFilter = [...this.allPartnumbersList.filter(x => {
				return x.label.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.partNumbersInfo = partNumberFilter;
		}
	}

    filterEmployees(event) {
		this.employeeNames = this.allEmployeeList;

		if (event.query !== undefined && event.query !== null) {
			const empFirstName = [...this.allEmployeeList.filter(x => {
				return x.label;
			})]
			this.employeeNames = empFirstName;
		}
	}
    
    filterCustomerNames(event) {
		this.customersList = this.allCustomersList;

		if (event.query !== undefined && event.query !== null) {
			const customers = [...this.allCustomersList.filter(x => {
				return x.label.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.customersList = customers;
		}
    }    

    filterCustNames(event) {
		this.customerNamesInfo = this.allCustomersInfo;

		if (event.query !== undefined && event.query !== null) {
			const customers = [...this.allCustomersInfo.filter(x => {
				return x.name.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.customerNamesInfo = customers;
		}
    }

    filterCustCodes(event) {
		this.customerCodesInfo = this.allCustomersInfo;

		if (event.query !== undefined && event.query !== null) {
			const customers = [...this.allCustomersInfo.filter(x => {
				return x.customerCode.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.customerCodesInfo = customers;
		}
    }

    filterCustContacts(event) {
		this.customerContactInfo = this.customerContactList;

		if (event.query !== undefined && event.query !== null) {
			const customers = [...this.customerContactList.filter(x => {
                return x.contactName.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.customerContactInfo = customers;
		}
    }

    filterCustContactPhone(event) {
		this.customerPhoneInfo = this.customerContactList;

		if (event.query !== undefined && event.query !== null) {
			const customers = [...this.customerContactList.filter(x => {
				return x.workPhone.toLowerCase().includes(event.query.toLowerCase())
			})]
            this.customerPhoneInfo = customers;
		}
    }

	filterVendorNames(event) {
		this.vendorsList = this.allVendorsList;

		if (event.query !== undefined && event.query !== null) {
			const vendors = [...this.allVendorsList.filter(x => {
				return x.label.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.vendorsList = vendors;
		}
	}

	filterCompanyNames(event) {
		this.companyList = this.allCompanyList;

		if (event.query !== undefined && event.query !== null) {
			const companies = [...this.allCompanyList.filter(x => {
				return x.label.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.companyList = companies;
		}
    }    
    
    siteValueChange(siteId) {
		this.allWareHouses = [];
		this.allLocations = [];
		this.allShelfs = [];
        this.allBins = [];
        this.receivingForm.warehouseId = 0;
		this.receivingForm.locationId = 0;
		this.receivingForm.shelfId = 0;
		this.receivingForm.binId = 0;
		this.binService.getWareHouseDate(siteId).subscribe(res => {
            this.allWareHouses = res;
        });
        this.onChangeSiteName();
    }

    onChangeSiteName() {
        if (this.receivingForm.siteId != 0) {
			this.disableSite = false;
		} else {
			this.disableSite = true;
		}
    }
    
    wareHouseValueChange(warehouseId) {
		this.allLocations = [];
		this.allShelfs = [];
		this.allBins = [];
		this.receivingForm.locationId = 0;
		this.receivingForm.shelfId = 0;
		this.receivingForm.binId = 0;
		this.binService.getLocationDate(warehouseId).subscribe(res => {
            this.allLocations = res;
        });
    }
    
    locationValueChange(locationId) {
		this.allShelfs = [];
		this.allBins = [];
		this.receivingForm.shelfId = 0;
		this.receivingForm.binId = 0;
		this.binService.getShelfDate(locationId).subscribe(res => {
            this.allShelfs = res;
        });
    }
    
    shelfValueChange(binId) {
		this.allBins = [];
		this.receivingForm.binId = 0;

		this.binService.getBinDataById(binId).subscribe(res => {
            this.allBins = res;
        });
    }

    onAddTextAreaInfo(value) {
		if(value == 'memo') {
			this.textAreaLabel = 'Memo';
			this.textAreaInfo = this.receivingForm.memo;
		}
	}

	onSaveTextAreaInfo() {
		if(this.textAreaLabel == 'Memo') {
			this.receivingForm.memo = this.textAreaInfo;
		}
    }
    
    onSelectCustomer(value) {
        this.receivingForm.customerCode = value;   
        this.receivingForm.customerId = value;  
        this.getAllCustomerContact(value.customerId); 
    }

    onSelectCustomeronEdit(id) {
        const customerObj = getObjectById('customerId', id, this.allCustomersInfo);
        this.receivingForm.customerCode = customerObj;   
        this.receivingForm.customerId = customerObj;  
        this.getAllCustomerContact(id);
    }

    getAllCustomerContact(id) {
        this.commonService.getCustomerContactsById(id).subscribe(res => {
            console.log(res);            
            this.customerContactList = res.map(x => {
                return {
                    ...x,
                    workPhone: `${x.workPhone} ${x.phoneExt}`
                }
            });;
            const isDefaultContact = this.customerContactList.filter(x => {
                if (x.isDefaultContact === true) {
                    return x;
                } else return x;
            })
            this.receivingForm.customerContactId = isDefaultContact[0];
            this.receivingForm.customerPhone = isDefaultContact[0];
        });
    }

    onPartNumberSelected(value) {
        this.commonService.getReceiveCustomerPartDetailsById(value).subscribe(res => {
            this.receivingForm.partDescription = res.partDescription;  
            this.receivingForm.manufacturerId = res.manufacturerId;  
            this.receivingForm.manufacturer = res.manufacturer;
            this.receivingForm.revisePartId = res.revisedPart;
            this.receivingForm.isSerialized = res.isSerialized;
            this.receivingForm.isTimeLife = res.isTimeLife;
        });
    }

    resetSerialNoTimeLife() {
        this.receivingForm.isSkipSerialNo = false;
        this.receivingForm.serialNumber = '';
        this.receivingForm.isSkipTimeLife = false;
        this.receivingForm.timeLifeDate = null;
        this.receivingForm.timeLifeOrigin = '';
        this.sourceTimeLife = {};
    }

    resetSerialNo() {
        this.receivingForm.serialNumber = '';
    }

    resetTimelife() {
        this.receivingForm.timeLifeDate = null;
        this.receivingForm.timeLifeOrigin = '';
        this.sourceTimeLife = {};
    }

    onSelectObrainFrom() {
		this.receivingForm.obtainFrom = undefined;
	}

	onSelectOwner() {
		this.receivingForm.owner = undefined;
	}

	onSelectTraceableTo() {
		this.receivingForm.traceableTo = undefined;
    }
    
    onSelectCondition() {
		if (this.receivingForm.conditionId != 0) {
			this.disableCondition = false;
		} else {
			this.disableCondition = true;
		}
    }
    
    fileUpload(event,fileType) {                
		if (event.files.length === 0)
			return;

        for (let file of event.files)
        {       
            this.formData.append(fileType, file);            
        }			
    }
	removeFile(event) {
		//this.formData.delete(event.file.name)
	}
    
    onSaveCustomerReceiving() {
        const receivingForm = {
            ...this.receivingForm,
            customerId: getValueFromObjectByKey('customerId', this.receivingForm.customerId),
            customerContactId: getValueFromObjectByKey('customerContactId', this.receivingForm.customerContactId),
            mfgDate: this.receivingForm.mfgDate ? this.datePipe.transform(this.receivingForm.mfgDate, "MM/dd/yyyy") : '',
            expDate: this.receivingForm.expDate ? this.datePipe.transform(this.receivingForm.expDate, "MM/dd/yyyy") : '',
            itemMasterId: this.receivingForm.itemMasterId ? editValueAssignByCondition('value', this.receivingForm.itemMasterId) : '',
            partNumber: this.receivingForm.itemMasterId ? editValueAssignByCondition('label', this.receivingForm.itemMasterId) : '',
            employeeId: this.receivingForm.employeeId ? editValueAssignByCondition('value', this.receivingForm.employeeId) : '',
            // certifiedById: this.receivingForm.certifiedById ? editValueAssignByCondition('value', this.receivingForm.certifiedById) : '',
            obtainFrom: this.receivingForm.obtainFrom ? editValueAssignByCondition('value', this.receivingForm.obtainFrom) : '',
			owner: this.receivingForm.owner ? editValueAssignByCondition('value', this.receivingForm.owner) : '',
			traceableTo: this.receivingForm.traceableTo ? editValueAssignByCondition('value', this.receivingForm.traceableTo) : '',
            //referenceId: this.receivingForm.referenceId ? editValueAssignByCondition('value', this.receivingForm.referenceId) : '',
            createdBy: this.userName,
            updatedBy: this.userName,
            masterCompanyId: 1, 
            timeLife: {...this.sourceTimeLife, timeLifeCyclesId: this.timeLifeCyclesId, updatedDate: new Date()}            
        }
        console.log(receivingForm);
        const {customerCode, customerPhone, partDescription, manufacturer, revisePartId, ...receivingInfo} = receivingForm;
        if(!this.isEditMode) {
            this.receivingCustomerWorkService.newReason(receivingInfo).subscribe(res => {
                $('#workorderpopup').modal('show');
                console.log(res);
                this.receivingCustomerWorkId = res.receivingCustomerWorkId;
                // this.workOrderId = res.workOrderId;
                this.onUploadDocumentList();
                this.alertService.showMessage(
                    'Success',
                    `Saved Customer Work Successfully`,
                    MessageSeverity.success
                );
            });
        } 
        else {
            this.receivingCustomerWorkService.updateCustomerWorkReceiving(receivingInfo).subscribe(res => {
                $('#workorderpopup').modal('show');
                // this.workOrderId = res.workOrderId;
                console.log(res);
                this.onUploadDocumentList();
                this.alertService.showMessage(
                    'Success',
                    `Updated Customer Work Successfully`,
                    MessageSeverity.success
                );
            });
        }
    }

    onUploadDocumentList() {
        // file upload
        const vdata = {                           
            referenceId:this.receivingCustomerWorkId,
            masterCompanyId: 1,
            createdBy: this.userName,
            updatedBy: this.userName,
            moduleId:37
        }
        for (var key in vdata) {
            this.formData.append(key, vdata[key]);
        }
        this.commonService.uploadDocumentsEndpoint(this.formData).subscribe(res => {
            this.formData = new FormData();
            this.toGetDocumentsList(this.receivingCustomerWorkId);
        });
        //./ file upload
    }
    
    toGetDocumentsList(id) {       
        var moduleId=37;
        this.commonService.GetDocumentsList(id,moduleId).subscribe(res => {
			this.customerWorkDocumentsList = res;
		})
    }
    downloadFileUpload(rowData) {	
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadattachedfile?filePath=${rowData.link}`;
		window.location.assign(url);       
    }
    getEmployeeAttachmentDelete(rowData)
    {
       let  attachmentDetailId=rowData.attachmentDetailId;
       let updatedBy=this.userName;

        this.commonService.GetAttachmentDeleteById(attachmentDetailId,updatedBy).subscribe(res => {		
            this.toGetDocumentsList(this.receivingCustomerWorkId)
		})
    }

    goToWorkOrder() {
        this.router.navigateByUrl(`/workordersmodule/workorderspages/app-work-order-receivingcustworkid/${this.receivingCustomerWorkId}`);
    }

    goToCustomerWorkList() {
        this.router.navigateByUrl('/receivingmodule/receivingpages/app-customer-works-list');        
    }

}
    

//     constructor(private _route: Router, public workFlowtService: CustomerService, private conditionService: ConditionService, public workFlowtService1: LegalEntityService, private siteService: SiteService, private binService: BinService, private vendorservice: VendorService, public employeeService: EmployeeService, private alertService: AlertService, public itemser: ItemMasterService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, public receivingCustomerWorkService: ReceivingCustomerWorkService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private customerservices: CustomerService, private commonService: CommonService, private _actRoute: ActivatedRoute, ) {
//         this.dataSource = new MatTableDataSource();
//         this.customerList();
//         this.loadManagementdata();
//          this.receivingForm.receivingCustomerWorkId = this._actRoute.snapshot.params['id'];

     
//         this.receivingCustomerWorkService.getCustomerWorkdataById(this.receivingForm.receivingCustomerWorkId).subscribe(response => {
          
//             this.receivingCustomerWorkService.listCollection = response[0];
        
//             this.getAllCustomerContact(this.receivingCustomerWorkService.listCollection.customer.customerId);

//         if (this.receivingCustomerWorkService.listCollection != null) {

//             this.showLable = true;
//             this.receivingForm = this.receivingCustomerWorkService.listCollection;
//             console.log(this.receivingForm,'edit')
//             this.receivingForm.serialNumber = this.receivingCustomerWorkService.listCollection.serialNumber;
//             this.receivingForm.customerContactId = this.receivingForm.contactId;
//               this.receivingForm.obtainFromType = parseInt(this.receivingCustomerWorkService.listCollection.obtainFromType);
//                 this.receivingForm.traceableToType = parseInt(this.receivingCustomerWorkService.listCollection.traceableToType);
//     this.receivingForm.workPhone = this.receivingCustomerWorkService.listCollection.workPhone;

//             if (this.receivingCustomerWorkService.listCollection.customer) {
//                 this.receivingForm.customerId = this.receivingCustomerWorkService.listCollection.customer.customerId;
//                 this.receivingForm.name = this.receivingCustomerWorkService.listCollection.customer.name;
//                 this.receivingForm.customerCode = { customerId: this.receivingCustomerWorkService.listCollection.customer.customerId, customerCode: this.receivingCustomerWorkService.listCollection.customer.customerCode }
               
              
               
              
//             }
            
//             if (this.receivingCustomerWorkService.listCollection.employee) {
//                 this.receivingForm.employeeId = this.receivingCustomerWorkService.listCollection.employee.employeeId;
//                 this.receivingForm.firstName = this.receivingCustomerWorkService.listCollection.employee.firstName;
//             }
//               if (this.receivingCustomerWorkService.listCollection.ti) {
//                 this.sourceTimeLife = this.receivingCustomerWorkService.listCollection.ti;
//             }
//             if (this.receivingForm.serialNumber) {
//                 this.receivingForm.isSerialized = true;
//             }

//             if (this.receivingForm.serialNumber == null) {
//                 this.receivingForm.isSerialized = false;

//             }
            
//             if (this.receivingForm.siteId) {
//                 this.binService.getWareHouseDate(this.receivingForm.siteId).subscribe(
//                     results => this.onDataLoadWareHouse(results),
//                     error => this.onDataLoadFailed(error)
//                 );
//             }
//             if (this.receivingForm.warehouseId) {
//                 this.binService.getLocationDate(this.receivingForm.warehouseId).subscribe(
//                     results => this.onDataLoadLocation(results),
//                     error => this.onDataLoadFailed(error)
//                 );
//             }
//             if (this.receivingForm.locationId) {
//                 this.binService.getShelfDate(this.receivingForm.locationId).subscribe(
//                     results => this.onDataLoadShelf(results),
//                     error => this.onDataLoadFailed(error)
//                 );
//             }

//             if (this.receivingForm.shelfId) {
//                 this.binService.getBinDataById(this.receivingForm.shelfId).subscribe(
//                     results => this.onDataLoadBin(results),
//                     error => this.onDataLoadFailed(error));
//             }
          

//             if (this.receivingForm.timeLifeDate) {
//                 this.receivingForm.timeLifeDate = new Date(this.receivingForm.timeLifeDate);
//             }
//             else {
//                 this.receivingForm.timeLifeDate = new Date();
//             }

//             if (this.receivingForm.manufacturingDate) {
//                 this.receivingForm.manufacturingDate = new Date(this.receivingForm.manufacturingDate);
//             }
//             else {
//                 this.receivingForm.manufacturingDate = new Date();
//             }
//             if (this.receivingForm.tagDate) {
//                 this.receivingForm.tagDate = new Date(this.receivingForm.tagDate);
//             }
//             else {
//                 this.receivingForm.tagDate = new Date();
//             }

//             if (this.receivingForm.expirationDate) {
//                 this.receivingForm.expirationDate = new Date(this.receivingForm.expirationDate);
//             }
//             else {
//                 this.receivingForm.expirationDate = new Date();
//             }

//             switch (this.receivingForm.obtainFromType) {
//                 case 1: {
//                     this.showCustomer1 = true;


//                     break;
//                 }
//                 case 2: {
//                     this.showOther1 = true;
//                     break;
//                 }
//                 case 3: {
//                     this.showVendor1 = true;
//                     break;
//                 }
//                 case 4: {
//                     this.showCompany1 = true;
//                     break;
//                 }
//             }

//             switch (this.receivingForm.ownerType) {
//                 case 1: {
//                     this.showCustomer2 = true;
//                     break;
//                 }
//                 case 2: {
//                     this.showOther2 = true;
//                     break;
//                 }
//                 case 3: {
//                     this.showVendor2 = true;
//                     break;
//                 }
//                 case 4: {
//                     this.showCompany2 = true;
//                     break;
//                 }
//             }

//             switch (this.receivingForm.traceableToType) {
//                 case 1: {
//                     this.showCustomer = true;
//                     break;
//                 }
//                 case 2: {
//                     this.showOther = true;
//                     break;
//                 }
//                 case 3: {
//                     this.showVendor = true;
//                     break;
//                 }
//                 case 4: {
//                     this.showCompany = true;
//                     break;
//                 }
//             }


//             if (this.receivingCustomerWorkService.listCollection.managementStructureId != 'undefined') {
//                 this.receivingForm.companyId = this.getManagementStructureDetails(this.receivingCustomerWorkService.listCollection.managementStructureId);
//                           }
//               }
//         }); 
//     }    
    
//     ngOnInit() {

//         this.receivingForm.isCustomerStock = true;
//          this.employeedata();
//          this.loadData();
//          this.ptnumberlistdata();
//          this.Receveingcustomerlist();
//          this.loadDataForCondition();
//          this.loadItemmasterData();
//          this.vendorList();
//          this.loadSiteData();
//          this.loadDataCustomerconct();
//              this.loadLegalEntityData();
//          if (!this.receivingForm.receivingCustomerWorkId) {
//              this.receivingForm.receivingCustomerNumber = 'Creating';
//          }
//      }

    
// 	ngAfterViewInit() {
	
//     }

	

//     receiveCreationForm = new FormGroup({

     
//         companyId: new FormControl('companyId', Validators.minLength(1))




//     });
//     getManagementStructureDetails(id) {
        
//         this.commonService.getManagementStructureDetails(id).subscribe(res => {
//             if (res.Level1) {
//                 this.receivingForm.companyId = res.Level1;
              
//                 this.getBUList(res.Level1);
//             } else
//                 this.receivingForm.companyId = 0;

//             if (res.Level2) {
               
//                 this.receivingForm.buId = res.Level2;
//                       this.getDivisionlist(res.Level2);
//             } else
//                 this.receivingForm.buId = 0;

//             if (res.Level3) {
               
//                 this.receivingForm.divisionId = res.Level3;
//                 this.getDepartmentlist(res.Level3);
//             } else
//                 this.receivingForm.divisionId = 0;

//             if (res.Level4) {
//                 this.receivingForm.departmentId = res.Level4;
//                 this.getDepartmentId(res.Level4);
//             } else
//                 this.receivingForm.departmentId = 0;

//         })
//     }

// 	private loadData() {
// 		this.alertService.startLoadingMessage();
// 		this.loadingIndicator = true;

// 		this.employeeService.getEmployeeList().subscribe(
// 			results => this.onDataLoadSuccessful(results[0]),
// 			error => this.onDataLoadFailed(error)
// 		);
// 	}
// 	private onDataLoadSuccessful(allWorkFlows: any[]) {

// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.dataSource.data = allWorkFlows;
// 		this.allEmpActions = allWorkFlows;
// 	}
//     private loadMasterCompanies() {
//         this.alertService.startLoadingMessage();
//         this.loadingIndicator = true;

//         this.masterComapnyService.getMasterCompanies().subscribe(
//             results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
//             error => this.onDataLoadFailed(error)
//         );
//     }
// 	public applyFilter(filterValue: string) {
// 		this.dataSource.filter = filterValue;
// 	}
// 	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
		
// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.allComapnies = allComapnies;
// 	}
// 	private onDataLoadFailed(error: any) {
		
// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;

// 	}
	
// 	openHelpText(content) {
// 		this.modal = this.modalService.open(content, { size: 'sm' });
// 		this.modal.result.then(() => {
// 			console.log('When user closes');
// 		}, () => { console.log('Backdrop click') })
// 	}
    
//     saveCustomerwork() {
//         this.receivingForm.isActive = true;
//         console.log(this.receivingForm);
//         if (!(this.receivingForm.partNumber && this.receivingForm.partDescription && this.receivingForm.siteId && this.receivingForm.customerId) ) {
//             this.display = true;
//             this.modelValue = true;
//         }
//         if ((this.receivingForm.partNumber && this.receivingForm.partDescription && this.receivingForm.siteId && this.receivingForm.customerId)) {
           
//             this.isSaving = true;

//             if (!this.receivingForm.receivingCustomerWorkId) {
//                 this.receivingForm.createdBy = this.userName;
//                 this.receivingForm.updatedBy = this.userName;
//                 this.receivingForm.masterCompanyId = 1;
//                 if ((this.sourceTimeLife != null) || (this.sourceTimeLife != "null")) {
//                     if (this.receivingForm.isTimeLife) {
//                         this.receivingCustomerWorkService.newStockLineTimeLife(this.sourceTimeLife).subscribe(data => {
//                             this.collectionofstockLineTimeLife = data;
//                             this.receivingForm.timeLifeCyclesId = data.timeLifeCyclesId;
//                             this.value = 1;
//                             if (this.receivingForm.isSerialized == null || this.receivingForm.isSerialized == false) {
//                                 this.receivingForm.serialNumber = '';
//                                 this.receivingForm.certifiedBy = '';
//                                 this.receivingForm.tagDate = '';
//                                 this.receivingForm.tagType = '';
//                                 this.receivingForm.partCertificationNumber = '';
//                             }
//                             if (this.receivingForm.isTimeLife == null || this.receivingForm.isTimeLife == false) {
//                                 this.receivingForm.timeLifeDate = '';
//                                 this.receivingForm.timeLifeOrigin = '';
//                             }
                          

//                             console.log(this.receivingForm)
//                             this.receivingCustomerWorkService.newReason(this.receivingForm).subscribe(
//                                 role => this.saveSuccessHelper(role),
//                                 error => this.saveFailedHelper(error));
//                             this.receivingForm = {};
//                         })
//                     }

//                     else {
//                         this.receivingCustomerWorkService.newReason(this.receivingForm).subscribe(
//                             role => this.saveSuccessHelper(role),
//                             error => this.saveFailedHelper(error));
//                     }
                 
//                     this._route.navigateByUrl('receivingmodule/receivingpages/app-customer-works-list');
//                     this.receivingForm = {};
//                 }
//             }

//             else {
//                 console.log(this.receivingForm, 'edit');
//                 this.receivingForm.contactId = this.receivingForm.customerContactId;

//                 if ((this.receivingForm.isTimeLife) && (this.receivingForm.timeLifeCyclesId == null || this.receivingForm.timeLifeCyclesId == undefined)) {

//                     this.receivingCustomerWorkService.newStockLineTimeLife(this.sourceTimeLife).subscribe(data => {
//                         this.collectionofstockLine = data;
//                         this.receivingForm.timeLifeCyclesId = data.timeLifeCyclesId;
//                         this.value = 1;
//                         this.receivingCustomerWorkService.updateReason(this.receivingForm).subscribe(
//                             response => this.saveCompleted(this.receivingForm),
//                             error => this.saveFailedHelper(error));


//                     })
//                 }

//                 else {
                   
//                     this.receivingForm.contactId = this.receivingForm.customerContactId;
//                     this.receivingCustomerWorkService.updateStockLineTimelife(this.sourceTimeLife).subscribe(data => {
//                         this.collectionofstockLine = data;
                      
//                     })
//                     this.receivingCustomerWorkService.updateReason(this.receivingForm).subscribe(
//                         response => this.saveCompleted(this.receivingForm),
//                         error => this.saveFailedHelper(error));
                   
//                 }

              
//                           }
//         }
//     }

// 	deleteItemAndCloseModel() {
//         this.isSaving = true;
//         this.receivingForm.updatedBy = this.userName;
//         this.receivingCustomerWorkService.deleteReason(this.receivingForm.receivingCustomerWorkId, this.userName).subscribe(

//  			response => this.saveCompleted(this.sourceAction),
// 			error => this.saveFailedHelper(error));
// 		this.modal.close();
// 	}
// 	dismissModel() {
// 		this.isDeleteMode = false;
// 		this.isEditMode = false;
// 			}

// 	private saveCompleted(user?: any) {
// 		this.isSaving = false;
//         this._route.navigateByUrl('receivingmodule/receivingpages/app-customer-works-list');

// 		if (this.isDeleteMode == true) {
// 			this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
// 			this.isDeleteMode = false;
// 		}
// 		else {
// 			this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

// 		}

// 		this.loadData();
// 	}

// 	private saveSuccessHelper(role?: true) {
//         this.isSaving = false;
//         this._route.navigateByUrl('receivingmodule/receivingpages/app-customer-works-list');
// 		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

// 		this.loadData();

// 	}

// 	get userName(): string {
// 		return this.authService.currentUser ? this.authService.currentUser.userName : "";
// 	}

// 	private saveFailedHelper(error: any) {
// 		this.isSaving = false;
// 		this.alertService.stopLoadingMessage();
// 		this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
// 		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
// 	}
    

// 	private Receveingcustomerlist() {
// 		this.alertService.startLoadingMessage();
// 		this.loadingIndicator = true;

// 		this.receivingCustomerWorkService.getReceiveCustomerList().subscribe(
// 			results => this.onDataLoadrecevingSuccessful(results[0]),
// 			error => this.onDataLoadFailed(error)
// 		);

// 	}

// 	private onDataLoadrecevingSuccessful(getEmployeeCerficationList: any[]) {
	
// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.dataSource.data = getEmployeeCerficationList;
// 		this.allRecevinginfo = getEmployeeCerficationList;
// 	}
	
// 	private employeedata() {
// 		this.alertService.startLoadingMessage();
// 		this.loadingIndicator = true;

// 		this.employeeService.getEmployeeList().subscribe(
// 			results => this.onempDataLoadSuccessful(results[0]),
// 			error => this.onDataLoadFailed(error)
// 		);



// 		this.selectedColumns = this.cols;

// 	}

// 	private onempDataLoadSuccessful(getEmployeeCerficationList: any[]) {
// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.allEmployeeinfo = getEmployeeCerficationList;
// 	}

// 	filterfirstName(event) {

// 		this.firstCollection = [];
// 		for (let i = 0; i < this.allEmployeeinfo.length; i++) {
// 			let firstName = this.allEmployeeinfo[i].firstName;
// 			if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
// 				this.firstCollection.push(firstName);
// 			}
// 		}
// 	}
// 	private onptnmbersSuccessful(allWorkFlows: any[]) {

// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.dataSource.data = allWorkFlows;
// 		this.allPartnumbersInfo = allWorkFlows;
// 	}


// 	private ptnumberlistdata() {
// 		this.alertService.startLoadingMessage();
// 		this.loadingIndicator = true;

// 		this.itemser.getPrtnumberslistList().subscribe(
// 			results => this.onptnmbersSuccessful(results[0]),
// 			error => this.onDataLoadFailed(error)
// 		);
//     }
//     filterNames(event) {

//         this.customerNames = [];
//         if (this.allCustomer) {
//             if (this.allCustomer.length > 0) {
//                 for (let i = 0; i < this.allCustomer.length; i++) {
//                     let name = this.allCustomer[i].name;
//                     if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
//                         this.customerNames.push(name);
//                     }
//                 }
//             }
//         }
//     }
//     filterCodes(event) {
//         this.custcodes = this.allCustomer;
//         this.custcodes = [...this.allCustomer.filter(x => {
//             return x.customerCode.toLowerCase().includes(event.query.toLowerCase())
//         })]

//     }
//     filterReferenceNames(event) {

//         this.customerReferenceNames = [];
//         if (this.allCustomer) {
//             if (this.allCustomer.length > 0) {
//                 for (let i = 0; i < this.allCustomer.length; i++) {
//                     let name = this.allCustomer[i].name;
//                     if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
//                         this.customerReferenceNames.push(name);
//                     }
//                 }
//             }
//         }
//     }

   
   


// 	filterpartItems(event) {

// 		this.partCollection = [];
// 		this.itemclaColl = [];
// 		if (this.allPartnumbersInfo) {
// 			if (this.allPartnumbersInfo.length > 0) {

// 				for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
// 					let partName = this.allPartnumbersInfo[i].partNumber;
// 					if (partName) {
// 						if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
// 							this.itemclaColl.push([{
// 								"partId": this.allPartnumbersInfo[i].itemMasterId,
// 								"partName": partName
// 							}]),

// 								this.partCollection.push(partName);
// 						}
// 					}
// 				}
// 			}
// 		}
//     }

//     filterFirstNames(event) {
//         this.firstNames = [];
//         if (this.allCustomer) {
//         for (let i = 0; i < this.allActions.length; i++) {
//             let firstName = this.allActions[i].firstName;
        
//             if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
//                 this.firstNames.push(firstName);
//             }
//             }
//         }
//     }

//     filterContacts(event) {
//         this.workPhone = [];
//         if (this.allActions) {
//             if (this.allActions.length > 0) {
//                 for (let i = 0; i < this.allActions.length; i++) {
//                     let workPhone = this.allActions[i].workPhone;
//                     if (workPhone) {
//                         if (workPhone.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
//                             this.workPhone.push(workPhone);
//                         }
//                     }
//                 }
//             }
//         }
//     }

//     private onDataLoadSuccessfulCustomer(allWorkFlows: any[]) {

//         this.alertService.stopLoadingMessage();
//         this.loadingIndicator = false;
//         this.dataSource.data = allWorkFlows;
//         this.allActions = allWorkFlows;


//     }

// 	private onitemmasterSuccessful(allWorkFlows: any[]) {

// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.dataSource.data = allWorkFlows;
// 		this.allActions = allWorkFlows;
// 	}
// 	private loadItemmasterData() {
// 		this.alertService.startLoadingMessage();
// 		this.loadingIndicator = true;

// 		this.itemser.getItemMasterList().subscribe(
// 			results => this.onitemmasterSuccessful(results[0]),
// 			error => this.onDataLoadFailed(error)
// 		);
//     }

//     private loadDataCustomerconct() {
//         this.alertService.startLoadingMessage();
//         this.loadingIndicator = true;

//         this.workFlowtService.getContactsFirstName().subscribe(
//             results => this.onDataLoadSuccessfulCustomer(results[0]),
//             error => this.onDataLoadFailed(error)
//         );

//     }

// 	partnmId(event) {
// 		//
// 		if (this.itemclaColl) {
// 			this.itemser.getDescriptionbypart(event).subscribe(
// 				results => this.onpartnumberloadsuccessfull(results[0]),
// 				error => this.onDataLoadFailed(error)
// 			);
// 		}
// 	}
// 	eventHandler(event) {
// 		if (event.target.value != "") {
// 			let value = event.target.value.toLowerCase();
// 			if (this.selectedActionName) {
// 				if (value == this.selectedActionName.toLowerCase()) {
//                     this.disableSavepartNumber = true;
//                     this.disableSavemanufacturer = true;

// 				}
// 				else {
// 					this.disableSavepartNumber = false;
//                     this.receivingForm.partDescription = "";
//                     this.receivingForm.manufacturer = "";
//                     this.disableSavepartDescription = false;
//                     this.disableSavemanufacturer = false;
// 				}
// 			}

// 		}
//     }

//     getAllCustomerContact(id) {
//         // get Customer Contatcs 

//         this.customerservices.getContacts(id).subscribe(res => {
//             this.customerContactList = res[0]
//         })
//     }
//     customerContactChange(customerContact) {
//         for (let i = 0; i < this.customerContactList.length; i++) {
//             if (customerContact == this.customerContactList[i].contactId) {
//                 this.receivingForm.workPhone = this.customerContactList[i].workPhone;
//             }
//         }
//     }
//     private onpartnumberloadsuccessfull(allWorkFlows: any[]) {
       
// 		this.receivingForm.partDescription = allWorkFlows[0].partDescription;
//         this.receivingForm.isSerialized = allWorkFlows[0].isSerialized;

//         this.receivingForm.manufacturer = allWorkFlows[0].manufacturer.name;
//         //this.receivingForm.manufacturerId = allWorkFlows[0].manufacturerId;
  
//         this.receivingForm.isTimeLife = allWorkFlows[0].isTimeLife;
// 		if (this.receivingForm.isSerialized == true) {
// 			this.showRestrictQuantity = true;
// 			this.showFreeQuantity = false;
//             this.showNormalQuantity = false; 
//             this.receivingForm.expirationDate = allWorkFlows[0].expirationDate;
// 		}
// 		else {
// 			this.showRestrictQuantity = false;
// 			this.showFreeQuantity = true;
//             this.showNormalQuantity = false;
//             this.receivingForm.serialNumber = '';
//             this.receivingForm.certifiedBy = '';
//             this.receivingForm.tagDate = '';
//             this.receivingForm.tagType = '';
//             this.receivingForm.partCertificationNumber = '';
//         }
        
//         if (this.receivingForm.isTimeLife == true) {
//             this.receivingForm.isTimeLife = true;
//             this.receivingForm.timeLifeDate = '';
//             this.receivingForm.timeLifeOrigin = '';
//             this.sourceTimeLife.cyclesRemaining = '';
//             this.sourceTimeLife.timeRemaining = '';
//             this.sourceTimeLife.lastSinceNew = '';
//             this.sourceTimeLife.cyclesSinceNew = '';
//             this.sourceTimeLife.timeSinceNew = '';
//             this.sourceTimeLife.lastSinceOVH = '';
//             this.sourceTimeLife.cyclesSinceOVH = '';
//             this.sourceTimeLife.timeSinceOVH = '';
//             this.sourceTimeLife.lastSinceInspection = '';
//             this.sourceTimeLife.cyclesSinceInspection = '';
//             this.sourceTimeLife.timeSinceInspection = '';
//             this.sourceTimeLife.cyclesSinceRepair = '';
//             this.sourceTimeLife.timeSinceRepair = '';
//         }
//         else {
//             this.receivingForm.isTimeLife == false;
//             this.receivingForm.timeLifeCyclesId = '';
//         }

//         if (allWorkFlows[0].isTimeLife == null) {
//             this.receivingForm.timeLife = false;
//             this.sourceTimeLife.timeLifeDate = '';
//             this.sourceTimeLife.timeLifeOrigin = '';
//             this.sourceTimeLife.cyclesRemaining = '';
//             this.sourceTimeLife.timeRemaining = '';
//             this.sourceTimeLife.lastSinceNew = '';
//             this.sourceTimeLife.cyclesSinceNew = '';
//             this.sourceTimeLife.timeSinceNew = '';
//             this.sourceTimeLife.lastSinceOVH = '';
//             this.sourceTimeLife.cyclesSinceOVH = '';
//             this.sourceTimeLife.timeSinceOVH = '';
//             this.sourceTimeLife.lastSinceInspection = '';
//             this.sourceTimeLife.cyclesSinceInspection = '';
//             this.sourceTimeLife.timeSinceInspection = '';
//             this.sourceTimeLife.cyclesSinceRepair = '';
//             this.sourceTimeLife.timeSinceRepair = '';
         
//         }
//         else {
//             this.receivingForm.timeLife = allWorkFlows[0].isTimeLife;
//         }
//     }


// 	private onDataLoadSuccessfulForCondition(getConditionList: Condition[]) {
// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.dataSource.data = getConditionList;
// 		this.allConditionInfo = getConditionList;
// 	}
// 	private loadDataForCondition() {
// 		this.alertService.startLoadingMessage();
// 		this.loadingIndicator = true;

// 		this.conditionService.getConditionList().subscribe(
// 			results => this.onDataLoadSuccessfulForCondition(results[0]),
// 			error => this.onDataLoadFailed(error)
// 		);
// 	}
// 	private onCustomerDataLoadSuccessful(allCustomerFlows: any[]) {
// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.dataSource.data = allCustomerFlows;
// 		this.allCustomer = allCustomerFlows;

//     }
 
// 	private customerList() {
// 		this.alertService.startLoadingMessage();
// 		this.loadingIndicator = true;

// 		this.customerservices.getWorkFlows().subscribe(
// 			results => this.onCustomerDataLoadSuccessful(results[0]),
// 			error => this.onDataLoadFailed(error)
// 		);
//     }

  
// 	private onVendorDataLoadSuccessful(allVendorWorkFlows: any[]) {
// 		//debugger;
// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.dataSource.data = allVendorWorkFlows;
// 		this.allVendorList = allVendorWorkFlows;
// 	}
// 	private vendorList() {
// 		this.alertService.startLoadingMessage();
// 		this.loadingIndicator = true;
// 		this.vendorservice.getVendorList().subscribe(
// 			results => this.onVendorDataLoadSuccessful(results[0]),
// 			error => this.onDataLoadFailed(error)
// 		);
// 	}
// 	siteValueChange(data) //Site Valu Selection in Form
// 	{

// 		this.allWareHouses = [];
// 		this.allLocations = [];
// 		this.allShelfs = [];
//         this.allBins = [];
//         this.receivingForm.warehouseId = null
// 		this.receivingForm.locationId = 0;
// 		this.receivingForm.shelfId = 0;
// 		this.receivingForm.binId = 0;
// 		this.binService.getWareHouseDate(this.receivingForm.siteId).subscribe( //calling and Subscribing for WareHouse Data
// 			results => this.onDataLoadWareHouse(results), //sending WareHouse
// 			error => this.onDataLoadFailed(error)
// 		);
// 	}
// 	private onDataLoadWareHouse(getWarehousList: any) { //Storing WareHouse Data

// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.allWareHouses = getWarehousList; //cha
// 		//this.warehouseId = this.allWareHouses.warehouseId;
// 	}
// 	wareHouseValueChange(warehouseId) {

// 		this.allLocations = [];
// 		this.allShelfs = [];
// 		this.allBins = [];

// 		this.receivingForm.locationId = 0;
// 		this.receivingForm.shelfId = 0;
// 		this.receivingForm.binId = 0;
// 		this.binService.getLocationDate(warehouseId).subscribe( //calling and Subscribing for Location Data
// 			results => this.onDataLoadLocation(results), //sending Location
// 			error => this.onDataLoadFailed(error)
// 		);
// 	}
// 	private onDataLoadLocation(getLocationList: any) { //Storing WareHouse Data

// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.allLocations = getLocationList; //cha
// 		//this.locationId = this.allWareHouses.locationId;
// 	}
// 	locationValueChange(locationId) {
// 		this.allShelfs = [];
// 		this.allBins = [];
// 		this.receivingForm.shelfId = 0;
// 		this.receivingForm.binId = 0;

// 		this.binService.getShelfDate(locationId).subscribe( //calling and Subscribing for Location Data
// 			results => this.onDataLoadShelf(results), //sending Location
// 			error => this.onDataLoadFailed(error)
// 		);
// 	}

// 	private onDataLoadShelf(getShelfList: any) {
// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.allShelfs = getShelfList; //cha
// 	}
// 	shelfValueChange(binId) {
// 		this.allBins = [];
// 		this.receivingForm.binId = 0;

// 		this.binService.getBinDataById(binId).subscribe(
// 			results => this.onDataLoadBin(results), //sending Location
// 			error => this.onDataLoadFailed(error));
// 	}
// 	private onDataLoadBin(getBinList: any) {
// 		this.loadingIndicator = false;
// 		this.allBins = getBinList; //cha
// 	}
// 	binValueSelect(data) {
// 		//All the data in structure
// 	}
   
// 	private loadSiteData()  //retriving SIte Information
// 	{
// 		this.alertService.startLoadingMessage();
// 		this.loadingIndicator = true;

// 		this.siteService.getSiteList().subscribe(   //Getting Site List Hear
// 			results => this.onSaiteDataLoadSuccessful(results[0]), //Pasing first Array and calling Method
// 			error => this.onDataLoadFailed(error)
// 		);
// 	}
// 	private onSaiteDataLoadSuccessful(getSiteList: Site[]) { //Storing Site Data
// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.dataSource.data = getSiteList; //need
// 		this.allSites = getSiteList; //Contain first array of Loaded table Data will put in Html as [value]
// 	}
	
//     private loadManagementdata() {
//         this.alertService.startLoadingMessage();
//         this.loadingIndicator = true;

//         this.workFlowtService1.getManagemententity().subscribe(
//             results => this.onManagemtntdataLoad(results[0]),
//             error => this.onDataLoadFailed(error)
//         );
//     }
//     private onManagemtntdataLoad(getAtaMainList: any[]) {
//         // alert('success');
//         this.alertService.stopLoadingMessage();
//         this.loadingIndicator = false;
//         this.dataSource.data = getAtaMainList;
//         this.allManagemtninfo = getAtaMainList;
//         for (let i = 0; i < this.allManagemtninfo.length; i++) {

//             if (this.allManagemtninfo[i].parentId == null) {
//                 this.maincompanylist.push(this.allManagemtninfo[i]);

//             }
//         }
      
//     }

//     customerNameId(event) {
       
//         if (this.allCustomer) {
//             for (let i = 0; i < this.allCustomer.length; i++) {
//                 if (event == this.allCustomer[i].name) {
//                     this.receivingForm.customerId = this.allCustomer[i].customerId;
//                         this.receivingForm.customerCode = { customerId: this.receivingForm.customerId, customerCode: this.allCustomer[i].customerCode }

//                     this.selectedActionName = event;
//                     this.getAllCustomerContact(this.allCustomer[i].customerId);

//                 }
//             }
//             this.customerservices.getDescriptionbypart(event).subscribe(
//                 results => this.oncustomernumberloadsuccessfull(results[0]),
//                 error => this.onDataLoadFailed(error)
//             );
//         }
//     }

    
//     customerContactId(event) {
//         //
//         if (this.allActions) {
//             for (let i = 0; i < this.allActions.length; i++) {
//                 if (event == this.allActions[i].firstName) {
//                     this.receivingForm.contactId = this.allActions[i].contactId;
//                     this.receivingForm.customerContactName = this.allActions[i].firstName;
//                     this.selectedActionName = event;
//                 }
//             }
//         }
//     }
//     patternMobilevalidationWithSpl(event: any) {
//         const pattern = /[0-9\+\-()\ ]/;

//         let inputChar = String.fromCharCode(event.charCode);
//         if (event.keyCode != 8 && !pattern.test(inputChar)) {
//             event.preventDefault();
//         }

//     }
//     empnameId(event) {
//         //
//         if (this.allEmployeeinfo) {
//             for (let i = 0; i < this.allEmployeeinfo.length; i++) {
//                 if (event == this.allEmployeeinfo[i].firstName) {
//                     this.receivingForm.employeeId = this.allEmployeeinfo[i].employeeId;
//                     this.selectedActionName = event;
//                 }
//             }
          
//         }
//     }

//     private oncustomernumberloadsuccessfull(allWorkFlows: any[]) {
         
//     }
//     loadLegalEntityData() {
//         this.alertService.startLoadingMessage();
//         this.loadingIndicator = true;

//         this.workFlowtService1.getManagemtentLengalEntityData().subscribe(
//             results => this.onManagemtntlegaldataLoad(results[0]),
//             error => this.onDataLoadFailed(error)
//         );

//     }
//     private onManagemtntlegaldataLoad(getAtaMainList: any[]) {
//         // alert('success');
//         this.alertService.stopLoadingMessage();
//         this.loadingIndicator = false;
//         this.alllegalEntityInfo = getAtaMainList;
//         for (let i = 0; i < this.alllegalEntityInfo.length; i++) {

//             if (this.alllegalEntityInfo[i].parentId == null) {
//                 this.maincompanylist.push(this.alllegalEntityInfo[i]);

//             }
//         }

//     }
   

//     checkMSParents(msId) {
//         this.managementStructureData.push(msId);
//         for (let a = 0; a < this.allManagemtninfo.length; a++) {
//             if (this.allManagemtninfo[a].managementStructureId == msId) {
//                 if (this.allManagemtninfo[a].parentId) {
//                     this.checkMSParents(this.allManagemtninfo[a].parentId);
//                     break;
//                 }
//             }
//         }

//     }
//     private loadManagementdataForTree() {
//         this.workFlowtService1.getManagemententity().subscribe(
//             results => this.onManagemtntdataLoadTree(results[0]),
//             error => this.onDataLoadFailed(error)
//         );
//     }

//     private onManagemtntdataLoadTree(managementInfo: any[]) {
//         //console.log(managementInfo);
//         this.allManagemtninfo = managementInfo;
//         this.parentManagementInfo = managementInfo;
//         this.childManagementInfo = managementInfo;
//         for (let i = 0; i < this.allManagemtninfo.length; i++) {
//             if (this.allManagemtninfo[i].parentId == null) {
//                 this.bulist = [];
//                 this.divisionlist = [];
//                 this.departmentList = [];
//                 this.maincompanylist.push(this.allManagemtninfo[i]);
//             }
//         }
//     }

//     getBUList(companyId) {
        
//         this.receivingForm.managementStructureId = companyId;
//         this.bulist = [];
//         this.divisionlist = [];
//         this.departmentList = [];
//         for (let i = 0; i < this.allManagemtninfo.length; i++) {
//             if (this.allManagemtninfo[i].parentId == companyId) {
//                 this.bulist.push(this.allManagemtninfo[i]);
//             }
//         }
//         for (let i = 0; i < this.partListData.length; i++) {
//             this.partListData[i].parentCompanyId = companyId;
//             this.getParentBUList(this.partListData[i]);
//             if (this.partListData[i].childList) {
//                 for (let j = 0; j < this.partListData[i].childList.length; j++) {
//                     this.partListData[i].childList[j].childCompanyId = companyId;
//                     this.getChildBUList(this.partListData[i].childList[j]);
//                 }
//             }
//         }

//     }


//     getDivisionlist(buId) {
//         this.receivingForm.managementStructureId = buId;
//         this.divisionlist = [];
//         this.departmentList = [];
//         for (let i = 0; i < this.allManagemtninfo.length; i++) {
//             if (this.allManagemtninfo[i].parentId == buId) {
//                 this.divisionlist.push(this.allManagemtninfo[i]);
//             }
//         }
//         for (let i = 0; i < this.partListData.length; i++) {
//             this.partListData[i].parentbuId = buId;
//             this.getParentDivisionlist(this.partListData[i]);
//             if (this.partListData[i].childList) {
//                 for (let j = 0; j < this.partListData[i].childList.length; j++) {
//                     this.partListData[i].childList[j].childbuId = buId;
//                     this.getChildDivisionlist(this.partListData[i].childList[j]);
//                 }
//             }
//         }
//     }

//     getDepartmentlist(divisionId) {
//         this.receivingForm.managementStructureId = divisionId;
//         this.departmentList = [];
//         for (let i = 0; i < this.allManagemtninfo.length; i++) {
//             if (this.allManagemtninfo[i].parentId == divisionId) {
//                 this.departmentList.push(this.allManagemtninfo[i]);
//             }
//         }
//         for (let i = 0; i < this.partListData.length; i++) {
//             this.partListData[i].parentDivisionId = divisionId;
//             this.getParentDeptlist(this.partListData[i]);
//             if (this.partListData[i].childList) {
//                 for (let j = 0; j < this.partListData[i].childList.length; j++) {
//                     this.partListData[i].childList[j].childDivisionId = divisionId;
//                     this.getChildDeptlist(this.partListData[i].childList[j]);
//                 }
//             }
//         }
//     }

//     getDepartmentId(departmentId) {
//         this.receivingForm.managementStructureId = departmentId;
//         for (let i = 0; i < this.partListData.length; i++) {
//             this.partListData[i].parentDeptId = departmentId;
//         }
//         for (let i = 0; i < this.partListData.length; i++) {
//             this.partListData[i].parentDeptId = departmentId;
//             this.getParentDeptId(this.partListData[i]);
//             if (this.partListData[i].childList) {
//                 for (let j = 0; j < this.partListData[i].childList.length; j++) {
//                     this.partListData[i].childList[j].childDeptId = departmentId;
//                     this.getChildDeptId(this.partListData[i].childList[j]);
//                 }
//             }
//         }
//     }

//     getParentBUList(partList) {
//         partList.managementStructureId = partList.parentCompanyId;
//         partList.parentBulist = []
//         partList.parentDivisionlist = [];
//         partList.parentDepartmentlist = [];
//         for (let i = 0; i < this.parentManagementInfo.length; i++) {
//             if (this.parentManagementInfo[i].parentId == partList.parentCompanyId) {
//                 partList.parentBulist.push(this.parentManagementInfo[i]);
//             }
//         }
//     }

//     getParentDivisionlist(partList) {
//         partList.managementStructureId = partList.parentbuId;
//         partList.parentDivisionlist = [];
//         partList.parentDepartmentlist = [];
//         for (let i = 0; i < this.parentManagementInfo.length; i++) {
//             if (this.parentManagementInfo[i].parentId == partList.parentbuId) {
//                 partList.parentDivisionlist.push(this.parentManagementInfo[i]);
//             }
//         }
//     }

//     getParentDeptlist(partList) {
//         partList.managementStructureId = partList.parentDivisionId;
//         partList.parentDepartmentlist = [];
//         for (let i = 0; i < this.parentManagementInfo.length; i++) {
//             if (this.parentManagementInfo[i].parentId == partList.parentDivisionId) {
//                 partList.parentDepartmentlist.push(this.parentManagementInfo[i]);
//             }
//         }
//     }

//     getParentDeptId(partList) {
//         partList.managementStructureId = partList.parentDeptId;
//     }

//     getChildBUList(partChildList) {
//         partChildList.managementStructureId = partChildList.childCompanyId;
//         console.log(partChildList.managementStructureId);

//         partChildList.childBulist = [];
//         partChildList.childDivisionlist = [];
//         partChildList.childDepartmentlist = [];
//         for (let i = 0; i < this.childManagementInfo.length; i++) {
//             if (this.childManagementInfo[i].parentId == partChildList.childCompanyId) {
//                 partChildList.childBulist.push(this.childManagementInfo[i]);
//             }
//         }
//     }

//     getChildDivisionlist(partChildList) {
//         partChildList.managementStructureId = partChildList.childbuId;
//         partChildList.childDivisionlist = [];
//         partChildList.childDepartmentlist = [];
//         for (let i = 0; i < this.childManagementInfo.length; i++) {
//             if (this.childManagementInfo[i].parentId == partChildList.childbuId) {
//                 partChildList.childDivisionlist.push(this.childManagementInfo[i]);
//             }
//         }
//     }

//     getChildDeptlist(partChildList) {
//         partChildList.managementStructureId = partChildList.childDivisionId;
//         partChildList.childDepartmentlist = [];
//         for (let i = 0; i < this.childManagementInfo.length; i++) {
//             if (this.childManagementInfo[i].parentId == partChildList.childDivisionId) {
//                 partChildList.childDepartmentlist.push(this.childManagementInfo[i]);
//             }
//         }
//     }

//     getChildDeptId(partChildList) {
//         partChildList.managementStructureId = partChildList.childDeptId;
//     }


//     getTracabletoType(value)
//     {
//         if (value == 1)
//         {
//             this.showCustomer = true;
//             this.showOther = false;
//             this.showVendor = false;
//             this.showCompany = false;
//         }
//         if (value == 2) {
//             this.showCustomer = false;
//             this.showOther = true;
//             this.showVendor = false;
//             this.showCompany = false;
//         }
//         if (value == 3) {
//             this.showCustomer = false;
//             this.showOther = false;
//             this.showVendor = true;
//             this.showCompany = false;
//         }
//         if (value == 4) {
//             this.showCustomer = false;
//             this.showOther = false;
//             this.showVendor = false;
//             this.showCompany = true;
//         }
//     }


//     getObtaintoType(value) {
//         if (value == 1) {
//             this.showCustomer1 = true;
//             this.showOther1 = false;
//             this.showVendor1 = false;
//             this.showCompany1 = false;
//         }
//         if (value == 2) {
//             this.showCustomer1 = false;
//             this.obtainFrom = '';
//             this.showOther1 = true;
//             this.showVendor1 = false;
//             this.showCompany1 = false;
//         }
//         if (value == 3) {
//             this.showCustomer1 = false;
//             this.showOther1 = false;
//             this.showVendor1 = true;
//             this.showCompany1 = false;
//         }
//         if (value == 4) {
//             this.showCustomer1 = false;
//             this.showOther1 = false;
//             this.showVendor1 = false;
//             this.showCompany1 = true;
//         }
//     }
//     getOwnerType(value) {
//         if (value == 1) {
//             this.showCustomer2 = true;
//             this.showOther2 = false;
//             this.showVendor2 = false;
//             this.showCompany2 = false;
//         }
//         if (value == 2) {
//             this.showCustomer2 = false;
//             this.showOther2= true;
//             this.showVendor2 = false;
//             this.showCompany2 = false;
//         }
//         if (value == 3) {
//             this.showCustomer2 = false;
//             this.showOther2 = false;
//             this.showVendor2 = true;
//             this.showCompany2 = false;
//         }
//         if (value == 4) {
//             this.showCustomer2 = false;
//             this.showOther2 = false;
//             this.showVendor2 = false;
//             this.showCompany2 = true;
//         }
//     }

//     filterCustomerNames(event) {
// 		this.customersList = this.allCustomersList;

// 		if (event.query !== undefined && event.query !== null) {
// 			const customers = [...this.allCustomersList.filter(x => {
// 				return x.label.toLowerCase().includes(event.query.toLowerCase())
// 			})]
// 			this.customersList = customers;
// 		}
//     }    

// 	filterVendorNames(event) {
// 		this.vendorsList = this.allVendorsList;

// 		if (event.query !== undefined && event.query !== null) {
// 			const vendors = [...this.allVendorsList.filter(x => {
// 				return x.label.toLowerCase().includes(event.query.toLowerCase())
// 			})]
// 			this.vendorsList = vendors;
// 		}
// 	}

// 	filterCompanyNames(event) {
// 		this.companyList = this.allCompanyList;

// 		if (event.query !== undefined && event.query !== null) {
// 			const companies = [...this.allCompanyList.filter(x => {
// 				return x.label.toLowerCase().includes(event.query.toLowerCase())
// 			})]
// 			this.companyList = companies;
// 		}
// 	}
// }