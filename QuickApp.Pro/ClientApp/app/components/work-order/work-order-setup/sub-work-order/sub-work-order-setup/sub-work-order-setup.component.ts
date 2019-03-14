import { Component } from '@angular/core';
import { fadeInOut } from '../../../../../services/animations';
import { PageHeaderComponent } from '../../../../../shared/page-header.component';
import * as $ from 'jquery';

@Component({
    selector: 'app-sub-work-order-setup',
    templateUrl: './sub-work-order-setup.component.html',
    styleUrls: ['./sub-work-order-setup.component.scss'],
    animations: [fadeInOut]
})
/** SubWorkOrderSetup component*/
export class SubWorkOrderSetupComponent {
    /** SubWorkOrderSetup ctor */
    constructor() {
        $(document).ready(function () {
            $('.closeall').click(function () { $('.panel-collapse.in').collapse('hide'); });
            $('.openall').click(function () { $('.panel-collapse:not(".in")').collapse('show'); });
            
                    $("#checkall").click(function () { $(".pcheck").prop('checked', $(this).prop('checked')); });

                    $(".deferred-table").hide(); $(".default-workflow-table").hide();
                    $(".deferred-btn").click(function () { $(".deferred-table").show(); $(".default-workflow-table").hide(); });
                    $(".default-workflow-btn").click(function () { $(".deferred-table").hide(); $(".default-workflow-table").show(); });
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