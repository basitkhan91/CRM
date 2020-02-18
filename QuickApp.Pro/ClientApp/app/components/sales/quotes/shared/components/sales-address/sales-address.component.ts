import { Component,Input } from "@angular/core";
import { ISalesQuote } from "../../../../../../models/sales/ISalesQuote.model";
import { SalesQuote } from "../../../../../../models/sales/SalesQuote.model";
import { ISalesOrderQuote } from "../../../../../../models/sales/ISalesOrderQuote";
import { SalesOrderQuote } from "../../../../../../models/sales/SalesOrderQuote";
import { SalesQuoteService } from "../../../../../../services/salesquote.service";
import { CustomerService } from "../../../../../../services/customer.service";
import { SiteService } from '../../../../../../services/site.service';
import { Site } from '../../../../../../models/site.model';
import { CustomerShippingModel } from '../../../../../../models/customer-shipping.model';
import { CustomerInternationalShipVia } from '../../../../../../models/customer-internationalshipping.model';
import { VendorService } from '../../../../../../services/vendor.service';
import { CommonService } from '../../../../../../services/common.service';
import { CompanyService } from '../../../../../../services/company.service';
import { AlertService, MessageSeverity } from '../../../../../../services/alert.service';
import { AuthService } from '../../../../../../services/auth.service';
import { getValueFromObjectByKey, getObjectById, editValueAssignByCondition, getObjectByValue } from '../../../../../../generic/autocomplete';


@Component({
  selector: "app-sales-address",
  templateUrl: "./sales-address.component.html",
  styleUrls: ["./sales-address.component.css"]
})
export class SalesAddressComponent {
  @Input() customerId: any;
  salesQuote: ISalesQuote;
  salesOrderQuote: ISalesOrderQuote;
  allSites: any[];
  siteList:any[]=[];
  billingInfoList:any=[];
  allCustomer:any[];
	customerNames:any[];
	userNames:any[];
	billToUserNames:any[];
  demosticShippingViaData:any[];
  tempMemo: any;
  tempMemoLabel: any;
  addressSiteNameHeader: string;
	addressSiteName: any = {};
	tempShipTOAddressId: any;
  tempBillTOAddressId: any;
  tempshipToAddress: any = {};
	tempbillToAddress: any = {};
  tempshipVia: any = {};
  billToAddress: any = {};
	shipToAddress: any = {};
  addressFormForShipping = new CustomerShippingModel()
	addressFormForBilling = new CustomerShippingModel()
	legalEntity: any;
	legalEntityList_ForShipping: any[];
	legalEntityList_ForBilling: any[];
  addShipViaFormForShipping = new CustomerInternationalShipVia();
  isEditModeShipping: boolean = false;
	isEditModeBilling: boolean = false;
  isEditModeShipVia: boolean = false;
  isEditMode: boolean = false;
  billToCusData: any;
  allCountriesList: any = [];
  countriesList: any = [];
  vendorSelectedForBillTo: any;
  companySiteList_Billing: any;
  vendorSelected: any[] = [];
  shipToCusData: any[] = [];
  companySiteList_Shipping: any;
  shipViaList: any = [];
  shipToSelectedvalue: any;
  billToSelectedvalue: any;
  billToContactData: any[] = [];
  shipToContactData: any = [];
  firstNamesShipTo: any = [];
  firstNamesBillTo: any = [];
  vendorContactsForshipTo: any[] = [];
  vendorContactsForBillTO: any[] = [];
	contactListForShippingCompany: any;
	contactListForCompanyShipping: any;
	contactListForCompanyBilling: any;
	contactListForBillingCompany: any;
	inputValidCheck: any;
	userList:any[]=[];
	billToUserList:any[]=[];
	vendorList: any[];
	billToSiteList:any[] = [];
  constructor(private salesQuoteService: SalesQuoteService,
    private siteService: SiteService,
    private customerService: CustomerService,
    private companyService: CompanyService,
		private commonService: CommonService,
    public vendorService: VendorService,
    private alertService: AlertService,
    private authService: AuthService,) {
    this.salesQuote = new SalesQuote();

  }
  ngOnInit(): void {

    this.salesQuoteService
    .getSalesOrderQuteInstance()
    .subscribe(data => {
      this.salesOrderQuote = data;
    });
   
   
   // this.getDomesticShippingByCustomerId();
   // this.getBillingDataById();
    this.getCustomerList();
		this.getLegalEntity();
		this.getVendorList();
		this.getCountriesList();

   
	}
getDefaultShipping() {
  if (this.siteList) {
      if (this.siteList.length > 0) {
          for (let i = 0; i < this.siteList.length; i++) {
              let isPrimary = this.siteList[i].isPrimary;
              console.log(isPrimary);
              if (isPrimary) {
                 this.salesOrderQuote.shipToSiteName = this.siteList[i].siteName;
                 this.onShipSiteSelect(this.salesOrderQuote.shipToSiteName);
              }
          }
      }
  }
}
saveShippingAddressToPO(){

}
saveBillingAddressToPO(){

}
saveShipToShipViaDetailsToPO(){
	
}
getDefaultBilling() {
  if (this.billToSiteList) {
      if (this.billToSiteList.length > 0) {
          for (let i = 0; i < this.billToSiteList.length; i++) {
              let isPrimary = this.billToSiteList[i].isPrimary;
              console.log(isPrimary);
              if (isPrimary) {
                 this.salesOrderQuote.billToSiteName = this.billToSiteList[i].siteName; 
                 this.onBillSiteSelect(this.salesOrderQuote.billToSiteName);
              }
          }
      }
      console.log(this.salesOrderQuote);
  }
}
private getCustomerList() {
		this.commonService.smartDropDownList('Customer', 'CustomerId', 'Name').subscribe(response => {
			this.allCustomer = response;
		});
}
private getVendorList() {
	this.commonService.smartDropDownList('Vendor', 'VendorId', 'VendorName').subscribe(response => {
		this.vendorList = response;
	});
}
getLegalEntity() {
	this.commonService.smartDropDownList('LegalEntity', 'LegalEntityId', 'Name').subscribe(res => {
		this.legalEntity = res;
	})
}
getCountriesList() {
	this.commonService.smartDropDownList('Countries', 'countries_id', 'nice_name').subscribe(res => {
		this.allCountriesList = res;
	})
}

filterUserNames(event) {
	console.log(this.userList);
  this.userNames = this.userList;

  const customerListData = [...this.userList.filter(x => {
      return x.label.toLowerCase().includes(event.query.toLowerCase())
  })]
  this.userNames = customerListData;
}
filterBillToUserNames(event) {
	console.log(this.billToUserList);
  this.billToUserNames = this.billToUserList;

  const customerListData = [...this.billToUserList.filter(x => {
      return x.label.toLowerCase().includes(event.query.toLowerCase())
  })]
  this.billToUserNames = customerListData;
}
filterCountries(event) {
	this.countriesList = this.allCountriesList;
	if (event.query !== undefined && event.query !== null) {
		const countries = [...this.allCountriesList.filter(x => {
			return x.label.toLowerCase().includes(event.query.toLowerCase())
		})]
		this.countriesList = countries;
	}
}


filterCustomerContactsForShipTo(event) {
	this.firstNamesShipTo = this.shipToContactData;

	if (event.query !== undefined && event.query !== null) {
		const customerContacts = [...this.shipToContactData.filter(x => {
			return x.firstName.toLowerCase().includes(event.query.toLowerCase())
		})]
		this.firstNamesShipTo = customerContacts;
	}
}
filterCustomerContactsForBillTo(event) {
	this.firstNamesBillTo = this.billToContactData;

	if (event.query !== undefined && event.query !== null) {
		const customerContacts = [...this.billToContactData.filter(x => {
			return x.firstName.toLowerCase().includes(event.query.toLowerCase())
		})]
		this.firstNamesBillTo = customerContacts;
	}
}



