// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { Component, ChangeDetectorRef, ViewChild, ViewEncapsulation, OnInit, OnDestroy, ElementRef, AfterViewInit, Injectable } from "@angular/core";
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, NavigationStart } from '@angular/router';
import { MatExpansionPanel, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

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
	private items: MenuItem[]; //BreadCrumb Implimentation

    @ViewChild('admin') adminExpander: MatExpansionPanel;
    routeActive: string = "active";
    private _mobileQueryListener: () => void;
    isAppLoaded: boolean;
    isUserLoggedIn: boolean;
    isAdminExpanded: boolean = false;
    removePrebootScreen: boolean;
    newNotificationCount = 0;
    appTitle = "PAS";
    appLogo = require("./assets/images/logo.png");
    userCollapsed: boolean = false;
    mobileQuery: MediaQueryList;
    stickyToasties: number[] = [];

    dataLoadingConsecutiveFailures = 0;
	notificationsLoadingSubscription: any;

	closeCmpny: boolean = true;

	
    step: number;

    setStep(index: number) {
        this.step = index;
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
	showthis()
	{
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