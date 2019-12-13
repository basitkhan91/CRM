import { Component, OnInit } from "@angular/core";
import { SalesQuoteService } from "../../../../services/salesquote.service";
import { ISalesSearchParameters } from "../../../../models/sales/ISalesSearchParameters";

@Component({
  selector: "app-sales-quote-list",
  templateUrl: "./sales-quote-list.component.html",
  styleUrls: ["./sales-quote-list.component.css"]
})
export class SalesQuoteListComponent implements OnInit {
  constructor(private salesQuoteService: SalesQuoteService) { }

  ngOnInit() {


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
  }
}