  onShipSiteSelect(event) {
    console.log(event);
    if (this.siteList) {
        for (let i = 0; i < this.siteList.length; i++) {
            if (event == this.siteList[i].siteName) {
							let ch = +this.salesOrderQuote.shipToUserTypeId;
							switch(ch){
								case 1:
								this.salesOrderQuote.shipToAddressId = this.siteList[i].customerShippingAddressId;
								break;
								case 2:
								this.salesOrderQuote.shipToAddressId = this.siteList[i].vendorShippingAddressId;
								break;
								case 3:
								this.salesOrderQuote.shipToAddressId = this.siteList[i].legalEntityShippingAddressId;
								break;
					
							}
              //this.getShipViaByDomesticShippingId(this.siteList[i].customerShippingAddressId);
               this.salesOrderQuote.shipToAddress1 = this.siteList[i].address1;
               this.salesOrderQuote.shipToAddress2 = this.siteList[i].address2;
               this.salesOrderQuote.shipToAddress3 = this.siteList[i].address3;
               this.salesOrderQuote.shipToCity = this.siteList[i].city;
               this.salesOrderQuote.shipToState = this.siteList[i].stateOrProvince;
               this.salesOrderQuote.shipToPostalCode = this.siteList[i].postalCode;
               this.salesOrderQuote.shipToCountry = this.siteList[i].country;
            }
        }
    }
  }
  onShipViaSelect(event) {
    console.log(event);
    if (this.shipViaList) {
        for (let i = 0; i < this.shipViaList.length; i++) {
            if (event == this.shipViaList[i].name) {
               this.salesOrderQuote.shipViaShippingAccountInfo = this.shipViaList[i].shippingAccountInfo;
			   this.salesOrderQuote.shippingId = this.shipViaList[i].shippingId;
			   this.salesOrderQuote.shipViaId = this.shipViaList[i].shippingViaId;
			   
               this.salesOrderQuote.shipViaMemo = this.shipViaList[i].memo;
               this.salesOrderQuote.shippingURL = this.shipViaList[i].shippingURL;
               this.salesOrderQuote.shipViaShippingURL = this.shipViaList[i].shippingURL;
              
            }
        }
    }
  }
  onBillSiteSelect(event) {
	console.log(this.billToSiteList);
	console.log(event);
    if (this.billToSiteList) {
        for (let i = 0; i < this.billToSiteList.length; i++) {
            if (event == this.billToSiteList[i].siteName) {
				let ch = +this.salesOrderQuote.shipToUserTypeId;
				switch(ch){
					case 1:
					this.salesOrderQuote.billToAddressId = this.billToSiteList[i].customerBillingAddressId;
					break;
					case 2:
					this.salesOrderQuote.billToAddressId = this.billToSiteList[i].vendorBillingAddressId;
					break;
					case 3:
					this.salesOrderQuote.billToAddressId = this.billToSiteList[i].legalEntityBillingAddressId;
					break;
		
				}
              this.salesOrderQuote.billToAddress1 = this.billToSiteList[i].address1;
              this.salesOrderQuote.billToAddress2 = this.billToSiteList[i].address2;
              this.salesOrderQuote.billToAddress3 = this.billToSiteList[i].address3;
              this.salesOrderQuote.billToCity = this.billToSiteList[i].city;
              this.salesOrderQuote.billToState = this.billToSiteList[i].stateOrProvince;
              this.salesOrderQuote.billToPostalCode = this.billToSiteList[i].postalCode;
              this.salesOrderQuote.billToCountry = this.billToSiteList[i].country;
            }
        }
    }
  }

