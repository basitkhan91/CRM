import { Component,Input } from "@angular/core";
import { ISalesQuote } from "../../../../../../models/sales/ISalesQuote.model";
import { SalesQuote } from "../../../../../../models/sales/SalesQuote.model";
import { ISalesOrderQuote } from "../../../../../../models/sales/ISalesOrderQuote";
import { SalesOrderQuote } from "../../../../../../models/sales/SalesOrderQuote";
import { SalesQuoteService } from "../../../../../../services/salesquote.service";
import { CustomerService } from "../../../../../../services/customer.service";
import { SiteService } from '../../../../../../services/site.service';
import { Site } from '../../../../../../models/site.model';
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
  demosticShippingViaData:any[];
  tempMemo: any;
  tempMemoLabel: any;
  constructor(private salesQuoteService: SalesQuoteService,private siteService: SiteService,private customerService: CustomerService) {
    this.salesQuote = new SalesQuote();

  }
  ngOnInit(): void {

    this.salesQuoteService
    .getSalesOrderQuteInstance()
    .subscribe(data => {
      this.salesOrderQuote = data;
    });
   
   
    this.getDomesticShippingByCustomerId();
    this.getBillingDataById();
    this.getCustomerList();

   
	}
  private loadSiteData()  //retriving SIte Information
	{

		this.siteService.getSiteList().subscribe(   //Getting Site List Hear
			results => this.onSaiteDataLoadSuccessful(results[0]), //Pasing first Array and calling Method
			error => this.onDataLoadFailed(error)
		);
	}
	private onSaiteDataLoadSuccessful(getSiteList: Site[]) { //Storing Site Data
    this.allSites = getSiteList; //Contain first array of Loaded table Data will put in Html as [value]
    console.log(this.allSites);
    for (let i = 0; i < this.allSites.length; i++) {
      this.siteList.push({
        "id": this.allSites[i].t.siteId,
        "name": this.allSites[i].t.name
      });
    }
    console.log(this.siteList);
  }
   // get domestic shipping by customer Id 
 getDomesticShippingByCustomerId() {
  // const id = this.savedGeneralInformationData.customerId;
  this.customerService.getCustomerShipAddressGet(this.customerId).subscribe(res => {
      console.log(res);
      
      this.siteList = res[0];
      if(!this.salesOrderQuote.salesOrderQuoteId)
        this.getDefaultShipping();
      
  })
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
                 this.getShipViaByDomesticShippingId(this.siteList[i].customerShippingAddressId);
                
                 
              }
          }

          console.log(this.salesOrderQuote);
      }
  }
}
getBillingDataById() {
  this.customerService.getCustomerBillViaDetails(this.customerId).subscribe(res => {
    this.billingInfoList = res[0];
    if(!this.salesOrderQuote.salesOrderQuoteId)
      this.getDefaultBilling();
  })
}
getDefaultBilling() {
  if (this.billingInfoList) {
      if (this.billingInfoList.length > 0) {
          for (let i = 0; i < this.billingInfoList.length; i++) {
              let isPrimary = this.billingInfoList[i].isPrimary;
              console.log(isPrimary);
              if (isPrimary) {
                 this.salesOrderQuote.billToSiteName = this.billingInfoList[i].siteName; 
                 this.onBillSiteSelect(this.salesOrderQuote.billToSiteName);
              }
          }
      }
      console.log(this.salesOrderQuote);
  }
}

getShipViaByDomesticShippingId(customerShippingAddressId) {
  this.customerService.getShipViaByDomesticShippingId(customerShippingAddressId).subscribe((res:any) => {
    

      this.demosticShippingViaData = res;
  })
}
  private onDataLoadFailed(error: any) {
		// alert(error);
  }
  private onCustomerDataLoadSuccessful(allCustomerFlows: any[]) {
    this.allCustomer = allCustomerFlows;
    this.salesOrderQuote.shipToContactId =  getObjectById('customerId', this.customerId, this.allCustomer);
    this.salesOrderQuote.billToContactId =  getObjectById('customerId', this.customerId, this.allCustomer);
  
  }
  private getCustomerList() {
    this.customerService.getWorkFlows().subscribe(
      results => this.onCustomerDataLoadSuccessful(results[0]),
      error => this.onDataLoadFailed(error)
    );
  }

filterNames(event) {
  this.customerNames = this.allCustomer;

  const customerListData = [...this.allCustomer.filter(x => {
      return x.name.toLowerCase().includes(event.query.toLowerCase())
  })]
  this.customerNames = customerListData;
}


  onShipSiteSelect(event) {
    console.log(event);
    if (this.siteList) {
        for (let i = 0; i < this.siteList.length; i++) {
            if (event == this.siteList[i].siteName) {
              this.getShipViaByDomesticShippingId(this.siteList[i].customerShippingAddressId);
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
    if (this.demosticShippingViaData) {
        for (let i = 0; i < this.demosticShippingViaData.length; i++) {
            if (event == this.demosticShippingViaData[i].shipVia) {
               this.salesOrderQuote.shipViaShippingAccountInfo = this.demosticShippingViaData[i].shippingAccountInfo;
               this.salesOrderQuote.shippingId = this.demosticShippingViaData[i].shippingId;
               this.salesOrderQuote.shipViaMemo = this.demosticShippingViaData[i].memo;
               this.salesOrderQuote.shippingURL = this.demosticShippingViaData[i].shippingURL;
               this.salesOrderQuote.shipViaShippingURL = this.demosticShippingViaData[i].shippingURL;
              
            }
        }
    }
  }
  onBillSiteSelect(event) {
    if (this.billingInfoList) {
        for (let i = 0; i < this.billingInfoList.length; i++) {
            if (event == this.billingInfoList[i].siteName) {
              this.salesOrderQuote.billToAddress1 = this.billingInfoList[i].address1;
              this.salesOrderQuote.billToAddress2 = this.billingInfoList[i].address2;
              this.salesOrderQuote.billToAddress3 = this.billingInfoList[i].address3;
              this.salesOrderQuote.billToCity = this.billingInfoList[i].city;
              this.salesOrderQuote.billToState = this.billingInfoList[i].stateOrProvince;
              this.salesOrderQuote.billToPostalCode = this.billingInfoList[i].postalCode;
              this.salesOrderQuote.billToCountry = this.billingInfoList[i].country;
            }
        }
    }
  }

  OnShipToContact(event) {
    console.log(event);
    if (this.allCustomer) {
        for (let i = 0; i < this.allCustomer.length; i++) {
            if (event == this.allCustomer[i].name) {
              this.salesOrderQuote.shipToContactId = this.allCustomer[i].customerId;
            }
          }
        }
  }
  OnBillToContact(event) {
    console.log(event);
    if (this.allCustomer) {
        for (let i = 0; i < this.allCustomer.length; i++) {
            if (event == this.allCustomer[i].name) {
              //this.salesOrderQuote.billToCountry = this.allCustomer[i].name;
              this.salesOrderQuote.billToContactId = this.allCustomer[i].customerId;
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

}
