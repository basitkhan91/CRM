import { Component } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { PageHeaderComponent } from '../../../shared/page-header.component';
import * as $ from 'jquery';

@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html',
    styleUrls: ['./customer-edit.component.scss'],
    animations: [fadeInOut]
})
/** CustomerEdit component*/
export class CustomerEditComponent {
    /** CustomerEdit ctor */
	constructor() {
		$(document).ready(function () {
            $(".cust-details-heading").hide();
            $(".left-nav-pills li").click(function () { $(".cust-details-heading").show(); });
            $(".left-nav-pills li:first-child").click(function () { $(".cust-details-heading").hide(); });
            $(".partial-billing-input").hide();
            $(".partial-billing-checkbox").change(function () { if (this.checked) { $(".partial-billing-input").show(); } else { $(".partial-billing-input").hide(); } });
            $(".contract-ref-input").hide();
            $(".contract-ref-checkbox").change(function () { if (this.checked) { $(".contract-ref-input").show(); } else { $(".contract-ref-input").hide(); } });
            $(".taxrate-other-input").hide();
            $(".taxrate-other-checkbox").change(function () { if (this.checked) { $(".taxrate-other-input").show(); } else { $(".taxrate-other-input").hide(); } });
            $(".edi-input").hide();
            $(".edi-checkbox").change(function () { if (this.checked) { $(".edi-input").show(); } else { $(".edi-input").hide(); } });
            $(".aeroxchange-input").hide();
            $(".aeroxchange-checkbox").change(function () { if (this.checked) { $(".aeroxchange-input").show(); } else { $(".aeroxchange-input").hide(); } });
            $(".cparent-input").hide();
            $("#cparent").change(function () { if (this.checked) { $(".cparent-input").show(); } else { $(".cparent-input").hide(); } });
            $(".rpma-input").hide();
            $("#rpma").change(function () { if (this.checked) { $(".rpma-input").show(); } else { $(".rpma-input").hide(); } });
            $(".rber-input").hide();
            $("#rber").change(function () { if (this.checked) { $(".rber-input").show(); } else { $(".rber-input").hide(); } });
            $(".phb-input").hide();
            $("#phbc").change(function () { if (this.checked) { $(".phb-input").show(); } else { $(".phb-input").hide(); } });
            $(".tax-certificate").hide();
            $("#tax").change(function () { if (this.checked) { $(".tax-certificate").show(); } else { $(".tax-certificate").hide(); } });
            $("#cmaddress1").change(function () { $("#cbaddress1").val($("#cmaddress1").val()); $("#csaddress1").val($("#cmaddress1").val()); });
            $("#cmaddress2").change(function () { $("#cbaddress2").val($("#cmaddress2").val()); $("#csaddress2").val($("#cmaddress2").val()); });
            $("#cmaddress3").change(function () { $("#cbaddress3").val($("#cmaddress3").val()); $("#csaddress3").val($("#cmaddress3").val()); });
            $("#cmcity").change(function () { $("#cbcity").val($("#cmcity").val()); $("#cscity").val($("#cmcity").val()); });
            $("#cmstate").change(function () { $("#cbstate").val($("#cmstate").val()); $("#csstate").val($("#cmstate").val()); });
            $("#cmpostal").change(function () { $("#cbpostal").val($("#cmpostal").val()); $("#cspostal").val($("#cmpostal").val()); });
            $("#cmcountry").change(function () { $("#cbcountry").val($("#cmcountry").val()); $("#cscountry").val($("#cmcountry").val()); });
            $("#cmname").change(function () { $("#csname").val($("#cmname").val()); });
            $('[data-toggle="tooltip"]').tooltip();
            $("#map").hide();
            $("#vbill-map-check").click(function () { $("#map").show(); });
            $("#map1").hide();
            $("#vbill-map-check1").click(function () { $("#map1").show(); });
            $(".map").hide();
            $(".map-check").click(function () { $(".map").show(); });
            $('.status input:checkbox').change(function () {
                if ($(this).is(":checked")) {
                    $(this).parents("span").attr("data-original-title", "Active").tooltip('show');
                } else { $(this).parents("span").attr("data-original-title", "In-Active").tooltip('show'); }
            });
            function goBack() { window.history.back(); }
        });            
    }
}