  onAddDescription(value) {
    this.tempMemo = "";
    if (value == "shipViaMemo") {
      this.tempMemoLabel = "Ship Via Memo";
      this.tempMemo = this.salesOrderQuote.shipViaMemo;
    }
    if (value == "billToMemo") {
      this.tempMemoLabel = "Bill To Memo";
      this.tempMemo = this.salesOrderQuote.billToMemo;
    }
  }

  onSaveDescription() {
    if (this.tempMemoLabel == "Ship Via Memo") {
      this.salesOrderQuote.shipViaMemo = this.tempMemo;
    }
    if (this.tempMemoLabel == "Bill To Memo") {
      this.salesOrderQuote.billToMemo = this.tempMemo;
    }
  }

  resetAddressShippingForm() {
		this.addressFormForShipping = new CustomerShippingModel();
		this.isEditModeShipping = false;
  }

  resetAddressBillingForm() {
		this.addressFormForBilling = new CustomerShippingModel();
		this.isEditModeBilling = false;
  }

  onClickShipSiteName(value, data?) {
		this.resetAddressShippingForm();

		let ch = +this.salesOrderQuote.shipToUserTypeId;
		switch(ch){
			case 1:
			if (value === 'AddSiteName') {
				this.addressSiteNameHeader = 'Add Ship To Customer Details';
			}
			if (value === 'EditSiteName') {
				this.addressSiteNameHeader = 'Edit Ship To Customer Details';
				this.isEditModeShipping = true;
				this.tempshipToAddress = getObjectById('customerShippingAddressId', data.shipToAddressId, this.siteList);	
			}
			break;
			case 2:
			if (value === 'AddSiteName') {
				this.addressSiteNameHeader = 'Add Ship To Vendor Details';
			}
			if (value === 'EditSiteName') {
				this.addressSiteNameHeader = 'Edit Ship To Vendor Details';
				this.isEditModeShipping = true;
				this.tempshipToAddress = getObjectById('vendorShippingAddressId', data.shipToAddressId, this.siteList);	
			}
			break;
			case 3:
			if (value === 'AddSiteName') {
				this.addressSiteNameHeader = 'Add Ship To Company Details';
			}
			if (value === 'EditSiteName') {
				this.addressSiteNameHeader = 'Edit Ship To Company Details';
				this.isEditModeShipping = true;
				this.tempshipToAddress = getObjectById('legalEntityShippingAddressId', data.shipToAddressId, this.siteList);	
			}
			break;

		}

		if (value === 'EditSiteName') {
		console.log(data);
		console.log(this.tempshipToAddress);
		if (typeof this.tempshipToAddress.country == 'number') {
			this.addressFormForShipping = { ...this.tempshipToAddress, country: getObjectByValue('value', this.tempshipToAddress.country, this.allCountriesList) };
		} else {
			this.addressFormForShipping = { ...this.tempshipToAddress, country: getObjectByValue('label', this.tempshipToAddress.country, this.allCountriesList) };
		}
	}
	
	}

