import { Component } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { PageHeaderComponent } from '../../../shared/page-header.component';
import * as $ from 'jquery';

@Component({
    selector: 'app-vendor-edit',
    templateUrl: './vendor-edit.component.html',
    styleUrls: ['./vendor-edit.component.scss'],
    animations: [fadeInOut]
})
/** VendorEdit component*/
export class VendorEditComponent {
    /** VendorEdit ctor */
    constructor() {
        $(document).ready(function () {
            $(".ivendor-block").hide();
            $(".ivendor-input").change(function () { if (this.checked) { $(".ivendor-block").show(); } });
            $(".evendor-input").change(function () { if (this.checked) { $(".ivendor-block").hide(); } });
            $(".edi-input").hide();
            $(".edi-checkbox").change(function () { if (this.checked) { $(".edi-input").show(); } else { $(".edi-input").hide(); } });
            $(".aeroxchange-input").hide();
            $(".aeroxchange-checkbox").change(function () { if (this.checked) { $(".aeroxchange-input").show(); } else { $(".aeroxchange-input").hide(); } });
            $(".partial-billing-input").hide();
            $(".partial-billing-checkbox").change(function () { if (this.checked) { $(".partial-billing-input").show(); } else { $(".partial-billing-input").hide(); } });
            $(".contract-ref-input").hide();
            $(".contract-ref-checkbox").change(function () { if (this.checked) { $(".contract-ref-input").show(); } else { $(".contract-ref-input").hide(); } });
            $(".taxrate-other-input").hide();
            $(".taxrate-other-checkbox").change(function () { if (this.checked) { $(".taxrate-other-input").show(); } else { $(".taxrate-other-input").hide(); } });
            $(".audit-input").hide();
            $(".audit-checkbox").change(function () { if (this.checked) { $(".audit-input").show(); } else { $(".audit-input").hide(); } });
            $(".certified-input").hide();
            $(".certified-checkbox").change(function () { if (this.checked) { $(".certified-input").show(); } else { $(".certified-input").hide(); } });
            $(".tax-certificate").hide();
            $("#tax").change(function () { if (this.checked) { $(".tax-certificate").show(); } else { $(".tax-certificate").hide(); } });
            $(".cparent-input").hide();
            $("#cparent").change(function () { if (this.checked) { $(".cparent-input").show(); } else { $(".cparent-input").hide(); } });
            $(".rpma-input").hide();
            $("#rpma").change(function () { if (this.checked) { $(".rpma-input").show(); } else { $(".rpma-input").hide(); } });
            $(".vbill-map").hide();
            $("#vbill-map-check").change(function () { if (this.checked) { $(".vbill-map").show(); } else { $(".vbill-map").hide(); } });
            $(".vship-map").hide();
            $("#vship-map-check").change(function () { if (this.checked) { $(".vship-map").show(); } else { $(".vship-map").hide(); } });
            $(".finc-info").hide();
            $("#finc-info-check").change(function () { if (this.checked) { $(this).parents(".form-group").addClass("bg-grey"); $(".finc-info").show().addClass("bg-grey"); } else { $(this).parents(".form-group").removeClass("bg-grey"); $(".finc-info").hide().removeClass("bg-grey"); } });
            $('[data-toggle="tooltip"]').tooltip();
            $("#vmaddress1").change(function () { $("#vbaddress1").val($("#vmaddress1").val()); $("#vsaddress1").val($("#vmaddress1").val()); });
            $("#vmaddress2").change(function () { $("#vbaddress2").val($("#vmaddress2").val()); $("#vsaddress2").val($("#vmaddress2").val()); });
            $("#vmaddress3").change(function () { $("#vbaddress3").val($("#vmaddress3").val()); $("#vsaddress3").val($("#vmaddress3").val()); });
            $("#vmcity").change(function () { $("#vbcity").val($("#vmcity").val()); $("#vscity").val($("#vmcity").val()); });
            $("#vmstate").change(function () { $("#vbstate").val($("#vmstate").val()); $("#vsstate").val($("#vmstate").val()); });
            $("#vmpostal").change(function () { $("#vbpostal").val($("#vmpostal").val()); $("#vspostal").val($("#vmpostal").val()); });
            $("#vmcountry").change(function () { $("#vbcountry").val($("#vmcountry").val()); $("#vscountry").val($("#vmcountry").val()); });
            $("#vmname").change(function () { $("#vsname").val($("#vmname").val()); });
            $("#map").hide();
            $("#vbill-map-check").click(function () {$("#map").show();});            
            $(".map").hide();
            $(".map-check").click(function () { $(".map").show(); });
            $(".vendor-details-heading").hide();
            $(".left-nav-pills li").click(function () { $(".vendor-details-heading").show(); });
            $(".left-nav-pills li:first-child").click(function () { $(".vendor-details-heading").hide(); });
            $('.status input:checkbox').change(function () {
                if ($(this).is(":checked")) {
                    $(this).parents("span").attr("data-original-title", "Active").tooltip('show');
                } else { $(this).parents("span").attr("data-original-title", "In-Active").tooltip('show'); }
            });
            $(".add").click(function () { $(".hide-model").hide(); $(".in").hide() });
            function goBack() { window.history.back(); } 
        });
    }
}