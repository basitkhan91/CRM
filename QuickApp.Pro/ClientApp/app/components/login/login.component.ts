
// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { AlertService, AlertDialog, DialogType, AlertMessage, MessageSeverity } from '../../services/alert.service';
import { LoginControlComponent } from './login-control.component';
import * as $ from 'jquery';
import { LoginDialogComponent } from "./login-dialog.component";
import { LocalStoreManager } from "../../services/local-store-manager.service";
import { AccountService } from "../../services/account.service";
import { NotificationService } from "../../services/notification.service";
import { AppTitleService } from "../../services/app-title.service";
import { Permission } from "../../models/permission.model";
import { NavigationStart, Router } from "@angular/router";
import { AppDialogComponent } from "../../shared/app-dialog.component";
import { AuthService } from "../../services/auth.service";
import { AppTranslationService } from "../../services/app-translation.service";
import { ConfigurationService } from "../../services/configuration.service";
import { MatDialog, MatExpansionPanel } from "@angular/material";
import { MediaMatcher } from "@angular/cdk/layout";
import { Globals } from "../../globals";
import { MenuItem } from "primeng/api";
import { CustomerService } from "../../services/customer.service";
@Component({
    selector: "app-login",
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit
{
    @ViewChild(LoginControlComponent)
    loginControl: LoginControlComponent;
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
    appLogo = require("../../assets/images/logo.png");
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


    private unsubscribeNotifications() {
        if (this.notificationsLoadingSubscription) {
            this.notificationsLoadingSubscription.unsubscribe();
        }
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



    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    get fullName(): string {
        return this.authService.currentUser ? this.authService.currentUser.fullName : "";
    }


}