	onClickBillSiteName(value, data?) {
		this.resetAddressBillingForm();

		let ch = +this.salesOrderQuote.billToUserTypeId;
		switch(ch){
			case 1:
			if (value === 'AddSiteName') {
				this.addressSiteNameHeader = 'Add Bill To Customer Details';
			}
			if (value === 'EditSiteName') {
				this.addressSiteNameHeader = 'Edit Bill To Customer Details';
				this.isEditModeShipping = true;
				this.tempBillTOAddressId = getObjectById('customerBillingAddressId', data.billToAddressId, this.billToSiteList);
			
			}
			break;
			case 2:
			if (value === 'AddSiteName') {
				this.addressSiteNameHeader = 'Add Bill To Vendor Details';
			}
			if (value === 'EditSiteName') {
				this.addressSiteNameHeader = 'Edit Bill To Vendor Details';
				this.isEditModeShipping = true;
				this.tempbillToAddress = getObjectById('vendorBillingAddressId', data.billToAddressId, this.billToSiteList);
			}
			break;
			case 3:
			if (value === 'AddSiteName') {
				this.addressSiteNameHeader = 'Add Bill To Company Details';
			}
			if (value === 'EditSiteName') {
				this.addressSiteNameHeader = 'Edit Bill To Company Details';
				this.isEditModeShipping = true;
				this.tempbillToAddress = getObjectById('legalEntityBillingAddressId', data.billToAddressId, this.billToSiteList);
			}
			break;

		}

		if (value === 'EditSiteName') {
		console.log(data);
		console.log(this.tempshipToAddress);
		if (typeof this.tempBillTOAddressId.country == 'number') {
			this.addressFormForBilling = { ...this.tempBillTOAddressId, country: getObjectByValue('value', this.tempBillTOAddressId.country, this.allCountriesList) };
		} else {
			this.addressFormForBilling = { ...this.tempBillTOAddressId, country: getObjectByValue('label', this.tempBillTOAddressId.country, this.allCountriesList) };
		}
	}
	
	}

