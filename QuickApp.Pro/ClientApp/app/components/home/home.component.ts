// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { Component, AfterViewInit } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { ConfigurationService } from '../../services/configuration.service';
import { Params, ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import * as $ from 'jquery';
import { AppComponent } from '../../app.component';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [fadeInOut]
})
export class HomeComponent implements AfterViewInit {

    constructor(public appcomponent: AppComponent, public configurations: ConfigurationService, private router: ActivatedRoute, private route: Router) {

    }
    customerModule() {
        this.appcomponent.setStep(1);
        //this.configurations.configObj.next("1");
        this.route.navigateByUrl('/customersmodule/customerpages/app-customers-list');
    }
    itemMasterModule() {
        this.appcomponent.setStep(5);
        //this.configurations.configObj.next("1");
        this.route.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-list');
    }


    vendorModule() {
        this.appcomponent.setStep(3);
        this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendors-list');
    }
    employeeModule() {
        this.appcomponent.setStep(6);
        this.route.navigateByUrl('/employeesmodule/employeepages/app-employees-list');
    }
    stocklineModule() {
        this.appcomponent.setStep(2);
        this.route.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list');
    }
    roleModule() {
        this.appcomponent.setStep(0);
        this.route.navigateByUrl('/rolesmodule/rolespages/app-roles-list');
    }

    ngAfterViewInit() {

        var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
            $BODY = $('body'),
            $MENU_TOGGLE = $('#menu_toggle'),
            $SIDEBAR_MENU = $('#sidebar-menu');
        // Sidebar
        $SIDEBAR_MENU.find('a').on('click', function (ev) {
            var $li = $(this).parent();
            if ($li.is('.active')) { } else {
                if (!$li.parent().is('.child_menu')) {
                    $SIDEBAR_MENU.find('li').not('.active').find('ul').slideUp();
                    $(this).find('ul').slideUp();
                } else {
                    if ($BODY.is(".nav-sm")) {
                        $SIDEBAR_MENU.find("li").removeClass("active active-sm");
                        $SIDEBAR_MENU.find("li ul").slideUp();
                    }
                }
                $li.addClass('highlight');
                $('ul:first', $li).slideDown(function () {
                });
            }
        });
        $MENU_TOGGLE.on('click', function () {
            if ($BODY.hasClass('nav-md')) {
                $SIDEBAR_MENU.find('li.active ul').hide();
                $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
                $(".breadcrumb_content").attr('style', 'margin-left: 70px !important;');
            } else {
                $SIDEBAR_MENU.find('li.active-sm ul').show();
                $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
                $(".breadcrumb_content").removeAttr('style');
            }

            $BODY.toggleClass('nav-md nav-sm');

        });
        function init_sidebar() {


            // check active menu
            $SIDEBAR_MENU.find('a').parent('li').removeClass('current-page');
            $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

            $SIDEBAR_MENU.find('a').filter(function () {
                return this.href == CURRENT_URL;
            }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
            }).parent().addClass('active');
            // fixed sidebar
            if ($.fn.mCustomScrollbar) {
                $('.menu_fixed').mCustomScrollbar({
                    autoHideScrollbar: true,
                    theme: 'minimal',
                    mouseWheel: {
                        preventDefault: true
                    }
                });
            }
        };
        // /Sidebar


        init_sidebar();




    }

}
