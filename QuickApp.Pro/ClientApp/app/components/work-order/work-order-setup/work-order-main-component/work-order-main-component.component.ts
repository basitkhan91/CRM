import { Component } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { PageHeaderComponent } from '../../../../shared/page-header.component';
import * as $ from 'jquery';

@Component({
    selector: 'app-work-order-main-component',
    templateUrl: './work-order-main-component.component.html',
    styleUrls: ['./work-order-main-component.component.scss'],
    animations: [fadeInOut]
})
/** WorkOrderMainComponent component*/
export class WorkOrderMainComponentComponent {
    /** WorkOrderMainComponent ctor */
    constructor() {
        $(document).ready(function () {
                $("#checkall").click(function () { $(".pcheck").prop('checked', $(this).prop('checked')); });
                $(".new-ro").hide();
                $('input[type=radio][name=ro-type]').change(function () {
                    if (this.value == 'existing-ro') {
                        $(".new-ro").hide(); $(".existing-ro").show();
                    }
                    else if (this.value == 'new-ro') {
                        $(".new-ro").show(); $(".existing-ro").hide();
                    }
                });
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