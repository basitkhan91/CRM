import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from "@angular/core";
import { ISalesQuote } from "../../../../../../models/sales/ISalesQuote.model";
import { DataTable } from "primeng/datatable";
import { SalesQuoteService } from "../../../../../../services/salesquote.service";
import { IPartJson } from "../../../models/ipart-json";
import { NgbModal, NgbActiveModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StocklineViewComponent } from '../../../../../../shared/components/stockline/stockline-view/stockline-view.component';
import { StocklineHistoryComponent } from '../../../../../../shared/components/stockline/stockline-history/stockline-history.component';

@Component({
  selector: "app-stockline-part-details",
  templateUrl: "./stockline-part-details.component.html",
  styleUrls: ["./stockline-part-details.component.scss"]
})
export class StocklinePartDetailsComponent implements OnChanges {
  @Input() customer: any;
  @Input() parts: IPartJson[];
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  selectedColumns: any[];
  showPaginator: boolean;
  totalRecords: number;
  pageLinks: any;

  columns: any[];
  modal: NgbModalRef;
  constructor(private salesQuoteService: SalesQuoteService,private modalService: NgbModal,) {
    this.parts = [];
    this.columns = [];
    this.initColumns();
  }
  ngOnInit() {
    this.salesQuoteService.getSearchPartResult()
    .subscribe(data => {
      this.parts = data;
      this.totalRecords=this.parts.length;
      this.pageLinks = Math.ceil(
        this.totalRecords / 10
      );
    
    });
       
      }


  ngOnChanges(changes: SimpleChanges) {
    //this.partsComponent.reset();
  }

  initColumns() {
    this.columns = [
      { field: 'selected', header: '', width: '50px' },
      { field: 'method', header: 'Method', width: '200px' },
      { field: 'partNumber', header: 'PN', width: '200px' },
      { field: 'alternateFor', header: 'Alternate / Equivalency For', width: '200px' },
      { field: 'description', header: 'PN Description', width: '200px' },
      { field: 'conditionType', header: 'Cond Type', width: '200px' },
      { field: 'uom', header: 'UOM', width: '200px' },
      { field: 'qtyAvailable', header: 'Qty Available', width: '200px' },
      { field: 'qtyOnHand', header: 'Qty On Hand', width: '200px' },
      { field: 'qtyToOrder', header: 'Qty To Order', width: '200px' },
      { field: 'qtyOnOrder', header: 'Qty On Order', width: '200px' },
      { field: 'itemClassification', header: 'Item Classification', width: '200px' },
      { field: 'itemGroup', header: 'Item Group', width: '200px' },
      { field: 'controlName', header: 'Control Name', width: '200px' },
      { field: 'idNumber', header: 'Id Num', width: '200px' },
      { field: 'serialNumber', header: 'Serial Num', width: '200px' },
     // { field: '', header: 'Actions', width: '100px' },
    ]
  }

  onPaging(event) {

  }
  onChange(event, part,salesMargin) {
    let checked: boolean = event.srcElement.checked;
    this.select.emit({ checked: checked, part: part,salesMargin:salesMargin });
  }

  viewSelectedRow(rowData) {
   
    console.log(rowData);
    this.modal = this.modalService.open(StocklineViewComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    this.modal.componentInstance.stockLineId = rowData.stockLineId;
    this.modal.result.then(() => {
        console.log('When user closes');
    }, () => { console.log('Backdrop click') })

}
viewStockLineHistory(rowData) {
   
  console.log(rowData);
  this.modal = this.modalService.open(StocklineHistoryComponent, { size: 'lg', backdrop: 'static', keyboard: false });
  this.modal.componentInstance.stockLineId = rowData.stockLineId;
  this.modal.result.then(() => {
      console.log('When user closes');
  }, () => { console.log('Backdrop click') })

}

}
