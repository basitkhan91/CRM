import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from "@angular/core";
import { ISalesQuote } from "../../../../../../models/sales/ISalesQuote.model";
import { DataTable } from "primeng/datatable";
import { PartDetail } from "../../../models/part-detail";
import { IPartJson } from "../../../models/ipart-json";
import { SalesQuoteService } from "../../../../../../services/salesquote.service";

@Component({
  selector: "app-part-details",
  templateUrl: "./part-details.component.html",
  styleUrls: ["./part-details.component.scss"]
})
export class PartDetailsComponent implements OnChanges {
  @Input() customer: any;
  @Input() parts: IPartJson[];
  @Output() onPartSelect: EventEmitter<any> = new EventEmitter<any>();
  selectedColumns: any[];
  showPaginator: boolean;
  totalRecords: number;
  pageLinks: any;
  part: PartDetail;
  show: boolean;
  columns: any[];
  constructor(private salesQuoteService: SalesQuoteService) {
    this.parts = [];
    this.columns = [];
    this.initColumns();
    this.part = null;
  }
  ngOnInit() {
    this.salesQuoteService.getSearchPartResult()
    .subscribe(data => {
      this.parts = data;
      this.totalRecords=this.parts.length;
      this.pageLinks = Math.ceil(
        this.totalRecords / 10
      );
      console.log(this.parts);
    });
       
      }


  ngOnChanges(changes: SimpleChanges) {
    //this.partsComponent.reset();
  }

  initColumns() {
    this.columns = [
      { field: 'select', header: '', width: '50px' },
      { field: 'method', header: 'Method', width: '200px' },
      { field: 'partNumber', header: 'PN', width: '200px' },
      { field: 'alternateFor', header: 'Alternate / Equivalency For', width: '200px' },
      { field: 'description', header: 'PN Description', width: '200px' },
      { field: 'conditionType', header: 'Cond Type', width: '200px' },
      { field: 'uom', header: 'UOM', width: '200px' },
      { field: 'unitCost', header: 'Unit Cost', width: '200px' },
      { field: 'unitListPrice', header: 'Unit List Price', width: '200px' },
      { field: 'qtyOnHand', header: 'Qty On Hand', width: '200px' },
      { field: 'qtyToOrder', header: 'Qty To Order', width: '200px' },
      { field: 'qtyOnOrder', header: 'Qty On Order', width: '200px' },
      { field: 'itemClassification', header: 'Item Classification', width: '200px' },
      { field: 'itemGroup', header: 'Item Group', width: '200px' },
      { field: 'oempmpder', header: 'OEM/PMA/DER', width: '200px' },
      { field: 'mfg', header: 'MFG', width: '200px' },
      { field: 'customerRef', header: 'Customer Ref', width: '200px' },
      { field: 'currency', header: 'currency', width: '200px' },
      { field: 'coreUnitCost', header: 'Core Unit Cost', width: '200px' },
      { field: 'glAccount', header: 'GL Account', width: '200px' },
      { field: 'itar', header: 'ITAR', width: '200px' },
      { field: 'eccn', header: 'ECCN', width: '200px' },
      { field: 'memo', header: 'Memo', width: '200px' },
    ]
  }

  onPaging(event) {

  }

  onChange(event, part) {
    let checked: boolean = event.srcElement.checked;
    this.onPartSelect.emit({ checked: checked, part: part });
  }
}