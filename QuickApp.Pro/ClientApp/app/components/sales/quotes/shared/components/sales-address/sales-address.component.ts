import { Component,Input } from "@angular/core";
import { ISalesQuote } from "../../../../../../models/sales/ISalesQuote.model";
import { SalesQuote } from "../../../../../../models/sales/SalesQuote.model";
import { ISalesOrderQuote } from "../../../../../../models/sales/ISalesOrderQuote";
import { SalesOrderQuote } from "../../../../../../models/sales/SalesOrderQuote";
import { SalesQuoteService } from "../../../../../../services/salesquote.service";
import { CustomerService } from "../../../../../../services/customer.service";
import { SiteService } from '../../../../../../services/site.service';
import { Site } from '../../../../../../models/site.model';

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
  allCustomer:any[];
  customerNames:any[];
  demosticShippingViaData:any[];
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
  })
}

getShipViaByDomesticShippingId(customerShippingAddressId) {
  this.customerService.getShipViaByDomesticShippingId(customerShippingAddressId).subscribe(res => {
    

      this.demosticShippingViaData = res[0];
  })
}
  private onDataLoadFailed(error: any) {
		// alert(error);
  }
  private onCustomerDataLoadSuccessful(allCustomerFlows: any[]) {
    this.allCustomer = allCustomerFlows;
  
  }
  private getCustomerList() {
    this.customerService.getWorkFlows().subscribe(
      results => this.onCustomerDataLoadSuccessful(results[0]),
      error => this.onDataLoadFailed(error)
    );
  }
  filterNames(event) {

    this.customerNames = [];
    if (this.allCustomer) {
        if (this.allCustomer.length > 0) {
            for (let i = 0; i < this.allCustomer.length; i++) {
                let name = this.allCustomer[i].name;
                if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.customerNames.push(name);
                }
            }
        }
    }
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
               this.salesOrderQuote.shipViaShippingAccountInfo = this.demosticShippingViaData[i].address1;
               this.salesOrderQuote.shippingId = this.demosticShippingViaData[i].address2;
               this.salesOrderQuote.shippingURL = this.demosticShippingViaData[i].address3;
               this.salesOrderQuote.shipViaMemo = this.demosticShippingViaData[i].city;
               this.salesOrderQuote.shipViaShippingURL = this.demosticShippingViaData[i].stateOrProvince;
              
            }
        }
    }
  }
  onBillSiteSelect(event) {
    if (this.siteList) {
        for (let i = 0; i < this.siteList.length; i++) {
            if (event == this.siteList[i].siteName) {
              this.salesOrderQuote.billToAddress1 = this.siteList[i].address1;
              this.salesOrderQuote.billToAddress2 = this.siteList[i].address2;
              this.salesOrderQuote.billToAddress3 = this.siteList[i].address3;
              this.salesOrderQuote.billToCity = this.siteList[i].city;
              this.salesOrderQuote.billToState = this.siteList[i].stateOrProvince;
              this.salesOrderQuote.billToPostalCode = this.siteList[i].postalCode;
              this.salesOrderQuote.billToCountry = this.siteList[i].country;
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
}
