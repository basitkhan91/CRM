// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { Component, ChangeDetectorRef, ViewChild, ViewEncapsulation, OnInit, OnDestroy, ElementRef, AfterViewInit, Injectable, HostListener } from "@angular/core";
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, NavigationStart } from '@angular/router';
import { MatExpansionPanel, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
//import {DataTableModule} from 'angular-datatable';
import { AlertService, AlertDialog, DialogType, AlertMessage, MessageSeverity } from './services/alert.service';
import { NotificationService } from "./services/notification.service";
import { AppTranslationService } from "./services/app-translation.service";
import { AccountService } from './services/account.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { AppTitleService } from './services/app-title.service';
import { AuthService } from './services/auth.service';
import { ConfigurationService } from './services/configuration.service';
import { Permission } from './models/permission.model';
import { LoginDialogComponent } from "./components/login/login-dialog.component";
import { AppDialogComponent } from './shared/app-dialog.component';


//import '../app/assets/js/custom.js';
//declare var init_sidebar: any;
import * as $ from 'jquery';
import { CustomerService } from "./services/customer.service";
import { Globals } from './globals';
import { MenuItem } from "primeng/components/common/menuitem"; //Bread crumb

@Component({
    selector: "quickapp-pro-app",
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss', './styles.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
    public items: MenuItem[]; //BreadCrumb Implimentation

    @ViewChild('admin') adminExpander: MatExpansionPanel;
    routeActive: string = "active";
    private _mobileQueryListener: () => void;
    isAppLoaded: boolean;
    isUserLoggedIn: boolean;
    isAdminExpanded: boolean = false;
    removePrebootScreen: boolean;
    newNotificationCount = 0;
    appTitle = "PAS";
    //appLogo = require("../../assets/images/logo.png");
    userCollapsed: boolean = false;
    mobileQuery: MediaQueryList;
    stickyToasties: number[] = [];

    dataLoadingConsecutiveFailures = 0;
    notificationsLoadingSubscription: any;
    navIsFixed: any;
    closeCmpny: boolean = true;


    step: number;

    setStep(index: number) {
        this.step = index;
    }

    @ViewChild('fixedButtons') el: ElementRef;
    @HostListener("window:scroll", [])
    onWindowScroll() {
        let number = this.el.nativeElement.offsetTop;
        if (number > 65) {
            this.navIsFixed = true;
        } else if (this.navIsFixed && number < 10) {
            this.navIsFixed = false;
        }
    }

    get notificationsTitle() {

        let gT = (key: string) => this.translationService.getTranslation(key);

        if (this.newNotificationCount) {
            return `${gT("app.Notifications")} (${this.newNotificationCount} ${gT("app.New")})`;
        }
        else {
            return gT("app.Notifications");
        }
    }

    constructor(storageManager: LocalStoreManager,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private accountService: AccountService,
        private alertService: AlertService,
        private notificationService: NotificationService,
        private appTitleService: AppTitleService,
        private authService: AuthService,
        public translationService: AppTranslationService,
        public configurations: ConfigurationService,
        public router: Router,
        public dialog: MatDialog,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher, private customerService: CustomerService, private globals: Globals) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

        storageManager.initialiseStorageSyncListener();

        translationService.addLanguages(["en", "fr", "de", "pt", "ar", "ko"]);
        translationService.setDefaultLanguage('en');

        this.toastyConfig.theme = 'material';
        this.toastyConfig.position = 'top-right';
        this.toastyConfig.limit = 100;
        this.toastyConfig.showClose = true;
        this.routeActive = "active";
        this.appTitleService.appName = this.appTitle;
        //this.configurations.configObjChangeObject$.subscribe(data => { this.setStep(data)})
        //  alert('Load');

    }
    showthis() {
        this.translationService.closeCmpny = true;
    }
    closethis() {
        this.translationService.closeCmpny = false;
    }
    panelOpenState() {
        this.userCollapsed = true;
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


    ngOnInit() {


        // Created by Jyotsna
        this.items = [
            {
                label: 'Dashboard',
                icon: 'fa fa-fw fa-home',
                routerLink: '/home',
                routerLinkActiveOptions: '{exact: true}',
            },
            {
                label: 'Admin',
                icon: 'fa fa-fw fa-user',
                items: [

                    { label: 'Bulk Emails', routerLink: '/#' },
                    { label: 'code Prefixes', routerLink: '/#' },
                    { label: 'Customer CRM', routerLink: '/#' },
                    { label: 'Email Config', routerLink: '/#' },
                    {
                        label: 'Employee', items: [
                            { label: 'Employee List Approval', routerLink: '/#' },
                            { label: 'Employee Management', routerLink: '/#' }]
                    },
                    {
                        label: 'Roles', items: [
                            { label: 'Roles List', routerLink: '/rolesmodule/rolespages/edit-app-roles' },
                            { label: 'Roles List by Module', routerLink: '/rolesmodule/rolespages/app-roles-list-by-module' },
                            { label: 'Create Role', routerLink: '/rolesmodule/rolespages/app-roles-setup' }]
                    },
                    { label: 'Notifications', routerLink: '/#' }

                ]
            },
            {
                label: 'Customers',
                icon: 'fa fa-fw fa-group',
                items: [
                    { label: 'Customers List', routerLink: '/customersmodule/customerpages/app-customers-list' },
                    { label: 'Create Customer', routerLink: '/customersmodule/customerpages/app-customer-general-information' },
                    { label: 'Clasification', routerLink: '/singlepages/singlepages/app-customer-classification' },
                    {
                        label: 'Invoice', items: [
                            { label: 'Invoice List', routerLink: '/#' },
                            { label: 'Create Invoice', routerLink: '/#' },
                            { label: 'Customer RMA', routerLink: '/#' },
                        ]
                    },

                    {
                        label: 'Reports & Forms', items: [
                            { label: 'Invoice Register', routerLink: '' },
                            { label: 'Invoice Batches', routerLink: '' },
                        ]
                    }

                ]
            },

            {
                label: 'Item Master',
                icon: 'fa fa-fw fa-vcard-o ',
                items: [

                    { label: 'Item List', routerLink: '/itemmastersmodule/itemmasterpages/app-item-master-list' },
                    { label: 'Create Item Master', routerLink: '/itemmastersmodule/itemmasterpages/app-item-master-stock' },
                    {
                        label: ' Capabilities',
                        items: [
                            { label: 'Capabilities List', routerLink: '/itemmastersmodule/itemmasterpages/app-item-master-capabilities-list' },
                            { label: 'Reports & Forms', items: [{ label: 'Capabilities List', routerLink: '/#' }] }]
                    }

                ]
            },
            {
                label: 'Asset Management',
                icon: 'fa fa-fw fa-address-card',
                items: [
                    {
                        label: 'Assets', items: [
                            { label: 'Asset List', routerLink: '/assetmodule/assetpages/app-asset-listing"' },
                            { label: 'Create Asset', routerLink: '/assetmodule/assetpages/app-create-asset' }]
                    },
                    {
                        label: 'Disposal Sale', routerLink: '/#'
                    },
                    { label: 'Periodic Depression', routerLink: '/#' },
                    { label: 'Asset Adjustment', routerLink: '/#' },
                    { label: 'Calibration Management', routerLink: '/#' },
                    { label: 'Leases & Insuarance', routerLink: '/#' },
                    { label: 'Asset Maintainence', routerLink: '/#' },
                    { label: 'Depreciation Forecast', routerLink: '/#' },
                    {
                        label: 'Repeat and Forms', items: [{ label: 'List Report', routerLink: '/#' },
                        { label: 'Depreciation', routerLink: '/#' },
                        { label: 'Additons', routerLink: '/#' },
                        { label: 'Disposal', routerLink: '/#' },
                        ]
                    },
                    {
                        label: 'Asset Maintanence', items: [
                            { label: 'Depreciation Method', routerLink: '/singlepages/singlepages/app-depriciation-method' },
                            { label: 'Disposal Type', routerLink: '/singlepages/singlepages/app-disposal-type' },
                            { label: 'Asset Status', routerLink: '/singlepages/singlepages/asset-status' },
                            { label: 'Asset Type', routerLink: '/singlepages/singlepages/app-asset-type-single-screen' },
                            { label: 'Intagible Type', routerLink: '/singlepages/singlepages/app-asset-intangible-type-single-screen' },
                            { label: 'Depreciation Convension', routerLink: '/singlepages/singlepages/app-asset-dep-convention-type' },]
                    },
                ]
            },
            {
                label: 'Stock Line',
                icon: 'fa fa-fw fa-folder-open',
                items: [
                    { label: 'Stock List', routerLink: '/stocklinemodule/stocklinepages/app-stock-line-list' },
                    { label: 'Add Stock List', routerLink: '/stocklinemodule/stocklinepages/app-stock-line-setup' },
                    { label: 'Adjustment Reason', routerLink: '/stocklinemodule/stocklinepages/app-stockline-adjustment-reason' },
                    {
                        label: 'Reports and Forms', items: [
                            { label: 'Item Aging', routerLink: '/#' },
                            { label: 'Slow Moving Stock', routerLink: '/#' },
                            { label: 'Hot List', routerLink: '/#' }]
                    }]

            },
            {
                label: 'Vendor',
                icon: 'fa fa-fw fa-user',
                items: [

                    { label: 'Vendor List', routerLink: '/vendorsmodule/vendorpages/app-vendors-list' },
                    { label: 'Create Vendor', routerLink: '/vendorsmodule/vendorpages/app-vendor-general-information' },
                    { label: 'Vendor Classification', routerLink: '/singlepages/singlepages/app-vendor-classification' },
                    { label: 'Process 1099', routerLink: '/#' },
                    {
                        label: 'Vendor Capabilities', items: [{ label: 'Vendor Caps List', routerLink: '/vendorsmodule/vendorpages/app-vendor-capabilities-list' },
                        { label: 'Add Vendor Caps', routerLink: '/vendorsmodule/vendorpages/app-add-vendor-capabilities' },
                        { label: 'Reports and Forms', items: [{ label: 'Caps Report', routerLink: '/#' }] }],
                    },
                    {
                        label: 'Purchase Order', items: [{ label: 'PO List', routerLink: '/vendorsmodule/vendorpages/app-polist' },
                            { label: 'Create PO', routerLink: '/vendorsmodule/vendorpages/app-create-po' },
                        { label: 'PO Approval', routerLink: '/#' },
                        { label: 'Create Vendor RMA', routerLink: '/#' }]
                    },
                    {
                        label: 'Repair Order', items: [{ label: 'RO List', routerLink: '/vendorsmodule/vendorpages/app-ro-list' },
                        { label: 'Create RO', routerLink: '/vendorsmodule/vendorpages/app-create-ro' },
                        { label: 'RO Approval', routerLink: '/#' }]
                    },
                    {
                        label: 'Reports and Forms', items: [{ label: 'Open Ro Report', routerLink: '/#' },
                        { label: 'RO by WO', routerLink: '/#' },
                        { label: 'RO by End Customers', routerLink: '/#' },
                        { label: 'RO by Vendor', routerLink: '/#' },
                        ]
                    }

                ]
            },
            {
                label: 'Receiving',
                icon: 'fa fa-fw fa-download',
                items: [
                    {
                        label: 'Customer Work', items: [
                            { label: 'Customer Work', routerLink: '/receivingmodule/receivingpages/app-customer-works-list' },
                            { label: 'Create Customer', routerLink: '/receivingmodule/receivingpages/app-customer-work-edit' }
                        ]
                    },
                    { label: 'Purchase Order', routerLink: '/receivingmodule/receivingpages/app-purchase-order' },
                    { label: 'Repair Order', routerLink: '/receivingmodule/receivingpages/app-repair-order' },
                    { label: 'Shipping Receiver', routerLink: '/receivingmodule/receivingpages/app-shipping' },
                    {label:'Work Order', routerLink: '/#' },
                    {
                        label: 'Reports and forms', items: [{
                            label: 'Receiving Log', routerLink: '/#'
                        }]
                    },

                ]
            },
            {
                label: 'Work Flow',
                icon: 'fa fa-fw fa-id-card-o',
                items: [
                    { label: 'Workflow List', routerLink: '/workflowmodule/workflowpages/app-workflow-list' },
                    { label: 'Create Workflow', routerLink: '/workflowmodule/workflowpages/wf-create' },
                    { label: 'Task', routerLink: '/singlepages/singlepages/app-tasks' },
                    { label: 'Task Attribute', routerLink: '/singlepages/singlepages/app-task-attributes' },
                   
                ]
            },
            {
                label: 'Work Orders',
                icon: 'fa fa-fw fa-clone',
                items: [
                    { label: 'Workorder List', routerLink: '/workordersmodule/workorderspages/app-work-order-list' },
                    { label: 'Create Workorder', routerLink: '/workordersmodule/workorderspages/app-work-order-add' },
                    { label: 'WO Shipping', routerLink: '/#' },
                    { label: 'WO Billing', routerLink: '/#' },
                    {
                        label: 'Direct Labour', items: [{
                            label: 'Direct Labour and OH Cost', routerLink: '/workordersmodule/workorderspages/app-work-order-direct-labour'
                        }]
                    },
                    {
                        label: 'Reports and Forms', items: [{
                            label: 'WIP Summary', routerLink: '/#'
                        },
                        {
                            label: 'WIP Details', routerLink: '/#'
                        },
                        {
                            label: 'WO Backlog', routerLink: '/#'
                        },
                        {
                            label: 'WO onTime Performance', routerLink: '/#'
                        }]
                    },
                    {
                        label: 'Work-order Quote', items: [
                            { label: 'WO Quote List', routerLink: '/#' },
                            { label: 'Create New WO Quote', routerLink: '/#' },
                            { label: 'WO Quote Approvals', routerLink: '/#' }
                        ]
                    },
                    {
                        label: 'Reports and Forms', items: [{
                            label: 'Open WO Quote', routerLink: '/#'
                        }, {
                            label: 'Approved WO Quote', routerLink: '/#'
                        }]
                    },

                ]

            },
            {
                label: 'Sales Orders',
                icon: 'fa fa-fw fa-pencil-square-o',
                items: [
                    { label: 'Quote List', routerLink: '/#' },
                    { label: 'Create Quote', routerLink: '/#' },
                    { label: 'Sales order List', routerLink: '/#' },
                    { label: 'Create Sales Order', routerLink: '/#' },
                    { label: 'Sales order Shipping', routerLink: '/#' },
                    { label: 'Sales order Billing', routerLink: '/#' },
                    {
                        label: 'Reports and forms', items: [
                            { label: 'Open Sales list', routerLink: '/#' },
                            { label: 'SO Backlog', routerLink: '/#' },
                            { label: 'SO OnTime Perfomance', routerLink: '/#' }
                        ]
                    },
                    {
                        label: 'Sales Order Quote', items: [
                            { label: 'SO Quote List', routerLink: '/#' },
                            { label: 'Create New Quote', routerLink: '/#' },
                            { label: 'SO Quote List', routerLink: '/#' },
                            { label: 'SO OnTime Performance', routerLink: '/#' },
                            {
                                label: 'Reports and Forms', items: [
                                    { label: 'open SO Quotes', routerLink: '/#' },
                                    { label: 'Approved SO Quotes', routerLink: '/#' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Accounting',
                icon: 'fa fa-fw fa-list-alt',
                items: [
                    {
                        label: 'General Ledger', items: [
                            { label: 'GL Account List', routerLink: '/generalledgermodule/generalledgerpage/app-glaccount-list' },
                            { label: 'Create GL Account', routerLink: '/generalledgermodule/generalledgerpage/app-glaccount-create' },
                            { label: 'Setup Accounting', routerLink: '/generalledgermodule/generalledgerpage/app-accounting-calendar' },
                            { label: 'Edit Accounting', routerLink: '/#' },
                            { label: 'Open/Close Ledger', routerLink: '/#' },
                            { label: 'Intercompany', routerLink: '/#' },
                            {
                                label: 'Payment Description', items: [
                                    { label: 'Cutomer', routerLink: '/#' },
                                    { label: 'Vendor', routerLink: '/#' },
                                ]
                            },
                            { label: 'PO-RO Category', routerLink: '/generalledgermodule/generalledgerpage/app-po-ro-category' },
                        ]
                    },
                    {
                        label: 'Financial Statement', items: [
                            { label: 'Node Setup', routerLink: '/generalledgermodule/generalledgerpage/app-node-setup' },
                            { label: 'Income Statement', routerLink: '/#' },
                            { label: 'Balance Sheet', routerLink: '/#' },
                            { label: 'Statement of CashFlows', routerLink: '/#' },
                            { label: 'Other Structures', routerLink: '/#' },
                            {
                                label: 'Reports and Forms', items: [
                                    { label: 'Trial Balance', routerLink: '/#' },
                                    { label: 'Income Statement', routerLink: '/#' },
                                    { label: 'Balance Sheet', routerLink: '/#' },
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Journals', items: [
                            { label: 'View Batch', routerLink: '/accountmodule/accountpages/app-view-batch' },
                            { label: 'Journal Approvals Rules', routerLink: '/singlepages/singlepages/app-journal-approvals' },
                            {
                                label: 'Reports and Forms', items: [
                                    { label: 'Journal Batches', routerLink: '/#' },
                                    { label: 'Journal Entry', routerLink: '/#' },
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Organisation', items: [
                            { label: 'Entity List', routerLink: '/#' },
                            { label: 'Entity Setup', routerLink: '/#' },
                            { label: 'Legal Structure', routerLink: '/generalledgermodule/generalledgerpage/app-entity-edit' },
                            { label: 'Management Structure', routerLink: '/generalledgermodule/generalledgerpage/app-managemententity-structure' },
                        ]
                    }]
            },
            {
                label: 'Accounts Receivable',
                icon: 'fa fa-fw fa-download',
                items: [
                    { label: 'Customer Invoice List', routerLink: '/#' },
                    { label: 'Process Customer Credit', routerLink: '/#' },
                    { label: 'Open/Close AR Sub-Ledger', routerLink: '/accountreceivable/accountreceivablepages/app-open-close-ar-subledger' },
                    {
                        label: 'Reports and Forms', items: [
                            { label: 'AR Aging', routerLink: '/#' },
                            { label: 'History By Customer', routerLink: '/#' },
                            { label: 'History By Payment', routerLink: '/#' },
                            { label: 'Customer Statement', routerLink: '/#' },
                        ]
                    },
                    {
                        label: 'Customer Receipts', items: [
                            { label: 'Customer Accounts', routerLink: '/#' },
                            { label: 'Customer Payments', routerLink: '/#' },
                            {
                                label: 'Reports and Forms', items: [
                                    { label: 'Print Deposit', routerLink: '/#' },
                                    { label: 'Payment History', routerLink: '/#' },
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                label: 'Accounts Payable',
                icon: 'fa fa-fw fa-file-text',
                items: [
                    { label: 'Vendor Invoice List', routerLink: '/#' },
                    { label: 'Enter Invoices', routerLink: '/#' },
                    { label: 'Vendor Credit', routerLink: '/#' },
                    { label: 'Open/Close AP Subledger', routerLink: '/accountpayble/accountpayble/app-open-close-ap-subledger' },
                    { label: 'Print Checks', routerLink: '/#' },
                    {
                        label: 'Reports and Forms', items: [
                            { label: 'AP Register', routerLink: '/#' },
                            { label: 'AR Aging', routerLink: '/#' },
                            { label: 'History By Invoice', routerLink: '/#' },
                            { label: 'History By Payment', routerLink: '/#' },
                            { label: 'Open Vendor Invoice', routerLink: '/#' },
                            { label: 'Check Register', routerLink: '/#' },
                        ]
                    },
                    {
                        label: 'Vendor Payments', items: [
                            { label: 'Vendor Accounts', routerLink: '/#' },
                            { label: 'Process Checks', routerLink: '/#' },
                            { label: 'Reconcile', routerLink: '/#' },
                            {
                                label: 'Reports and Forms', items: [
                                    { label: 'Print Check', routerLink: '/#' },
                                    { label: 'Print Check Batch', routerLink: '/#' },
                                    { label: 'Print Check Register', routerLink: '/#' },
                                ]
                            }
                        ]
                    },
                ]

            },
            {
                label: 'Employees',
                icon: 'fa fa-fw fa-group',
                items: [
                    { label: 'Employee List', routerLink: '/employeesmodule/employeepages/app-employees-list' },
                    { label: 'Create Employee', routerLink: '/employeesmodule/employeepages/app-employee-general-information' },
                    {
                        label: 'Expense Reports', items: [
                            { label: 'Expense List', routerLink: '/#' },
                            { label: 'Create Expense Report', routerLink: '/#' },
                            { label: 'Expense Report Approval', routerLink: '/#' },
                        ]
                    },
                    {
                        label: 'Reports and Forms', items: [
                            { label: 'Employee Listing Report', routerLink: '/#' },
                            { label: 'Productivity', routerLink: '/#' },
                            { label: 'Commission', routerLink: '/#' },
                        ]
                    },]
            },
            {
                label: 'Contract Management',
                icon: 'fa fa-fw fa-tasks',
                items: [
                    { label: 'Contract List', routerLink: '/#' },
                    { label: 'Contract Setup', routerLink: '/#' },
                ]

            },
            {
                label: 'Publications',
                icon: 'fa fa-fw fa-newspaper-o',
                items: [
                    { label: 'List of Publications', routerLink: '/singlepages/singlepages/app-publication' },
                    { label: 'Create New', routerLink: '/singlepages/singlepages/app-create-publication' },
                    {
                        label: 'Reports and Forms', items: [
                            { label: 'CMM by PIN', routerLink: '/#' },

                        ]
                    },]

            },
            {
                label: 'RFQ',
                icon: 'fa fa-fw fa-window-restore',
                items: [
                    { label: 'RFQ Engine', routerLink: '/singlepages/singlepages/app-rfq-engine' },

                ]
            },
            {
                label: 'Key Performance',
                icon: 'fa fa-fw fa-bar-chart-o',
                items: [
                    { label: 'Data Not Given', routerLink: '/#' },
                ]
            },
            {
                label: 'Master Maintanence',
                icon: 'fa fa-fw fa-cogs',
                items: [
                    {
                        label: 'Item Master', items: [
                            { label: 'Unit of Measure', routerLink: '/singlepages/singlepages/app-unit-of-measure' },
                            { label: 'Item Group', routerLink: '/singlepages/singlepages/app-item-group' },
                            { label: 'Item Classification', routerLink: '/singlepages/singlepages/app-item-classification' },
                            { label: 'Manufacturer', routerLink: '/singlepages/singlepages/app-manufacturer' },
                        ]
                    },
                    {
                        label: 'Work Orders', items: [
                            { label: 'Stage Code and Status', routerLink: '/#' },
                            { label: 'Charges', routerLink: '/singlepages/singlepages/app-charges' },
                            { label: 'Reasons', routerLink: '/singlepages/singlepages/app-reason' },
                            { label: 'Findings', routerLink: '/#' },
                            { label: 'Work Performed', routerLink: '/#' },
                        ]
                    },
                    {
                        label: 'Accounting/finance', items: [
                            { label: 'Currency', routerLink: '/singlepages/singlepages/app-currency' },
                            { label: 'GL Account Type', routerLink: '/singlepages/singlepages/app-gl-account-class' },
                            { label: 'Gl Account Classification', routerLink: '/singlepages/singlepages/app-gl-cash-flow-classification' },
                            { label: 'GL Account Category', routerLink: '/singlepages/singlepages/app-glaccount-category' },
                            { label: 'Credit Type', routerLink: '/#' },
                            { label: 'Tax Rate', routerLink: '/singlepages/singlepages/app-tax-rate' },
                            { label: 'Tax Type', routerLink: '/singlepages/singlepages/app-tax-type' },
                        ]
                    },
                    {
                        label: 'General', items: [
                            { label: 'Documents', routerLink: '/singlepages/singlepages/app-documents' },
                            { label: 'Default Messages', routerLink: '/singlepages/singlepages/app-defaultmessage' },
                            { label: 'Aircraft Manufacturer', routerLink: '/singlepages/singlepages/app-aircraft-manufacturer' },
                            { label: 'Aircraft Model', routerLink: '/singlepages/singlepages/app-aircraft-model' },
                            { label: 'Dash Numbers', routerLink: '/singlepages/singlepages/app-dashnumber' },
                            { label: 'Ata Chapter', routerLink: '/singlepages/singlepages/app-ata-main' },
                            { label: 'Ata Sub-Chapter', routerLink: '/singlepages/singlepages/app-ata-sub-chapter1' },
                            { label: 'Conditions', routerLink: '/singlepages/singlepages/app-conditions' },
                            { label: 'Percent', routerLink: '/#' },
                            { label: 'Site', routerLink: '/singlepages/singlepages/app-site' },
                            { label: 'Integration', routerLink: '/singlepages/singlepages/app-integration' },
                            { label: 'Priority', routerLink: '/singlepages/singlepages/app-priority' },
                            { label: 'Work Scope', routerLink: '/singlepages/singlepages/app-work-scope' },
                            { label: 'Provision', routerLink: '/singlepages/singlepages/app-provision' },
                        ]
                    },
                    {
                        label: 'Assets', items: [
                            {
                                label: 'Asset Type', items: [
                                    { label: 'Asset Type List', routerLink: '/singlepages/singlepages/app-asset-type-single-screen' },
                                    { label: 'Create Asset', routerLink: '/#' },
                                ]
                            },
                            {
                                label: 'Intangible Type', items: [
                                    { label: 'Intangible Type List', routerLink: '/#' },
                                    { label: 'Create Intagible Type', routerLink: '/#' },
                                ]
                            },
                            { label: 'Depreciation - Book', routerLink: '/#' },
                            { label: 'Depreciaiton - Tax', routerLink: '/#' },
                            { label: 'Depreciaiton Start Date', routerLink: '/#' },
                            { label: 'Asset Class', routerLink: '/#' },

                        ]
                    },

                    {
                        label: 'Stockline', items: [
                            { label: 'Ware House', routerLink: '/singlepages/singlepages/app-warehouse' },
                            { label: 'Location', routerLink: '/singlepages/singlepages/app-location' },
                            { label: 'Shelf', routerLink: '/singlepages/singlepages/app-shelf' },
                            { label: 'Bin', routerLink: '/singlepages/singlepages/app-bin' },
                        ]
                    },
                    {
                        label: 'Employees', items: [
                            { label: 'Job Titles', routerLink: '/singlepages/singlepages/app-job-title' },
                            { label: 'Employee Expertise', routerLink: '/singlepages/singlepages/app-employee-expertise' },
                        ]
                    },
                ]
            }


        ];

        // created by jyotsna

        // this.callTest2();

        this.isUserLoggedIn = this.authService.isLoggedIn;

        // var callFunction= new init_sidebar();



        // 1 sec to ensure all the effort to get the css animation working is appreciated :|, Preboot screen is removed .5 sec later
        setTimeout(() => this.isAppLoaded = true, 1000);
        setTimeout(() => this.removePrebootScreen = true, 1500);

        setTimeout(() => {
            if (this.isUserLoggedIn) {
                this.alertService.resetStickyMessage();
                this.alertService.showMessage("Login", `Welcome back ${this.userName}!`, MessageSeverity.default);
            }
        }, 2000);

        this.alertService.getDialogEvent().subscribe(alert => this.dialog.open(AppDialogComponent,
            {
                data: alert,
                panelClass: 'mat-dialog-sm'
            }));
        this.alertService.getMessageEvent().subscribe(message => this.showToast(message, false));
        this.alertService.getStickyMessageEvent().subscribe(message => this.showToast(message, true));

        this.authService.reLoginDelegate = () => this.showLoginDialog();

        this.authService.getLoginStatusEvent().subscribe(isLoggedIn => {
            this.isUserLoggedIn = isLoggedIn;


            if (this.isUserLoggedIn) {
                this.initNotificationsLoading();
            }
            else {
                this.unsubscribeNotifications();
            }

            setTimeout(() => {
                if (!this.isUserLoggedIn) {
                    this.alertService.showMessage("Session Ended!", "", MessageSeverity.default);
                }
            }, 500);
        });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                let url = (<NavigationStart>event).url;

                if (url !== url.toLowerCase()) {
                    this.router.navigateByUrl((<NavigationStart>event).url.toLowerCase());
                }

                if (this.adminExpander && url.indexOf('admin') > 0) {
                    this.adminExpander.open();
                }
            }
        });
    }

    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.unsubscribeNotifications();
    }

    private unsubscribeNotifications() {
        if (this.notificationsLoadingSubscription) {
            this.notificationsLoadingSubscription.unsubscribe();
        }
    }
    //    onclick(event:any) {
    //        this.customerService.navigationObj.next(this.doThis(event))


    //    }
    //    doThis(event: any){
    //    if (event == 'GeneralInfo') {
    //        this.customerService.isGeneralInfo = true;
    //        this.router.navigateByUrl('customersmodule/customerpages/app-customer-setup')
    //    }
    //    if (event == 'contact') {
    //        this.customerService.isContact = true;
    //        this.router.navigateByUrl('customersmodule/customerpages/app-customer-setup')
    //    }
    //    if (event == 'FinanicialInfo') {
    //        this.customerService.isFinanicialInfo = true;
    //        this.router.navigateByUrl('customersmodule/customerpages/app-customer-setup')

    //    }
    //    if (event == 'BillingInfo') {
    //        this.customerService.isBillingInfo = true;
    //        this.router.navigateByUrl('customersmodule/customerpages/app-customer-setup')
    //    }
    //    if (event == 'ShippingInfo') {
    //        this.customerService.isShippingInfo = true;
    //        this.router.navigateByUrl('customersmodule/customerpages/app-customer-setup')
    //    }
    //    if (event == 'Person') {
    //        this.customerService.isPerson = true;
    //        this.router.navigateByUrl('customersmodule/customerpages/app-customer-setup')
    //    }
    //    if (event == 'InternationalShipping') {
    //        this.customerService.isInternationalShipping = true;
    //        this.router.navigateByUrl('customersmodule/customerpages/app-customer-setup')
    //    }
    //    console.log(event);
    //}

    initNotificationsLoading() {
        this.notificationsLoadingSubscription = this.notificationService.getNewNotificationsPeriodically()
            .subscribe(notifications => {
                this.dataLoadingConsecutiveFailures = 0;
                this.newNotificationCount = notifications.filter(n => !n.isRead).length;
            },
                error => {
                    this.alertService.logError(error);

                    if (this.dataLoadingConsecutiveFailures++ < 20)
                        setTimeout(() => this.initNotificationsLoading(), 5000);
                    else
                        this.alertService.showStickyMessage("Load Error", "Loading new notifications from the server failed!", MessageSeverity.error);
                });
    }

    markNotificationsAsRead() {
        let recentNotifications = this.notificationService.recentNotifications;

        if (recentNotifications.length) {
            this.notificationService.readUnreadNotification(recentNotifications.map(n => n.id), true)
                .subscribe(response => {
                    for (let n of recentNotifications) {
                        n.isRead = true;
                    }

                    this.newNotificationCount = recentNotifications.filter(n => !n.isRead).length;
                },
                    error => {
                        this.alertService.logError(error);
                        this.alertService.showMessage("Notification Error", "Marking read notifications failed", MessageSeverity.error);
                    });
        }
    }

    showLoginDialog(): void {
        this.alertService.showStickyMessage("Session Expired", "Your Session has expired. Please log in again", MessageSeverity.info);

        let dialogRef = this.dialog.open(LoginDialogComponent, { minWidth: 600 });

        dialogRef.afterClosed().subscribe(result => {
            this.alertService.resetStickyMessage();

            if (!result || this.authService.isSessionExpired) {
                this.authService.logout();
                this.router.navigateByUrl('/login');
                this.alertService.showStickyMessage("Session Expired", "Your Session has expired. Please log in again to renew your session", MessageSeverity.warn);
            }
        });
    }

    showToast(message: AlertMessage, isSticky: boolean) {
        if (message == null) {
            for (let id of this.stickyToasties.slice(0)) {
                this.toastyService.clear(id);
            }

            return;
        }

        let toastOptions: ToastOptions = {
            title: message.summary,
            msg: message.detail,
            timeout: isSticky ? 0 : 4000
        };

        if (isSticky) {
            toastOptions.onAdd = (toast: ToastData) => this.stickyToasties.push(toast.id);

            toastOptions.onRemove = (toast: ToastData) => {
                let index = this.stickyToasties.indexOf(toast.id, 0);

                if (index > -1) {
                    this.stickyToasties.splice(index, 1);
                }

                toast.onAdd = null;
                toast.onRemove = null;
            };
        }

        switch (message.severity) {
            case MessageSeverity.default: this.toastyService.default(toastOptions); break
            case MessageSeverity.info: this.toastyService.info(toastOptions); break;
            case MessageSeverity.success: this.toastyService.success(toastOptions); break;
            case MessageSeverity.error: this.toastyService.error(toastOptions); break
            case MessageSeverity.warn: this.toastyService.warning(toastOptions); break;
            case MessageSeverity.wait: this.toastyService.wait(toastOptions); break;
        }
    }

    goBack() { window.history.back(); }

    logout() {
        this.authService.logout();
        this.authService.redirectLogoutUser();
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    get fullName(): string {
        return this.authService.currentUser ? this.authService.currentUser.fullName : "";
    }

    get canViewCustomers() {
        return this.accountService.userHasPermission(Permission.viewUsersPermission);
    }

    get canViewProducts() {
        return this.accountService.userHasPermission(Permission.viewUsersPermission);
    }

    get canViewOrders() {
        return true;
    }

    get canViewUsers() {
        return this.accountService.userHasPermission(Permission.viewUsersPermission);
    }

    get canViewRoles() {
        return this.accountService.userHasPermission(Permission.viewRolesPermission);
    }
}