  get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}


	// ship to
	onChangeShipToUserType(){

		console.log(this.salesOrderQuote.shipToUserTypeId);
		console.log(this.allCustomer);
		let ch = +this.salesOrderQuote.shipToUserTypeId;
		switch(ch){
			case 1:
			this.userList = this.allCustomer;
			console.log(this.userList);
			break;
			case 2:
			this.userList = this.vendorList;
			break;
			case 3:
			this.userList = this.legalEntity;
			break;

		}
	}
  
  async saveShippingAddress() {
		const data = {
			...this.addressFormForShipping,
			createdBy: this.userName,
			updatedBy: this.userName,
			masterCompanyId: 1,
			isActive: true,
		}
		console.log(this.salesOrderQuote.shipToUserTypeId);
		if (this.salesOrderQuote.shipToUserTypeId == 1) {
			const customerData = { ...data, isPrimary: true, customerId: getValueFromObjectByKey('value', this.salesOrderQuote.shipToUserId), country: getValueFromObjectByKey('value', data.country) }
			if (!this.isEditModeShipping) {
				await this.customerService.newShippingAdd(customerData).subscribe(response => {
					this.onShipToUserSelected(customerData.customerId, this.salesOrderQuote, response.customerShippingId);
					// this.addressFormForShipping = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved Shipping Information Successfully`,
						MessageSeverity.success
					);
				})
			} else {
				await this.customerService.newShippingAdd(customerData).subscribe(response => {
					this.onShipToUserSelected(customerData.customerId, this.salesOrderQuote, response.customerShippingId);
					this.alertService.showMessage(
						'Success',
						`Updated Shipping Information Successfully`,
						MessageSeverity.success
					);
				})
			}
		}
		if (this.salesOrderQuote.shipToUserTypeId == 2) {
			const vendorData = { ...data, vendorId: getValueFromObjectByKey('value', this.salesOrderQuote.shipToUserId), country: getValueFromObjectByKey('value', data.country) }
			console.log(vendorData);
			if (!this.isEditModeShipping) {
				await this.vendorService.newShippingAdd(vendorData).subscribe(response => {
					this.onShipToUserSelected(vendorData.vendorId, this.salesOrderQuote, response.vendorShippingAddressId);
					// this.addressFormForShipping = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved Shipping Information Successfully `,
						MessageSeverity.success
					);

				})
			} else {
				await this.vendorService.newShippingAdd(vendorData).subscribe(response => {
					this.onShipToUserSelected(vendorData.vendorId, this.salesOrderQuote, response.vendorShippingAddressId);
					this.alertService.showMessage(
						'Success',
						`Updated Shipping Information Successfully`,
						MessageSeverity.success
					);
				})
			}
		}
		if (this.salesOrderQuote.shipToUserTypeId == 3) {
			const companyData = { ...data, legalentityId: getValueFromObjectByKey('value', this.salesOrderQuote.shipToUserId), country: getValueFromObjectByKey('value', data.country) }
			if (!this.isEditModeShipping) {
				await this.companyService.addNewShippingAddress(companyData).subscribe(response => {
					this.onShipToUserSelected(companyData.legalentityId, this.salesOrderQuote, response.legalEntityShippingAddressId);
					// this.addressFormForShipping = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved Shipping Information Successfully `,
						MessageSeverity.success
					);
				})
			} else {
				await this.companyService.addNewShippingAddress(companyData).subscribe(response => {
					this.onShipToUserSelected(companyData.legalentityId, this.salesOrderQuote, response.legalEntityShippingAddressId);
					this.alertService.showMessage(
						'Success',
						`Updated Shipping Information Successfully`,
						MessageSeverity.success
					);
				})
			}
		}
	}

	onShipToUserSelected(userId, res?, id?) {
		console.log(userId);
		this.clearInputOnClickUserIdShipTo();
		this.shipToSelectedvalue = userId;
		this.getShipViaDetailsForShipTo();
		let ch = +this.salesOrderQuote.shipToUserTypeId;
		switch(ch){
			case 1:
			this.onShipToCustomerSelected(userId, res, id);
			break;
			case 2:
			this.onShipToVendorSelected(userId, res, id);
			break;
			case 3:
			this.onShipToCompanySelected(userId, res, id);
			break;

		}
		if(!this.salesOrderQuote.salesOrderQuoteId)
        this.getDefaultShipping();
	}
	
  
	onShipToCustomerSelected(customerId, res?, id?) {
	
		this.customerService.getCustomerShipAddressGet(customerId).subscribe(
			returnddataforbill => {
				this.siteList = returnddataforbill[0];
				if (id) {
					res.shipToAddressId = id;
				}
				if (this.isEditMode) {
					if (res.shipToAddressId == 0) {
						this.siteList.push({ customerShippingAddressId: 0, address1: res.shipToAddress1, address2: res.shipToAddress2, city: res.shipToCity, stateOrProvince: res.shipToStateOrProvince, postalCode: res.shipToPostalCode, country: res.shipToCountry, siteName: res.shipToSiteName })
					}
				}
				this.onShipToGetAddress(res, res.shipToAddressId);
			});
		this.customerService.getContacts(customerId).subscribe(data => {
			this.shipToContactData = data[0];
			if (this.isEditMode) {
				//this.tempROHeaderAddress.shipToContactId = getObjectById('contactId', res.shipToContactId, this.shipToContactData);
			}
		});
	
	}

	onShipToVendorSelected(vendorId, res?, id?) {
	
		this.vendorService.getVendorShipAddressGet(vendorId).subscribe(
			returdaa => {
				console.log(returdaa);
				this.siteList = returdaa[0];
				if (id) {
					res.shipToAddressId = id;
				}
				if (this.isEditMode) {
					if (res.shipToAddressId == 0) {
						this.vendorSelected.push({ vendorShippingAddressId: 0, address1: res.shipToAddress1, address2: res.shipToAddress2, city: res.shipToCity, stateOrProvince: res.shipToStateOrProvince, postalCode: res.shipToPostalCode, country: res.shipToCountry, siteName: res.shipToSiteName })
					}
				}
				this.onShipToGetAddress(res, res.shipToAddressId);
			});
		this.vendorService.getContacts(vendorId).subscribe(data => {
			this.shipToContactData = data[0]; //vendorContactsForshipTo
			if (this.isEditMode) {
			//	this.tempROHeaderAddress.shipToContactId = getObjectById('contactId', res.shipToContactId, this.vendorContactsForshipTo);
			}
		});
	}

	onShipToCompanySelected(object?, res?, id?) {
		this.companyService.getShippingCompanySiteNames(this.shipToSelectedvalue).subscribe((response:any[]) => {
			console.log(response);
			this.siteList = response;
			if (id) {
				res.shipToAddressId = id;
			}
			this.onShipToGetAddress(res, res.shipToAddressId);
		});
		this.companyService.getCompanyContacts(this.shipToSelectedvalue).subscribe(response => {
			this.shipToContactData = response;
		})
  	}

  onShipToGetAddress(data, id) {
		console.log(data, id);
		this.shipToAddress = {};
			if (data.shipToUserTypeId == 1 || data.shipToUserType == 1) {
				this.shipToAddress = getObjectById('customerShippingAddressId', id, this.siteList);
			} else if (data.shipToUserTypeId == 2 || data.shipToUserType == 2) {
				this.shipToAddress = getObjectById('vendorShippingAddressId', id, this.siteList);
			}else if (data.shipToUserTypeId == 3 || data.shipToUserType == 3) {
				this.shipToAddress = getObjectById('legalEntityShippingAddressId', id, this.siteList);
			}
			this.shipToAddress = { ...this.shipToAddress, country: this.shipToAddress.countryName ? this.shipToAddress.countryName : this.shipToAddress.country }

			this.salesOrderQuote.shipToAddress1 = this.shipToAddress.address1;
			this.salesOrderQuote.shipToAddress2 = this.shipToAddress.address2;
			this.salesOrderQuote.shipToAddress3 = this.shipToAddress.address3;
			this.salesOrderQuote.shipToCity = this.shipToAddress.city;
			this.salesOrderQuote.shipToState = this.shipToAddress.stateOrProvince;
			this.salesOrderQuote.shipToPostalCode = this.shipToAddress.postalCode;
			this.salesOrderQuote.shipToCountry = this.shipToAddress.country;	

	}
  clearInputShipTo() {
	this.salesOrderQuote.shipToUserId = null;
//	this.salesOrderQuote.shipToAddressId = "null";
	this.salesOrderQuote.shipToContactId = null;
	//this.salesOrderQuote.shipToMemo = '';
	this.salesOrderQuote.shippingId = "null";
	this.salesOrderQuote.shipViaShippingAccountInfo = null;
	this.salesOrderQuote.shippingId = null;
	this.salesOrderQuote.shippingURL = '';
	this.shipToAddress = {};
	this.shipViaList = [];
	this.shipToCusData = [];
	this.vendorSelected = [];
	this.companySiteList_Shipping = [];
}

