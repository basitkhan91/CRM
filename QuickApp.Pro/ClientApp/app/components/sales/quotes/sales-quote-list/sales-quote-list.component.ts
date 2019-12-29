import { Component, OnInit } from "@angular/core";
import { SalesQuoteService } from "../../../../services/salesquote.service";
import { ISalesSearchParameters } from "../../../../models/sales/ISalesSearchParameters";
import { SalesSearchParameters } from "../../../../models/sales/SalesSearchParameters";
import { AlertService, DialogType, MessageSeverity } from '../../../../services/alert.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";

@Component({
  selector: "app-sales-quote-list",
  templateUrl: "./sales-quote-list.component.html",
  styleUrls: ["./sales-quote-list.component.css"]
})
export class SalesQuoteListComponent implements OnInit {

  searchParameters:ISalesSearchParameters;
  sales:any[];
  selected:any;
  modal: NgbModalRef;
  constructor(
    private salesQuoteService: SalesQuoteService,
    private alertService: AlertService,
     private modalService: NgbModal,
     private router: Router,
     ) { }

  ngOnInit() {

    this.searchParameters = new SalesSearchParameters();
  }




  /* 
    #TODO: Kishan
    Below is the service call which we have to call 
    Make sure ISalesSearchParameters object is properly constructure before calling search api service  
    Curretly this call return all recoreds from sales quote.  

    In next version we will have search logic in place  

    From UI you finish the call logic, we will take care of backend later

  */
  onSearch() {
    /*
    let searchParameters: ISalesSearchParameters = {
      "first": 0,
      "page": 0,
      "pageCount": 0,
      "rows": 0,
      "limit": 0,
      "sortOrder": 0,
      "sortField": null,
      "salesQuoteNumber": 0,
      "customerName": "Vivaan",
      "status": "Open",
      "startDate": null,
      "endDate": null
    };

    this.salesQuoteService.search(searchParameters);
    */

   this.alertService.startLoadingMessage();
   this.salesQuoteService
   .search(this.searchParameters)
   .subscribe((data: any) => {
     this.sales = data[0];
     console.log(this.sales);
     this.alertService.stopLoadingMessage();
   });
  }



  dismissModel() {
    // this.isDeleteMode = false;
   
     this.modal.close();
   }
   openDelete(content, rowData) {
     this.selected = rowData.salesQuoteId;
     this.modal = this.modalService.open(content, { size: 'sm' });
     this.modal.result.then(() => {
         console.log('When user closes');
     }, () => { console.log('Backdrop click') })
   }
   deleteQuote(): void {
     this.salesQuoteService.delete(this.selected).subscribe(response => {
         //this.alertService.showMessage("Asset removed successfully.");
         this.modal.close();
         this.alertService.showMessage("Success", `Asset removed successfully.`, MessageSeverity.success);
        this.onSearch();
     });
   
   }
   openQuoteToEdit(row) {
    const { salesQuoteId } = row;
    let customerId  = row.customerId;
    console.log(row);
    this.router.navigateByUrl(`salesmodule/salespages/sales-quote-edit/${customerId}/${salesQuoteId}`);
  }
}
