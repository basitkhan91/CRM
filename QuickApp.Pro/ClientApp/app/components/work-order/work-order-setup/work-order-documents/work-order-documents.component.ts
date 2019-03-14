import { Component } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { PageHeaderComponent } from '../../../../shared/page-header.component';
import * as $ from 'jquery';

@Component({
    selector: 'app-work-order-documents',
    templateUrl: './work-order-documents.component.html',
    styleUrls: ['./work-order-documents.component.scss'],
    animations: [fadeInOut]
})
/** WorkOrderDocuments component*/
export class WorkOrderDocumentsComponent {
    /** WorkOrderDocuments ctor */
    constructor() {
        $(document).ready(function () {
            $("#checkall").click(function () { $(".pcheck").prop('checked', $(this).prop('checked')); });
            $(".flat-data").hide();
            $('input[type=radio][name=billing-options]').change(function () {
                if (this.value == 'cost') {
                    $(".flat-data").hide(); $(".cost-data").show();
                }
                else if (this.value == 'flat') {
                    $(".flat-data").show(); $(".cost-data").hide();
                }
            });
        });
    }
}