clearInputOnClickUserIdShipTo() {
//	this.salesOrderQuote.shipToAddressId = "null";
	this.salesOrderQuote.shipToContactId = null;
//	this.salesOrderQuote.shipToMemo = '';
//	this.salesOrderQuote.shipViaId = "null";
	this.salesOrderQuote.shipViaShippingAccountInfo = null;
	this.salesOrderQuote.shippingId = null;
	this.salesOrderQuote.shippingURL = '';
	this.shipToAddress = {};
	this.shipViaList = [];
	this.shipToCusData = [];
	this.vendorSelected = [];
	this.companySiteList_Shipping = [];
}
  
  
  getShipViaDetailsForShipTo(id?) {
		this.commonService.getShipViaDetailsByModule(this.salesOrderQuote.shipToUserTypeId, this.shipToSelectedvalue).subscribe(response => {
			this.shipViaList = response;
			if (id) {
			//	this.salesOrderQuote.shipViaId = id;
				this.getShipViaDetails(id);
			}
		})
  }
  getShipViaDetails(id) {
		this.salesOrderQuote.shipViaShippingAccountInfo = null;
		this.salesOrderQuote.shippingId = null;
		this.salesOrderQuote.shippingURL = '';
		this.salesOrderQuote.shipViaMemo = '';
		this.salesOrderQuote.shipViaShippingURL = '';
        var userType = this.salesOrderQuote.shipToUserTypeId ? this.salesOrderQuote.shipToUserTypeId : 0;
        this.commonService.getShipViaDetailsById(id, userType).subscribe(res => {
			const responseData = res;
			this.salesOrderQuote.shipViaShippingAccountInfo = responseData.shippingAccountInfo;
			this.salesOrderQuote.shippingURL = responseData.shippingURL;
			this.salesOrderQuote.shipViaShippingURL = responseData.shippingURL;
			this.salesOrderQuote.shippingId = responseData.shippingId;
			this.salesOrderQuote.shipViaName = responseData.shipVia;
			this.salesOrderQuote.shipViaMemo = responseData.shipVia;
			console.log(res)
		})
	}

	 //Bill to
	 onChangeBillToUserType(){

		//console.log(this.salesOrderQuote.billToUserTypeId);
		//console.log(this.allCustomer);
		let ch = +this.salesOrderQuote.billToUserTypeId;
		switch(ch){
			case 1:
			this.billToUserList = this.allCustomer;
			//console.log(this.userList);
			break;
			case 2:
			this.billToUserList = this.vendorList;
			break;
			case 3:
			this.billToUserList = this.legalEntity;
			break;

		}
	}
	async saveBillingAddress() {
		const data = {
			...this.addressFormForBilling,
			createdBy: this.userName,
			updatedBy: this.userName,
			masterCompanyId: 1,
			isActive: true,
			isPrimary: true
		}
		console.log(this.salesOrderQuote.billToUserTypeId);
		if (this.salesOrderQuote.billToUserTypeId == 1) {
			const customerData = { ...data, customerId: getValueFromObjectByKey('value', this.salesOrderQuote.billToUserId), country: getValueFromObjectByKey('value', data.country) }
			console.log(customerData);
			if (!this.isEditModeBilling) {
				await this.customerService.newBillingAdd(customerData).subscribe(response => {
					this.onBillToCustomerSelected(customerData.customerId, this.salesOrderQuote, response.customerBillingAddressId);
					// this.addressFormForBilling = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved  Billing Information Sucessfully `,
						MessageSeverity.success
					);
				})
			} else {
				await this.customerService.newBillingAdd(customerData).subscribe(response => {
					this.onBillToCustomerSelected(customerData.customerId, this.salesOrderQuote, response.customerBillingAddressId);
					this.alertService.showMessage(
						'Success',
						`Updated Billing Information Successfully`,
						MessageSeverity.success
					);
				})
			}

		}
		if (this.salesOrderQuote.billToUserTypeId == 2) {
			
			const vendorData = { ...data, vendorId: getValueFromObjectByKey('vendorId', this.salesOrderQuote.billToUserId), country: getValueFromObjectByKey('label', data.country) }
			console.log(vendorData);
			if (!this.isEditModeBilling) {
				await this.vendorService.addNewBillingAddress(vendorData).subscribe(response => {
					this.onBillToVendorSelected(vendorData.vendorId, this.salesOrderQuote, response.vendorBillingAddressId);
					//this.onBillCompanySelected();
					// this.addressFormForBilling = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved  Billing Information Sucessfully `,
						MessageSeverity.success
					);
				})
			} else {
				await this.vendorService.addNewBillingAddress(vendorData).subscribe(response => {
					this.onBillToVendorSelected(vendorData.vendorId, this.salesOrderQuote, response.vendorBillingAddressId);
					this.alertService.showMessage(
						'Success',
						`Updated Billing Information Successfully`,
						MessageSeverity.success
					);
				})
			}
		}
		if (this.salesOrderQuote.billToUserTypeId == 3) {
			const companyData = { ...data, legalentityId: getValueFromObjectByKey('value', this.salesOrderQuote.billToUserId), country: getValueFromObjectByKey('label', data.country) }
			if (!this.isEditModeBilling) {
				await this.companyService.addNewBillingAddress(companyData).subscribe(response => {
					this.onBillToCompanySelected(null, this.salesOrderQuote, response.legalEntityBillingAddressId);
					// this.addressFormForBilling = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved  Billing Information Sucessfully `,
						MessageSeverity.success
					);
				})
			} else {
				await this.companyService.addNewBillingAddress(companyData).subscribe(response => {
					this.onBillToCompanySelected(null, this.salesOrderQuote, response.legalEntityBillingAddressId);
					this.alertService.showMessage(
						'Success',
						`Updated Billing Information Successfully`,
						MessageSeverity.success
					);
				})
			}
		}
		// this.onBillCompanySelected();
	}
	onBillToUserSelected(userId, res?, id?) {
		console.log(userId);
		this.clearInputOnClickUserIdBillTo();
		this.billToSelectedvalue = userId;
		let ch = +this.salesOrderQuote.billToUserTypeId;
		switch(ch){
			case 1:
			this.onBillToCustomerSelected(userId, res, id);
			break;
			case 2:
			this.onBillToVendorSelected(userId, res, id);
			break;
			case 3:
			this.onBillToCompanySelected(userId, res, id);
			break;

		}
		if(!this.salesOrderQuote.salesOrderQuoteId)
        this.getDefaultBilling();
	}

  // bill to
	onBillToCustomerSelected(customerId, res?, id?) {
		this.customerService.getCustomerBillViaDetails(customerId).subscribe(
			(returnddataforbill:any[]) => {
				this.billToSiteList = returnddataforbill[0];
				if (id) {
					res.billToAddressId = id;
				}
				if (this.isEditMode) {
					if (res.billToAddressId == 0) {
						this.billToSiteList.push({ customerBillingAddressId: 0, address1: res.billToAddress1, address2: res.billToAddress2, city: res.billToCity, stateOrProvince: res.billToStateOrProvince, postalCode: res.billToPostalCode, country: res.billToCountry, siteName: res.billToSiteName })
					}
				}
				this.onBillToGetAddress(res, res.billToAddressId);
			});
		this.customerService.getContacts(customerId).subscribe(data => {
			this.billToContactData = data[0];
			if (this.isEditMode) {
				//this.tempROHeaderAddress.billToContactId = getObjectById('contactId', res.billToContactId, this.billToContactData);
			}
		});
	}

	async onBillToVendorSelected(vendorId, res?, id?) {
	//	this.showInput = true;
		await this.vendorService.getVendorSiteNames(vendorId).subscribe(
			(returdaa:any[]) => {
				this.billToSiteList = returdaa;
				if (id) {
					res.billToAddressId = id;
					this.onBillToGetAddress(res, res.billToAddressId);
				}
				if (this.isEditMode) {
					if (res.billToAddressId == 0) {
						this.billToSiteList.push({ vendorBillingAddressId: 0, siteName: res.billToSiteName });
					} else {
						this.onBillToGetAddress(res, res.billToAddressId);
					}
				}
			})
		this.vendorService.getContacts(vendorId).subscribe(
			returdaa => {
				this.billToContactData = returdaa[0];
				if (this.isEditMode) {
				//	this.tempROHeaderAddress.billToContactId = getObjectById('contactId', res.billToContactId, this.vendorContactsForBillTO);
				}
			})
	}

	onBillToCompanySelected(object?, response?, id?) {
		this.companyService.getBillingCompanySiteNames(this.billToSelectedvalue).subscribe((res:any[]) => {
			this.billToSiteList = res;
			if (id) {
				response.billToAddressId = id;
			}
			this.onBillToGetAddress(response, response.billToAddressId);
		})
		this.companyService.getCompanyContacts(this.billToSelectedvalue).subscribe((res:any[]) => {
			this.billToContactData = res;
		})
	}

	onBillToGetAddress(data, id) {
		console.log(data, id);
		this.shipToAddress = {};
			if (data.shipToUserTypeId == 1 || data.shipToUserType == 1) {
				this.billToAddress = getObjectById('customerBillingAddressId', id, this.billToSiteList);
			} else if (data.shipToUserTypeId == 2 || data.shipToUserType == 2) {
				this.billToAddress = getObjectById('vendorBillingAddressId', id, this.billToSiteList);
			}else if (data.shipToUserTypeId == 3 || data.shipToUserType == 3) {
				this.billToAddress = getObjectById('legalEntityBillingAddressId', id, this.billToSiteList);
			}
			this.billToAddress = { ...this.billToAddress, country: this.shipToAddress.countryName ? this.shipToAddress.countryName : this.shipToAddress.country }

			this.salesOrderQuote.billToAddress1 = this.billToAddress.address1;
			this.salesOrderQuote.billToAddress2 = this.billToAddress.address2;
			this.salesOrderQuote.billToAddress3 = this.billToAddress.address3;
			this.salesOrderQuote.billToCity = this.billToAddress.city;
			this.salesOrderQuote.billToState = this.billToAddress.stateOrProvince;
			this.salesOrderQuote.billToPostalCode = this.billToAddress.postalCode;
			this.salesOrderQuote.billToCountry = this.billToAddress.country;	

	}



	clearInputBillTo() {
		this.salesOrderQuote.billToUserId = null;
		this.salesOrderQuote.billToAddressId = null;
		this.salesOrderQuote.billToContactId = null;
		this.billToAddress = {};
		this.salesOrderQuote.billToMemo = '';
		this.billToCusData = [];
		this.vendorSelectedForBillTo = [];
		this.companySiteList_Billing = [];
	}

	clearInputOnClickUserIdBillTo() {
		this.salesOrderQuote.billToAddressId = null;
		this.salesOrderQuote.billToContactId = null;
		this.billToAddress = {};
		this.salesOrderQuote.billToMemo = '';
		this.billToCusData = [];
		this.vendorSelectedForBillTo = [];
		this.companySiteList_Billing = [];
  }

