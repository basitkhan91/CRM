import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from "@angular/core";
import { ISalesQuote } from "../../../../../../models/sales/ISalesQuote.model";
import { DataTable } from "primeng/datatable";

@Component({
  selector: "app-part-details",
  templateUrl: "./part-details.component.html",
  styleUrls: ["./part-details.component.scss"]
})
export class ParetDetailsComponent implements OnChanges {
  @Input() customer: any;
  @Input() parts: any[];
  selectedColumns: any[];
  //@ViewChild('parts') partsComponent: DataTable;
    columns: any[];
    totalRecords: number = 0;
    showPaginator: boolean = true;
    pageLinks: number = 3;
  constructor() {
    this.parts = [];
    this.columns = [];
    this.initColumns();
  }


  ngOnChanges(changes: SimpleChanges) {
    //this.partsComponent.reset();
  }

    onPaging(event) {
        console.log(event);
    }

  initColumns() {
    this.columns = [
      { field: null, header: '', width: '100px' },
      { field: 'method', header: 'Method', width: '200px' },
      { field: 'partNumber', header: 'PN', width: '200px' },
      { field: 'alternamePartNumber', header: 'Alternate For', width: '200px' },
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
    /*
    <th>Unit Cost</th>
    <th>Unit List Price</th>
    <th>Qty On Hand</th>
    <th>Qty To Order</th>
    <th>Qty On Order</th>
    <th>Item Classification</th>
    <th>Item Group</th>
    <th>OEM/PMA/DER</th>
    <th>MFG</th>
    <th>Customer Ref</th>
    <th>Currency</th>
    <th>Core Unit Cost</th>
    <th>GL Account</th>
    <th>ITAR</th>
    <th>ECCN</th>
    <th>Memo</th>
    */
  }
}