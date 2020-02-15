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
import { VendorService } from "./services/vendor.service";
import { LegalEntityService } from "./services/legalentity.service";

@Component({
  selector: "quickapp-pro-app",
  templateUrl: './app.component.html',
  styleUrls: ['./styles.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  public items: MenuItem[]; //BreadCrumb Implimentation

  @ViewChild('admin') adminExpander: MatExpansionPanel;
  routeActive: string = "active";
  private _mobileQueryListener: () => void;
  isAppLoaded: boolean;
  isUserLoggedIn: boolean = false;
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
    private vendorService: VendorService,
    private entityService: LegalEntityService,
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
          { label: 'Code Prefixes', routerLink: '/#' },
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
          {
            label: 'Global Settings', routerLink: 'admin/global-settings'
          },
          { label: 'Notifications', routerLink: '/#' }

        ]
      },
      {
        label: 'Customers',
        icon: 'fa fa-fw fa-group',
        items: [
          { label: 'Customers List', routerLink: '/customersmodule/customerpages/app-customers-list' },
          { label: 'Create Customer', routerLink: '/customersmodule/customerpages/app-customer-create' },
          //{ label: 'Classification', routerLink: '/singlepages/singlepages/app-customer-classification' },
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
              { label: 'Create Capabilities', routerLink: '/itemmastersmodule/itemmasterpages/app-item-master-create-capabilities' },
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
              { label: 'Asset List', routerLink: '/assetmodule/assetpages/app-asset-listing' },
              { label: 'Create Asset', routerLink: '/assetmodule/assetpages/app-create-asset' }]
          },
          {
            label: 'Disposal Sale', routerLink: '/assetmodule/assetpages/app-asset-disposal-sale'
          },
          { label: 'Periodic Depreciation', routerLink: '/#' },
          { label: 'Asset Adjustment', routerLink: '/#' },
          { label: 'Calibration Management', routerLink: '/#' },
          { label: 'Leases & Insurance', routerLink: '/#' },
          { label: 'Asset Maintenance', routerLink: '/#' },
          { label: 'Depreciation Forecast', routerLink: '/#' },
          {
            label: 'Report and Forms', items: [{ label: 'List Report', routerLink: '/#' },
            { label: 'Depreciation', routerLink: '/#' },
            { label: 'Additons', routerLink: '/#' },
            { label: 'Disposal', routerLink: '/#' },
            ]
          },

        ]
      },
      {
        label: 'Stock Line',
        icon: 'fa fa-fw fa-folder-open',
        items: [
          { label: 'Stock List', routerLink: '/stocklinemodule/stocklinepages/app-stock-line-list' },
          { label: 'Add Stock Line', routerLink: '/stocklinemodule/stocklinepages/app-stock-line-setup' },
          {
            label: 'Reports and Forms', items: [
              { label: 'Item Aging', routerLink: '/#' },
              { label: 'Slow Moving Stock', routerLink: '/#' },
              { label: 'Hot List', routerLink: '/#' },
              //{ label: 'Stock Line Report', command: (event?: any) => { this.stockLineReport(); } }
              { label: 'Stock Line Report', routerLink: '/stocklinemodule/stocklinepages/app-stock-line-report-view' },
            ]
          }]

      },
      {
        label: 'Vendor',
        icon: 'fa fa-fw fa-user',
        items: [

          { label: 'Vendor List', routerLink: '/vendorsmodule/vendorpages/app-vendors-list' },
          { label: 'Create Vendor', command: (event?: any) => { this.newVendorClick(); } },
          //{ label: 'Create Vendor',  command: (event?: any) => { this.newVendorClick(); } },
          //{ label: 'Vendor Classification', routerLink: '/singlepages/singlepages/app-vendor-classification' },
          //{ label: 'Process 1099', routerLink: '/singlepages/singlepages/app-vendor-process1099' },
          {
            label: 'Vendor Capabilities', items: [{ label: 'Vendor Caps List', routerLink: '/vendorsmodule/vendorpages/app-vendor-capabilities-list' },
            { label: 'Add Vendor Caps', routerLink: '/vendorsmodule/vendorpages/app-add-vendor-capabilities' },
            { label: 'Reports and Forms', items: [{ label: 'Caps Report', routerLink: '/singlepages/singlepages/app-caps-report' }] }],
          },
          // {
          //     label: 'Purchase Order', items: [{ label: 'PO List', routerLink: '/vendorsmodule/vendorpages/app-polist' },
          //     { label: 'Create PO', routerLink: '/vendorsmodule/vendorpages/app-create-po' },
          //     { label: 'PO Approval', routerLink: '/#' },
          //     { label: 'Create Vendor RMA', routerLink: '/#' }]
          // },
          // {
          //     label: 'Repair Order', items: [{ label: 'RO List', routerLink: '/vendorsmodule/vendorpages/app-ro-list' },
          //     { label: 'Create RO', routerLink: '/vendorsmodule/vendorpages/app-create-ro' },
          //     { label: 'RO Approval', routerLink: '/#' }]
          // },
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
        label: 'Purchase Order',
        icon: 'fa fa-fw fa-shopping-cart',
        items: [
          { label: 'PO List', routerLink: '/vendorsmodule/vendorpages/app-polist' },
          { label: 'Create PO', routerLink: '/vendorsmodule/vendorpages/app-create-po' },
          { label: 'PO Approval', routerLink: '/#' },
          { label: 'Create Vendor RMA', routerLink: '/#' }
        ]
      },
      {
        label: 'Repair Order',
        icon: 'fa fa-fw fa-cog',
        items: [
          { label: 'RO List', routerLink: '/vendorsmodule/vendorpages/app-ro-list' },
          { label: 'Create RO', routerLink: '/vendorsmodule/vendorpages/app-create-ro' },
          { label: 'RO Approval', routerLink: '/#' }
        ]
      },
      {
        label: 'Receiving',
        icon: 'fa fa-fw fa-download',
        items: [
          {
            label: 'Customer Work', items: [
              { label: 'Customer Work List', routerLink: '/receivingmodule/receivingpages/app-customer-works-list' },
              { label: 'Create Customer Work', routerLink: '/receivingmodule/receivingpages/app-customer-work-setup' }
            ]
          },
          { label: 'Purchase Order', routerLink: '/receivingmodule/receivingpages/app-purchase-order' },
          { label: 'Repair Order', routerLink: '/receivingmodule/receivingpages/app-ro' },
          { label: 'Shipping Receiver', routerLink: '/receivingmodule/receivingpages/app-shipping' },
          { label: 'Work Order', routerLink: '/#' },
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
          { label: 'Work Flow List', routerLink: '/workflowmodule/workflowpages/app-workflow-list' },
          { label: 'Create Work Flow', routerLink: '/workflowmodule/workflowpages/wf-create' },
          { label: 'Task', routerLink: '/singlepages/singlepages/app-tasks' },
          { label: 'Task Attribute', routerLink: '/singlepages/singlepages/app-task-attributes' },

        ]
      },
      {
        label: 'Work Orders',
        icon: 'fa fa-fw fa-clone',
        items: [
          { label: 'Workorder List', routerLink: '/workordersmodule/workorderspages/app-work-order-list' },
          { label: 'Create Work Order', routerLink: '/workordersmodule/workorderspages/app-work-order-add' },
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
              { label: 'WO Quote List', routerLink: '/workordersmodule/workorderspages/app-work-order-quote-list' },
              { label: 'Create New WO Quote', routerLink: '/workordersmodule/workorderspages/app-work-order-quote' },
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
          {
            label: 'Sales Order Quote', items: [
              { label: 'SO Quote List', routerLink: '/salesmodule/salespages/sales-quote-list' },
              { label: 'Create New SO Quote', routerLink: '/salesmodule/salespages/sales-quote' },
              {
                label: 'Reports & Forms', items: [
                  { label: 'Open SO Quotes', routerLink: '/#' },
                  { label: 'Approved SO Quotes', routerLink: '/#' }
                ]
              }
            ]
          },
          { label: 'Sales order List', routerLink: '/salesmodule/salespages/sales-order-list' },
          { label: 'Create Sales Order', routerLink: '/salesmodule/salespages/sales-order' },
          { label: 'Sales order Shipping', routerLink: '/#' },
          { label: 'Sales order Billing', routerLink: '/#' },
          {
            label: 'Reports and forms', items: [
              { label: 'Open Sales list', routerLink: '/#' },
              { label: 'SO Backlog', routerLink: '/#' },
              { label: 'SO OnTime Perfomance', routerLink: '/#' }
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
              { label: 'GL Account List', routerLink: '/generalledgermodule/generalledgerpage/app-account-listing' },
              { label: 'Create GL Account', routerLink: '/generalledgermodule/generalledgerpage/app-account-listing-create' },
              { label: 'Create Accounting Calendar', routerLink: '/generalledgermodule/generalledgerpage/app-accounting-calendar' },
              { label: 'Accounting Calendar List', routerLink: '/generalledgermodule/generalledgerpage/app-accounting-listing-calendar' },
              { label: 'Open/Close Ledger', routerLink: '/generalledgermodule/generalledgerpage/app-open-close-ledger' },
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
              { label: 'Node List', routerLink: '/generalledgermodule/generalledgerpage/app-node-setup' },
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
              { label: 'Journal List', routerLink: '/accountmodule/accountpages/app-list-journel' },
              { label: 'Create Journal Entry', routerLink: '/accountmodule/accountpages/app-create-journel' },
              { label: 'Schedule', routerLink: '/accountmodule/accountpages/app-schedule' },
            ]
          },
          {
            label: 'Organisation', items: [
              { label: 'Legal Entity List', routerLink: '/generalledgermodule/generalledgerpage/app-legal-entity-list' },
              { label: 'Create Entity', command: (event?: any) => { this.newLegalEntityClick(); } },
              { label: 'Legal Structure', routerLink: '/#' },
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
          { label: 'Create New Publications', routerLink: '/singlepages/singlepages/app-create-publication' },
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
              { label: 'Site', routerLink: '/singlepages/singlepages/app-site' },
              { label: 'Warehouse', routerLink: '/singlepages/singlepages/app-warehouse' },
              { label: 'Location', routerLink: '/singlepages/singlepages/app-location' },
              { label: 'Shelf', routerLink: '/singlepages/singlepages/app-shelf' },
              { label: 'Bin', routerLink: '/singlepages/singlepages/app-bin' },
            ]
          },
          {
            label: 'Work Orders', items: [
              { label: 'Stage Code and Status', routerLink: '/singlepages/singlepages/app-stage-code' },
              { label: 'Charges', routerLink: '/singlepages/singlepages/app-charges' },
              { label: 'Reasons', routerLink: '/singlepages/singlepages/app-reason' },
              { label: 'Findings', routerLink: '/#' },
              { label: 'Work Performed', routerLink: '/singlepages/singlepages/app-work-performed' },
            ]
          },
          {
            label: 'Accounting/finance', items: [
              { label: 'Currency', routerLink: '/singlepages/singlepages/app-currency' },
              { label: 'GL Account Type', routerLink: '/singlepages/singlepages/app-gl-account-class' },
              { label: 'Gl Account Classification', routerLink: '/singlepages/singlepages/app-gl-cash-flow-classification' },
              { label: 'GL Account Category', routerLink: '/singlepages/singlepages/app-gl-account-category' },
              { label: 'Expenditure Category', routerLink: '/singlepages/singlepages/app-expenditure-category' },
              { label: 'Credit Terms', routerLink: '/singlepages/singlepages/app-credit-terms' },
              { label: 'Tax Rate', routerLink: '/singlepages/singlepages/app-tax-rate' },
              { label: 'Tax Type', routerLink: '/singlepages/singlepages/app-tax-type' },
            ]
          },
          {
            label: 'General', items: [
              { label: 'Ata Chapter', routerLink: '/singlepages/singlepages/app-ata-main' },
              { label: 'Ata Sub-Chapter', routerLink: '/singlepages/singlepages/app-ata-sub-chapter1' },
              { label: 'Aircraft Manufacturer', routerLink: '/singlepages/singlepages/app-aircraft-manufacturer' },
              { label: 'Aircraft Model', routerLink: '/singlepages/singlepages/app-aircraft-model' },
              { label: 'Conditions', routerLink: '/singlepages/singlepages/app-conditions' },
              { label: 'Customer Classification', routerLink: '/singlepages/singlepages/app-customer-classification' },
              { label: 'Dash Numbers', routerLink: '/singlepages/singlepages/app-dashnumber' },
              { label: 'Default Messages', routerLink: '/singlepages/singlepages/app-defaultmessage' },
              { label: 'Documents', routerLink: '/singlepages/singlepages/app-documents' },
              { label: 'Integration', routerLink: '/singlepages/singlepages/app-integration' },
              { label: 'Percent', routerLink: '/singlepages/singlepages/app-percent' },
              { label: 'Priority', routerLink: '/singlepages/singlepages/app-priority' },
              { label: 'Process 1099', routerLink: '/singlepages/singlepages/app-vendor-process1099' },
              { label: 'Provision', routerLink: '/singlepages/singlepages/app-provision' },
              // { label: 'Site', routerLink: '/singlepages/singlepages/app-site' },
              { label: 'Vendor Classification', routerLink: '/singlepages/singlepages/app-vendor-classification' },
              { label: 'Work Scope', routerLink: '/singlepages/singlepages/app-work-scope' },

              { label: 'Vendor Capability Type', routerLink: '/singlepages/singlepages/app-capability-type' },
            ]
          },
          {
            label: 'Asset Mgmt Maintenance', items: [
              { label: 'Asset Class', routerLink: '/singlepages/singlepages/app-asset-type' },
              {
                label: 'Asset Attributes', items: [
                  { label: 'Asset Attribute Type', routerLink: '/singlepages/singlepages/app-asset-attribute-type' },
                  { label: 'Intangible Attribute Type', routerLink: '/singlepages/singlepages/app-asset-intangible-attribute-type' },
                  { label: 'Depreciation - Book', routerLink: '/#' },
                  { label: 'Depreciation - Tax', routerLink: '/#' },
                  { label: 'Depreciation Date', routerLink: '/#' },

                ]
              },
              { label: 'Asset Status', routerLink: '/singlepages/singlepages/asset-status' },
              { label: 'Asset Location', routerLink: '/singlepages/singlepages/asset-location' },
              { label: 'Asset Acquisition Type', routerLink: '/singlepages/singlepages/asset-acquisition-type' },
              { label: 'Depreciation Method', routerLink: '/singlepages/singlepages/app-depriciation-method' },
              { label: 'Depreciation Convention', routerLink: '/singlepages/singlepages/app-asset-dep-convention-type' },
              { label: 'Depreciation Intervals', routerLink: '/singlepages/singlepages/app-depreciation-intervals' },
              { label: 'Asset Disposal Type', routerLink: '/singlepages/singlepages/app-disposal-type' },
              { label: 'Asset Intangible Type', routerLink: '/singlepages/singlepages/app-asset-intangible-type' },
            ]
          },

          {
            label: 'Stockline', items: [
              { label: 'Adjustment Reason', routerLink: '/singlepages/singlepages/app-adjustment-reason' },
              // { label: 'Ware House', routerLink: '/singlepages/singlepages/app-warehouse' },
              // { label: 'Location', routerLink: '/singlepages/singlepages/app-location' },
              // { label: 'Shelf', routerLink: '/singlepages/singlepages/app-shelf' },
              // { label: 'Bin', routerLink: '/singlepages/singlepages/app-bin' },
            ]
          },
          {
            label: 'Employees', items: [
              { label: 'Job Titles', routerLink: '/singlepages/singlepages/app-job-title' },
              // { label: 'Job Type', routerLink: '/singlepages/singlepages/app-job-type' },
              { label: 'Employee Expertise', routerLink: '/singlepages/singlepages/app-employee-expertise' },
              { label: 'Certification Type', routerLink: '/singlepages/singlepages/app-certification-type' },
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

    // setTimeout(() => {
    //     if (this.isUserLoggedIn) {
    //         this.alertService.resetStickyMessage();
    //         this.alertService.showMessage("Login", `Welcome back ${this.userName}!`, MessageSeverity.default);
    //     }
    // }, 2000);

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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.unsubscribeNotifications();
  }

  private unsubscribeNotifications() {
    if (this.notificationsLoadingSubscription) {
      this.notificationsLoadingSubscription.unsubscribe();
    }
  }

  stockLineReport() {
    const url = `${this.configurations.baseUrl}/api/stockLine/stocklinereoprt`;

    window.location.assign(url);
  }

  newVendorClick() {

    // this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
    this.vendorService.isEditMode = false;
    this.vendorService.ShowPtab = true;
    this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-general-information';
    this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
    this.vendorService.alertObj.next(this.vendorService.ShowPtab);
    this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
    this.vendorService.listCollection = undefined;

    // location.assign(url);
    this.vendorService.checkVendorEditmode(false);
  }
  ///generalledgermodule/generalledgerpage / app - legal - entity - list
  newLegalEntityClick() {
    this.entityService.isEditMode = false;
    this.entityService.ShowPtab = true;
    this.entityService.currentUrl = '/generalledgermodule/generalledgerpage/app-legal-entity-add';
    this.entityService.bredcrumbObj.next(this.vendorService.currentUrl);
    this.entityService.alertObj.next(this.vendorService.ShowPtab);
    this.router.navigateByUrl('/generalledgermodule/generalledgerpage/app-legal-entity-add');
    this.entityService.listCollection = undefined;
    this.entityService.checkEntityEditmode(false);
  }

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
    this.mobileQuery.removeListener(this._mobileQueryListener);
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