//Ship via 
  resetAddressShipViaForm() {
	this.addShipViaFormForShipping = new CustomerInternationalShipVia();
	this.isEditModeShipVia = false;
}
onEditShipVia(data) {
	//if(value == 'EditCustShipVia') {
	this.tempshipVia = getObjectById('shippingViaId', data.shipViaId, this.shipViaList);
	this.addShipViaFormForShipping = { ...this.tempshipVia, shipVia: this.tempshipVia.name };
	console.log(this.addShipViaFormForShipping);
	this.isEditModeShipVia = true;
	//}
}


  async saveShipViaForShipTo() {
	//this.salesOrderQuote.shipViaId = "null";
	this.salesOrderQuote.shipViaShippingAccountInfo = '';
	this.salesOrderQuote.shippingId = '';
	this.salesOrderQuote.shippingURL = '';
	const data = {
		...this.addShipViaFormForShipping,
		name: this.addShipViaFormForShipping.shipVia,
		createdBy: this.userName,
		updatedBy: this.userName,
		masterCompanyId: 1,
		isActive: true,
		UserType: this.salesOrderQuote.shipToUserTypeId
	}

	if (this.salesOrderQuote.shipToUserTypeId == 1) {
		const customerData = { ...data, ReferenceId: getValueFromObjectByKey('value', this.salesOrderQuote.shipToUserId), AddressId: this.salesOrderQuote.shipToAddressId ? this.salesOrderQuote.shipToAddressId : 0 }
		if (!this.isEditModeShipVia) {
			await this.commonService.createShipVia(customerData).subscribe(response => {
				this.getShipViaDetailsForShipTo(response.shippingViaId);
				// this.addressFormForShipping = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved Ship Via Information Sucessfully `,
					MessageSeverity.success
				);
			})
		} else {
			await this.commonService.createShipVia(customerData).subscribe(response => {
				this.getShipViaDetailsForShipTo(response.shippingViaId);
				this.alertService.showMessage(
					'Success',
					`Updated Ship Via Information Sucessfully`,
					MessageSeverity.success
				);
			})
		}
	}
	if (this.salesOrderQuote.shipToUserTypeId == 2) {
		const vendorData = { ...data, ReferenceId: getValueFromObjectByKey('vendorId', this.salesOrderQuote.shipToUserId), AddressId: this.salesOrderQuote.shipToAddressId ? this.salesOrderQuote.shipToAddressId : 0 }
		if (!this.isEditModeShipVia) {
			await this.commonService.createShipVia(vendorData).subscribe(response => {
				this.getShipViaDetailsForShipTo(response.shippingViaId);
				// this.addressFormForShipping = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved  Ship Via Information Sucessfully `,
					MessageSeverity.success
				);

			})
		} else {
			await this.commonService.createShipVia(vendorData).subscribe(response => {
				this.getShipViaDetailsForShipTo(response.shippingViaId);
				this.alertService.showMessage(
					'Success',
					`Updated Ship Via Information Sucessfully`,
					MessageSeverity.success
				);
			})
		}

	}
	if (this.salesOrderQuote.shipToUserTypeId == 3) {
		const companyData = { ...data, ReferenceId: getValueFromObjectByKey('value', this.salesOrderQuote.shipToUserId), AddressId: this.salesOrderQuote.shipToAddressId ? this.salesOrderQuote.shipToAddressId : 0}
		if (!this.isEditModeShipVia) {
			await this.commonService.createShipVia(companyData).subscribe(response => {
				this.getShipViaDetailsForShipTo(response.shippingViaId);
				// this.addressFormForShipping = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved  Ship Via Information Sucessfully `,
					MessageSeverity.success
				);
			})
		} else {
			await this.commonService.createShipVia(companyData).subscribe(response => {
				this.getShipViaDetailsForShipTo(response.shippingViaId);
				this.alertService.showMessage(
					'Success',
					`Updated Ship Via Information Sucessfully`,
					MessageSeverity.success
				);
			})
		}
	}
}
  

  


}
